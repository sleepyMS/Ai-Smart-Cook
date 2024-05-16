import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link와 useNavigate 추가
import "./Recipeboard.css"

const Recipeboard = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate 훅을 이용해 navigate 함수를 가져옴

  const onSubmitRecipewrite = () => {
    navigate('/recipewrite');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:817/boards/');
        const data = await response.json();
        setBoards(data); 

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

  return (
    <div>
      <h1 className='header_logo'>
        <Link to= '/'>MOTIV</Link>
        <div className="buttonMagin">
          <li><button onClick={onSubmitRecipewrite}>레시피 등록</button></li>
      </div>
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
                <Link to={`/inboard/${board.id}`}>
                  <h3>제목: {board.titleBoard}</h3>
                </Link>
                <p>{board.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recipeboard;
