import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recipeboard.css";
import axios from "axios";

const Recipeboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState({});
  const [likeCount, setLikeCount] = useState({});
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
        setLikeCount({});
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedViewCount = localStorage.getItem("viewCount");
    if (storedViewCount) {
      setViewCount(JSON.parse(storedViewCount));
    } else {
      setViewCount({});
    }

    const storedLikeCount = localStorage.getItem("likeCount");
    if (storedLikeCount) {
      setLikeCount(JSON.parse(storedLikeCount));
    } else {
      setLikeCount({});
    }
  }, []);

  const increaseViewCount = (num) => {
    if (localStorage.getItem("userData")) {
      const newViewCount = { ...viewCount };
      newViewCount[num] = (newViewCount[num] || 0) + 1;
      setViewCount(newViewCount);
      localStorage.setItem("viewCount", JSON.stringify(newViewCount));
    } else {
      alert("로그인을 해주세요.");
    }
  };

  const increaseLikeCount = async (num) => {
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

          let newLikeCount = { ...likeCount };
          if (!response.data.data) {
            await axios.post(`http://localhost:8080/user/auth/like/delete`, {
              recipeNum: num,
              email: userData.user.email,
            });
            newLikeCount[num] = Math.max((newLikeCount[num] || 0) - 1, 0);
          } else {
            newLikeCount[num] = (newLikeCount[num] || 0) + 1;
          }
          setLikeCount(newLikeCount);
          localStorage.setItem("likeCount", JSON.stringify(newLikeCount));
        } catch (error) {
          console.error("데이터를 불러오는 중 오류 발생:", error);
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
              recipes.map((recipe) => (
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
                  <button onClick={() => increaseLikeCount(recipe.num)}>
                    좋아요
                  </button>
                  <p>좋아요: {likeCount[recipe.num] || 0}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recipeboard;
