import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./inboard.css";

const Inboard = () => {
  const { num } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/qna/getByNum`,
          num,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data);
        setPosts(response.data.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, [num]);

  return (
    <div className="qnainboard">
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
        <div>Q&A</div>
        {posts.que}
      </div>
      <div className="links_container">
        <Link to={`/questionboard`} className="styled_link">
          <h2>게시판 이동</h2>
        </Link>
        <Link to={`/write`} className="styled_link">
          <h2>Q&A 작성</h2>
        </Link>
      </div>
    </div>
  );
};

export default Inboard;
