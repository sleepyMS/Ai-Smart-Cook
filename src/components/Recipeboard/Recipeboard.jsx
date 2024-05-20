import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recipeboard.css";
import axios from "axios";

const Recipeboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
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
    const storedViewCounts = localStorage.getItem("viewCounts");
    if (storedViewCounts) {
      setViewCounts(JSON.parse(storedViewCounts));
    }
  }, []);

  const increaseViewCount = (num) => {
    if (localStorage.getItem("userData")) {
      const newViewCounts = { ...viewCounts };
      newViewCounts[num] = (newViewCounts[num] || 0) + 1;
      setViewCounts(newViewCounts);
      localStorage.setItem("viewCounts", JSON.stringify(newViewCounts));
    } else {
      alert("로그인을 해주세요.");
    }
  };

  const increaseLikeCount = async (num) => {
    if (localStorage.getItem("userData")) {
      if (num) {
        try {
          await axios.post(`http://localhost:8080/user/auth/like/insert`, {
            recipeNum: num,
            email: userData.user.email,
          });

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
          console.log(num);
          console.log(userData.user.email);

          const newLikeCounts = { ...likeCounts };

          setLikeCounts(newLikeCounts);
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
                  <p>조회수: {viewCounts[recipe.num] || 0}</p>
                  <button onClick={() => increaseLikeCount(recipe.num)}>
                    좋아요
                  </button>
                  <p>좋아요: {likeCounts[recipe.num] || 0}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recipeboard;
