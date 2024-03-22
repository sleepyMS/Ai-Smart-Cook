import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks1/useFetch1';

const Header = () => {
  const navigate = useNavigate(); 
  const [peopleID, setPeopleID] = useState("로그인");
  const peopleData = useFetch('http://localhost:817/peoples');

  function onSubmitLogin() {
    navigate('/loginpage'); 
  }

  function onSubmitRegister() {
    navigate('/registerpage1'); 
  }
  function onSubmitBoard() {
    navigate('/board'); 
  }
  function onSubmitQuestion() {
    navigate('/question'); 
  }

  return (
    <header id='header' role='banner'>
      <h1 className='header_logo'>
        <a href="/">
          <em aria-hidden='true'></em>
          <span>MOTIV</span>
        </a>
      </h1>
      <div>
        <button onClick={onSubmitLogin}>{peopleID}</button>
      </div>
      <div>
        <button onClick={onSubmitRegister}>회원가입 창으로 이동</button>
      </div>
      <div>
        <button onClick={onSubmitBoard}>게시판 등록</button>
        <button onClick={onSubmitRegister}>????</button>
        <button onClick={onSubmitQuestion}>Q&A</button>
      </div>
    </header>
  );
}

export default Header;
