import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recipeboard.css";
import axios from "axios";

const Recipeboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState({});
  const [likeCount, setLikeCount] = useState({});
  const [likeToggle, setLikeToggle] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeResponse = await axios.post(
          "http://localhost:8080/recipe/get",
          {
            from: 0,
            to: 10e5,
          }
        );
        setRecipes(recipeResponse.data.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedviewCount = localStorage.getItem("viewCount");
    if (storedviewCount) {
      setViewCount(JSON.parse(storedviewCount));
    }
  }, []);

  const increaseViewCount = (num) => {
    if (localStorage.getItem("userData")) {
      const newviewCount = { ...viewCount };
      newviewCount[num] = (newviewCount[num] || 0) + 1;
      setViewCount(newviewCount);
      localStorage.setItem("viewCount", JSON.stringify(newviewCount));
    } else {
      alert("로그인을 해주세요.");
    }
  };

  const increaseLikeCount = async (num, idx) => {
    if (localStorage.getItem("userData")) {
      if (num) {
        try {
          const response = await axios.post(
            `http://localhost:8080/user/auth/like/insert`,
            {
              recipeNum: num,
              email: userData.user.email,
            }
          );

          if (!response.data.data) {
            await axios.post(`http://localhost:8080/user/auth/like/delete`, {
              recipeNum: num,
              email: userData.user.email,
            });

            const newLikeCount = { ...likeCount };
            newLikeCount[idx] =
              newLikeCount[idx] + (response.data.data ? 1 : -1);
            console.log(newLikeCount);
            setLikeCount(newLikeCount);
          }
          alert(num);
          console.log(response);

          const responseNum = await axios.post(
            "http://localhost:8080/user/auth/like/getByNum",
            num,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const responseEmail = await axios.post(
            "http://localhost:8080/user/auth/like/getByEmail",
            userData.user.email,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // console.log(responseNum.data.data[0]);
          // if (responseNum.data.data[0]) console.log(userData.user.email);
        } catch (error) {
          console.error("데이터를 불러오는 중 오류 발생:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div>
      <h1 className="header_logo">
        <Link to="/">MOTIV</Link>
      </h1>
      <div className="board-container">
        <h2>레시피 목록</h2>
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <ul className="board-list">
            {recipes.length > 0 &&
              recipes.map((recipe, idx) => (
                <li key={recipe.num} className="board-item">
                  <Link
                    to={
                      localStorage.getItem("userData")
                        ? `/recipeinboard/${recipe.num}`
                        : "#"
                    }
                    onClick={() => increaseViewCount(recipe.num)}
                  >
                    <h3>제목: {recipe.title}</h3>
                  </Link>
                  <p>{recipe.nick}</p>
                  <p>조회수: {viewCount[recipe.num] || 0}</p>
                  <button onClick={() => increaseLikeCount(recipe.num, idx)}>
                    좋아요
                  </button>
                  <p>좋아요: {likeCount[idx] || 0}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recipeboard;
