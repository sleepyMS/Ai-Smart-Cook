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
            console.log(response.data.data);
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
      <div className="post_content">글쓴이: {posts.nick}</div>
      <div className="post_content">{posts.recipe}</div>
      <Link to={`/recipeboard`} className="styled_link">
        <h2>게시판 이동</h2>
      </Link>
    </div>
  );
};

export default Recipeinboard;
