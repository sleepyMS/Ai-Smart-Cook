import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../내가만든css/media.css";
import "../../내가만든css/style.css";

const Recipewrite = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const postRef = useRef(null);
  const indRef = useRef(null);
  const [peopleName, setPeopleName] = useState("로그인");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setPeopleName(user.name);
    }
  }, []);

  const handleLogout = () => {
    if (!localStorage.getItem('user')) {
      alert("로그인이 되어있지않습니다.")
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate('/loginpage')
      }
    } else {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        setPeopleName("로그인");
        localStorage.removeItem('user');
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentValue = postRef.current.value;
      const lines = currentValue.split('\n');
      const lastLine = lines[lines.length - 1];
      if (!lastLine) return; // 비어 있는 줄은 건너뜀
      if (!lastLine.startsWith(lines.length + 1 + '. ')) {
        postRef.current.value += `\n${lines.length + 1}. `;
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ID = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user')) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (!titleRef.current.value || !postRef.current.value) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:817/recipes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ID.name,
          ingredient: indRef.current.value,
          titleBoard: titleRef.current.value,
          post: postRef.current.value,
        }),
      });
      if (res.ok) {
        alert("생성이 완료되었습니다.");
        navigate('/recipeboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className='header_logo'>
        <a href="/">
          <span>MOTIV</span>
        </a>
        <button onClick={handleLogout}>{peopleName}</button>
      </h1>
      <div>
        <form onSubmit={onSubmit}>
          <h3>레시피 글 등록</h3>
          <div className='board_write'>
            <div className='title'>
              <label>제목</label>
              <input type="text" placeholder="제목" ref ={titleRef}/>
            </div>
            <div className='title'>
              <label>재료</label>
              <input type="text" placeholder="재료" ref ={indRef}/>
            </div>
            <div className='info'>
              글쓴이
            </div>
            <div className='cont'>
              <label>글 내용</label>
              <textarea 
                placeholder=' 1.
                            2.
                            3.
                            4.' 
                defaultValue='' 
                ref={postRef} 
                onKeyDown={handleKeyDown} 
              />
            </div>
            <button>등록하기</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Recipewrite;
