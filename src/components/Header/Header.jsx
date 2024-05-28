import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gpt from "../../api/gpt";
import LoadingModal from "../Loadingmodal/Loadingmodal";
import "./Header.css";
import Aialert1 from "../Aialert/Aialert1";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [peopleName, setPeopleName] = useState("로그인");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setPeopleName(userData?.user?.nick || "로그인");
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleStorageChange = () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setPeopleName(userData?.user?.nick || "로그인");
    } else {
      setPeopleName("로그인");
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout(); // Remove user data from local storage
      setPeopleName("로그인"); // Update state to reflect logout
      navigate("/");
    }
  };

  const onSubmitLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      navigate("/Mypage");
    } else {
      alert("로그인이 되어있지 않습니다.");
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/loginpage");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setIsInputEmpty(true);
      return;
    }
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData) {
        const confirmLogin = window.confirm(
          "로그인이 필요합니다. 로그인 하시겠습니까?"
        );
        if (confirmLogin) {
          navigate("/loginpage");
        }
        return;
      }
      const message = await gpt({
        prompt: `${searchInput}`,
      });
      navigate("/recipe", { state: { message } });
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setIsInputEmpty(false);
  };

  const handleCancel = () => {
    setIsInputEmpty(false);
  };

  return (
    <header id="header" role="banner">
      <Link to="/">
        <div className="header_logo">
          <p>
            <span>MOTIV</span>
          </p>
        </div>
      </Link>
      <div className="RightButton">
        <Button onClick={onSubmitLogin} variant="outline-dark">
          {peopleName}
        </Button>
        {peopleName === "로그인" && (
          <Button
            onClick={() => navigate("/registerpage1")}
            variant="outline-dark"
          >
            회원가입
          </Button>
        )}
        {peopleName !== "로그인" && (
          <Button onClick={handleLogout} variant="outline-dark">
            로그아웃
          </Button>
        )}
      </div>
      <div className="header_section">
        <div className="input-group">
          <form onSubmit={onSubmit} className="form-width">
            <input
              style={{
                width: "60%",
              }}
              className="form-control"
              type="text"
              placeholder="재료 -> 음식 or 음식 -> 재료를 검색하시오."
              value={searchInput}
              onChange={handleChange}
            ></input>
            <button className="button-width" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
        <div className="header-bar con-min-width">
          <ul className="con header-bar__header-box-1">
            <li onClick={() => navigate("/recipewrite")}>레시피 등록</li>
            <li onClick={() => navigate("/recipeboard")}>레시피 게시판</li>
            <li onClick={() => navigate("/write")}>Q&A 등록</li>
            <li onClick={() => navigate("/questionboard")}>Q&A 게시판</li>
          </ul>
        </div>
      </div>
      {isInputEmpty && <Aialert1 onCancel={handleCancel} />}
      {isLoading && <LoadingModal />}
    </header>
  );
};

export default Header;
