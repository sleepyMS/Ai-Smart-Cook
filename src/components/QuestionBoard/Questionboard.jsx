import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Questionboard.css";

const Question = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState({});
  const [likes, setLikes] = useState([]);

  // 게시판 데이터와 좋아요 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardsResponse = await fetch('http://localhost:817/boards/');
        const boardsData = await boardsResponse.json();
        setBoards(boardsData);

        const likesResponse = await fetch('http://localhost:817/likes/');
        const likesData = await likesResponse.json();
        setLikes(likesData);

        if (!boardsResponse.ok || !likesResponse.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 조회수 증가 함수
  const increaseViewCount = (id) => {
    if (localStorage.getItem('user')) {
      const newViewCounts = { ...viewCounts };
      newViewCounts[id] = (newViewCounts[id] || 0) + 1;
      setViewCounts(newViewCounts);
      localStorage.setItem('viewCounts', JSON.stringify(newViewCounts));
    } else {
      alert("로그인을 해주세요.");
    }
  };

  // 좋아요 증가 함수
const increaseLike = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const newLikes = [...likes];
    const existingLike = newLikes.find(like => like.boardId === id && like.nick === user.nick);
    if (!existingLike) {
      newLikes.push({ boardId: id, nick: user.nick });
      setLikes(newLikes); // 좋아요 상태 업데이트
      localStorage.setItem('like', JSON.stringify(newLikes));

      const foundBoard = boards.find(board => board.id === id);
      await fetch(`http://localhost:817/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          boardId: foundBoard.id,
          titleBoard: foundBoard.titleBoard,
          nick: user.nick 
        }),
      });
    }
  }
};

// 좋아요 감소 함수
const decreaseLike = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const newLikes = [...likes];
    const likeIndex = newLikes.findIndex(like => like.boardId === id && like.nick === user.nick);
    if (likeIndex !== -1) {
      newLikes.splice(likeIndex, 1);
      setLikes(newLikes); // 좋아요 상태 업데이트
      localStorage.setItem('like', JSON.stringify(newLikes));

      const foundLike = likes.find(like => like.boardId === id && like.nick === user.nick);
      if (foundLike && foundLike.id) { // 추가된 부분: foundLike.id가 존재하는지 확인
        await fetch(`http://localhost:817/likes/${foundLike.id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('좋아요 정보를 삭제하는데 실패했습니다');
          }
        })
        .catch(error => console.error('좋아요 정보 삭제 중 오류 발생:', error));
      }
    }
  }
};


  useEffect(() => {
    const storedViewCounts = localStorage.getItem('viewCounts');
    if (storedViewCounts) {
      setViewCounts(JSON.parse(storedViewCounts));
    }

    const storedLikes = localStorage.getItem('like');
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

  return (
    <div>
      <h1 className='header_logo'>
        <Link to= '/'>MOTIV</Link>
      </h1>
      <div className="board-container">
        <h2>게시물 목록</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="board-list">
            {boards.map((board, index) => (
              <li key={index} className="board-item">
                <Link to={localStorage.getItem('user') ? `/inboard/${board.id}` : '#'} onClick={() => increaseViewCount(board.id)}>
                  <h3>제목: {board.titleBoard}</h3>
                </Link>
                <p>{board.name}</p>
                <p>조회수: {viewCounts[board.id] || 0}</p>
                {localStorage.getItem('user') && (
                  <div>
                    <button onClick={() => increaseLike(board.id)}>좋아요</button>
                    <button onClick={() => decreaseLike(board.id)}>좋아요 취소</button>
                  </div>
                )}
                <p>좋아요 수: {likes.filter(like => like.boardId === board.id).length}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Question;
