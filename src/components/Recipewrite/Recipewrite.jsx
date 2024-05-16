import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../내가만든css/media.css";
import "../../내가만든css/style.css";
import axios from "axios";

const Recipewrite = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const postRef = useRef(null);
  const indRef = useRef(null);
  const tagRef = useRef(null); // useRef를 사용하여 선택된 태그 값을 저장
  const [peopleName, setPeopleName] = useState("로그인");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setPeopleName(user.user.nick);
    }
  }, []);

  const handleLogout = () => {
    if (!localStorage.getItem("userData")) {
      alert("로그인이 되어있지않습니다.");
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/loginpage");
      }
    } else {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        setPeopleName("로그인");
        localStorage.removeItem("userData");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentValue = postRef.current.value;
      const lines = currentValue.split("\n");
      const lastLine = lines[lines.length - 1];
      if (!lastLine) return; // 비어 있는 줄은 건너뜀
      if (!lastLine.startsWith(lines.length + 1 + ". ")) {
        postRef.current.value += `\n${lines.length + 1}. `;
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ID = JSON.parse(localStorage.getItem("userData"));
    if (!localStorage.getItem("userData")) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (!titleRef.current.value || !postRef.current.value) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    try {
      await axios
        .post(`http://localhost:8080/recipe/insert`, {
          email: ID.user.email,
          ingredient: indRef.current.value,
          title: titleRef.current.value,
          recipe: postRef.current.value,
          tag: tagRef.current.value,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.result === true) {
            const recipeUser = response.data.data;
            console.log("Logged in user data:", recipeUser);
            alert("생성이 완료되었습니다.");
            navigate("/recipeboard");
          } else {
            alert(response.data.message); // 서버로부터 받은 메시지 표시
          }
        })
        .catch((error) => {
          console.log(error);
          alert("로그인에 실패했습니다. 다시 시도해주세요."); // 기타 오류 발생 시의 메시지
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="header_logo">
        <a href="/">
          <span>MOTIV</span>
        </a>
        <button onClick={handleLogout}>{peopleName}</button>
      </h1>
      <div>
        <form onSubmit={onSubmit}>
          <h3>레시피 글 등록</h3>
          <div className="board_write">
            <div className="title">
              <label>제목</label>
              <input type="text" placeholder="제목" ref={titleRef} />
            </div>
            <div className="title">
              <label>재료</label>
              <input type="text" placeholder="재료" ref={indRef} />
            </div>
            <div>
              <label>카테고리</label>
              <select ref={tagRef}>
                {" "}
                {/* 선택된 값을 useRef를 통해 가져오도록 설정 */}
                <option>한식</option>
                <option>중식</option>
                <option>일식</option>
                <option>양식</option>
              </select>
            </div>
            <div className="info">글쓴이</div>
            <div className="cont">
              <label>글 내용</label>
              <textarea
                placeholder=" 1.
                            2.
                            3.
                            4."
                defaultValue=""
                ref={postRef}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button>등록하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Recipewrite;
