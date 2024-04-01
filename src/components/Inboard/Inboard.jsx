import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Inboard = () => {
  const {id} = useParams();
  //const postList = dummy.boards.filter(board => board.id === id)
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:817/boards?id=${id}`);
        const data = await response.json();
        setPosts(data); 

        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally { 

      }
    };
    
    fetchData(); // fetchData 함수 호출
  }, [id]); 

  return (
    <div>
      <h1 className='header_logo'>
        <a href="/">
          <span>MOTIV</span>
        </a>
      </h1>
      <div>
        {posts.map(board =>
          <div key={board.id}>
            {board.post}
          </div>
          )}
      </div>
      <Link to={`/board`}>
          <h2>게시판 이동</h2>
      </Link>
    </div>
  );
};

export default Inboard;
