import React from 'react';
import "../../내가만든css/media.css";
import "../../내가만든css/style.css";
import style from './loginpage.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef,useEffect,useState } from 'react';


const Write = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const postRef = useRef(null);
  const [peopleName, setPeopleName] = useState("로그인");

  // 아이디 이름으로 바꾸기
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setPeopleName(user.user.nick);
    }
  }, []);

  //로그인/로그아웃 기능
  const handleLogout = () => {
    if(!localStorage.getItem('userData')){
      alert("로그인이 되어있지않습니다.")
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if(confirmLogin){
        navigate('/loginpage')
      }
    }
    else {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if(confirmLogout){
        setPeopleName("로그인"); // 이름 초기화
        localStorage.removeItem('userData'); // 로컬 스토리지에서 사용자 정보 삭제
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const ID = JSON.parse(localStorage.getItem('userData'));

    if (!localStorage.getItem('userData')) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!titleRef.current.value || !postRef.current.value) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:817/boards/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ID.name,
          phone: ID.phone,
          titleBoard: titleRef.current.value,
          post: postRef.current.value,
          like:[]
        }),
      });

      if (res.ok) {
        alert("생성이 완료되었습니다.");
        // 게시물 데이터 설정
        navigate('/questionboard');
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
              <h3>게시판 글 등록</h3>
                <div className='board_write'>
                  <div className='title'>
                    <label>제목</label>
                    <input type="text" placeholder="제목" ref ={titleRef}/>
                  </div>
                  <div className='info'>
                    글쓴이
                  </div>
                  <div className='cont'>
                    <label>글 내용</label>
                    <textarea placeholder='내용입력' ref ={postRef}></textarea>
                  </div>
                  <button>등록하기</button>
                </div>
          </form>
      </div>
    </>
  );
}

export default Write;