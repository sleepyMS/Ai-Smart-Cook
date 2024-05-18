import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Questionboard.css";
import axios from "axios";

const Question = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState({});
  const [likes, setLikes] = useState([]);

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
        console.log(boards);
        const likesResponse = await fetch("http://localhost:817/likes/");
        const likesData = await likesResponse.json();
        setLikes(likesData);

        if (!likesResponse.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다");
        }
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

    const storedLikes = localStorage.getItem("like");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

  const increaseViewCount = (id) => {
    if (localStorage.getItem("userData")) {
      const newViewCounts = { ...viewCounts };
      newViewCounts[id] = (newViewCounts[id] || 0) + 1;
      setViewCounts(newViewCounts);
      localStorage.setItem("viewCounts", JSON.stringify(newViewCounts));
    } else {
      alert("로그인을 해주세요.");
    }
  };

  //좋아요 클릭
  const handleLikeClick = async (id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      const existingLikeIndex = likes.findIndex(
        (like) => like.boardId === id && like.nick === user.user.nick
      );

      if (existingLikeIndex === -1) {
        const foundBoard = boards.find((board) => board.num === id);
        try {
          const response = await fetch("http://localhost:817/likes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              boardId: foundBoard.num,
              titleBoard: foundBoard.title,
              nick: user.user.nick,
            }),
          });

          if (response.ok) {
            const responseData = await response.json();
            setLikes((prevLikes) => [...prevLikes, responseData]);
            localStorage.setItem(
              "like",
              JSON.stringify([...likes, responseData])
            );
          } else {
            throw new Error("좋아요 추가에 실패했습니다");
          }
        } catch (error) {
          console.error("좋아요 추가 중 오류 발생:", error);
        }
      } else {
        const foundLike = likes[existingLikeIndex];
        try {
          if (foundLike && foundLike.id) {
            const response = await fetch(
              `http://localhost:817/likes/${foundLike.id}`,
              {
                method: "DELETE",
              }
            );

            if (response.ok) {
              const updatedLikes = likes.filter(
                (like) => like.id !== foundLike.id
              );
              setLikes(updatedLikes);
              localStorage.setItem("like", JSON.stringify(updatedLikes));
            } else {
              throw new Error("좋아요 삭제에 실패했습니다");
            }
          } else {
            throw new Error("좋아요 ID를 찾을 수 없습니다");
          }
        } catch (error) {
          console.error("좋아요 삭제 중 오류 발생:", error);
        }
      }
    }
  };

  const checkLikeStatus = (id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      return likes.some(
        (like) => like.boardId === id && like.nick === user.user.nick
      );
    }
    return false;
  };

  return (
    <div>
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
                <p>{board.email}</p>
                <p>조회수: {viewCounts[board.num] || 0}</p>
                {localStorage.getItem("userData") && (
                  <div>
                    <button onClick={() => handleLikeClick(board.num)}>
                      {checkLikeStatus(board.num) ? "좋아요 취소" : "좋아요"}
                    </button>
                  </div>
                )}
                <p>
                  좋아요 수:{" "}
                  {likes.filter((like) => like.boardId === board.num).length}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Question;
