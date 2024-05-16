import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link 추가
import "./Recipeboard.css";
import axios from "axios";

const Recipeboard = () => {
  const [recipes, setRecipes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .post("http://localhost:8080/recipe/get", {
            from: 0,
            to: 10e5,
          })
          .then((response) => {
            console.log(response.data.data);
            setRecipes(response.data.data);
          });
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 변경
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []); // 배열의 값이 바뀔 떄만 실행 -> 의존성 배열 , 빈 배열은 실행 한번만

  return (
    <div>
      <h1 className="header_logo">
        <Link to="/">MOTIV</Link>
      </h1>
      <div className="board-container">
        <h2>게시물 목록</h2>
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <ul className="board-list">
            {recipes.length > 0 &&
              recipes.map((recipe, index) => (
                <li key={index} className="board-item">
                  {/* Link를 이용해 클릭 시 URL 변경 */}
                  <Link to={`/recipeinboard/${recipe.num}`}>
                    <h3>제목: {recipe.title}</h3>
                  </Link>
                  <p>{recipe.email}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recipeboard;
