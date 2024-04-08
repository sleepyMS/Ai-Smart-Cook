import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 추가
import "./Questionboard.css"

const Question = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  //게시판 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:817/boards/');
        const data = await response.json();
        setBoards(data);
        console.log(data);

        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 변경
      }
    };
    
    fetchData(); // fetchData 함수 호출
  }, []); // 배열의 값이 바뀔 떄만 실행 -> 의존성 배열 , 빈 배열은 실행 한번만

  // 각 게시물의 조회수와 좋아요 정보를 관리하는 상태
  const [viewCounts, setViewCounts] = useState({});
  const [likes, setLikes] = useState({});

  // 게시물 제목을 클릭할 때마다 조회수를 증가시키는 함수
  const increaseViewCount = (id) => {
    if (localStorage.getItem('user')) {
      const newViewCounts = { ...viewCounts };
      newViewCounts[id] = (newViewCounts[id] || 0) + 1;
      setViewCounts(newViewCounts);

      // 로컬 저장소에 조회수 저장
      localStorage.setItem('viewCounts', JSON.stringify(newViewCounts));
    }
    else 
      alert("로그인을 해주세요.")
  };

    // 좋아요를 증가시키는 함수
    const increaseLike = (id) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const newLikes = { ...likes };
        newLikes[id] = newLikes[id] || [];
        if (!newLikes[id].includes(user.name)) {
          newLikes[id].push(user.name);
          setLikes(newLikes);
          // 로컬 저장소에 좋아요 정보 저장
          localStorage.setItem('like', JSON.stringify(newLikes));
    
          console.log(localStorage)
    
          // 해당 게시물의 좋아요 정보를 서버에 업데이트
          const foundBoard = boards.find(board => board.id === id);
          fetch(`http://localhost:817/likes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              titleBoard: foundBoard.titleBoard,
              name: user.name 
            }), // 사용자의 이름만 전송
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('좋아요 정보를 업데이트하는데 실패했습니다');
            }
          })
          .catch(error => console.error('좋아요 정보 업데이트 중 오류 발생:', error));
        }
      }
    };
    
    
    // 좋아요를 감소시키는 함수
    const decreaseLike = (id) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && likes[id] && likes[id].includes(user.name)) {
        const newLikes = { ...likes };
        newLikes[id] = newLikes[id].filter(name => name !== user.name);
        setLikes(newLikes);
        // 로컬 저장소에 좋아요 정보 저장
        localStorage.setItem('like', JSON.stringify(newLikes));
    
        // 해당 게시물의 좋아요 정보를 서버에서 삭제
        fetch(`http://localhost:817/likes/${id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('좋아요 정보를 삭제하는데 실패했습니다');
          }
        })
        .catch(error => console.error('좋아요 정보 삭제 중 오류 발생:', error));
      }
    };
    
    



  // 컴포넌트가 처음 렌더링될 때 로컬 저장소에서 조회수와 좋아요 정보를 불러옴
  useEffect(() => {
    const storedViewCounts = localStorage.getItem('viewCounts');
    if (storedViewCounts) {
      setViewCounts(JSON.parse(storedViewCounts));
    }

    const storedLikes = localStorage.getItem('likes');
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
          <p>Loading...</p> // 로딩 중일 때 표시될 내용
        ) : (
          <ul className="board-list">
            {boards.length > 0 && boards.map((board, index) => (
              <li key={index} className="board-item">
                {/* Link를 이용해 클릭 시 URL 변경 */}
                <Link to={localStorage.getItem('user') ? `/inboard/${board.id}` : '#'} onClick={() => increaseViewCount(board.id)}>
                  <h3>제목: {board.titleBoard}</h3>
                </Link>
                <p>{board.name}</p>
                {/* 각 게시물의 조회수를 표시 */}
                <p>조회수: {viewCounts[board.id] || 0}</p>
                {/* 좋아요 버튼 */}
                {localStorage.getItem('user') && (
                  <div>
                    <button onClick={() => increaseLike(board.id)}>좋아요</button>
                    <button onClick={() => decreaseLike(board.id)}>좋아요 취소</button>
                  </div>
                )}
                {/* 좋아요 수 */}
                <p>좋아요 수: {likes[board.id] ? likes[board.id].length : 0}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Question;
