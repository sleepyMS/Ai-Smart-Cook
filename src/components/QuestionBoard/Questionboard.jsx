import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Questionboard.css";
import axios from "axios";

const Question = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardResponse = await axios.post(
          "http://localhost:8080/qna/get",
          {
            from: 0,
            to: 10e5,
          }
        );
        setBoards(boardResponse.data.data);
        console.log(boardResponse.data.data);
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

  return (
    <div className="qnaboard">
      <h1 className="header_logo">
        <Link to="/">MOTIV</Link>
      </h1>
      <div className="board-container">
        <h2>게시물 목록</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="board-list">
            {boards.map((board) => (
              <li key={board.num} className="board-item">
                <Link
                  to={
                    localStorage.getItem("userData")
                      ? `/inboard/${board.num}`
                      : "#"
                  }
                  onClick={() => increaseViewCount(board.num)}
                >
                  <h3>제목: {board.title}</h3>
                </Link>
                <p>{board.nick}</p>
                <p>조회수: {viewCounts[board.num] || 0}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Question;
