import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Recipeinboard.css"; // CSS 파일을 가져옵니다.

const Recipeinboard = () => {
  const [posts, setPosts] = useState([]);
  const { num } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .post(`http://localhost:8080/recipe/getByNum/${num}`, {})
          .then((response) => {
            setPosts(response.data.data);
          });
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [num]);

  return (
    <div className="recipeinboard">
      <h1 className="header_logo">
        <a href="/">
          <span>MOTIV</span>
        </a>
      </h1>
      <div
        style={{ fontSize: "1.2rem", fontWeight: "bold", marginLeft: "10px" }}
      >
        작성자: {posts.nick}
      </div>
      <div className="post_content">
        <div>재료</div>
        {posts.ingredient}
      </div>
      <div className="post_content">
        <div>레시피</div>
        {posts.recipe &&
          posts.recipe
            .split("\n")
            .map((step, index) => <div key={index}>{step.trim()}</div>)}
      </div>
      <div className="links_container">
        <Link to={`/recipeboard`} className="styled_link">
          <h2>게시판 이동</h2>
        </Link>
        <Link to={`/recipewrite`} className="styled_link">
          <h2>레시피 작성</h2>
        </Link>
      </div>
    </div>
  );
};

export default Recipeinboard;
