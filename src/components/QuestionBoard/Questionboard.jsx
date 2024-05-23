import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Questionboard.css";
import axios from "axios";

const Question = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState({});
  const [sortOption, setSortOption] = useState("default"); // 기본값을 "default"로 설정
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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedBoards = [...boards].sort((a, b) => {
    if (sortOption === "view") {
      return (viewCounts[b.num] || 0) - (viewCounts[a.num] || 0);
    } else if (sortOption === "default") {
      return 0; // 기본 순서 유지
    }
    return 0;
  });

  return (
    <div className="qnaboard">
      <h1 className="header_logo">
        <Link to="/">MOTIV</Link>
      </h1>
      <div className="board-container">
        <div className="sort-options">
          <label htmlFor="sort">정렬 기준: </label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="default">기본 순서</option>
            <option value="view">조회수 순</option>
          </select>
        </div>
        <h2>게시물 목록</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="board-list">
            {sortedBoards.map((board) => (
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
