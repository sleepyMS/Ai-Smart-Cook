import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gpt from "../../api/gpt"
import LoadingModal from "../Loadingmodal/Loadingmodal";
import "../../내가만든css/Header.css";
import Aialert1 from '../Aialert/Aialert1';

const Header = () => {
  const navigate = useNavigate();
  const [peopleName, setPeopleName] = useState("로그인");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  
  //로그인 여부
  const checkLoginStatus = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setPeopleName(user.nick);
    } else {
      setPeopleName("로그인");
    }
  };
  
 //직접 로그아웃 기능
  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      setPeopleName("로그인");
      localStorage.removeItem('user');
    }
  }

  // 창 나가면 로그아웃
  const handleLogoutOnWindowClose = () => {
    localStorage.removeItem('user');
  };

  // 마이페이지 이동 코드
  const onSubmitLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      navigate('/Mypage');
    } else {
      alert("로그인이 되어있지않습니다.");
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if(confirmLogin){
        navigate('/loginpage');
      }
    }
  }

  const onSubmitRegister = () => {
    navigate('/registerpage1');
  }

  const onSubmitRecipeboard = () => {
    navigate('/recipeboard');
  }

  const onSubmitRecipewrite = () => {
    navigate('/recipewrite');
  }

  const onSubmitQuestion = () =>{
    navigate('/questionboard');
  }

  const onSubmitWrite = () =>{
    navigate('/write');
  }

  // 챗지피티 검색 
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setIsInputEmpty(true);
      return;
    }
    try {
      setIsLoading(true);
      const message = await gpt({
        prompt : `${searchInput}`
      });
      navigate('/recipe',{state : {message}});
    } catch(error) {
      // 오류 처리
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setIsInputEmpty(false);
  }

  const handleCancel = () => {
    setIsInputEmpty(false);
  }
  
  // 창 나가는 useEffect
  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('beforeunload', handleLogoutOnWindowClose);
    return () => {
      window.removeEventListener('beforeunload', handleLogoutOnWindowClose);
    };
  }, []); // 의존성 배열 비워둠

  return (
    <header id='header' role='banner'>
      <h1 className='header_logo'>
        <a href="/">
          <em aria-hidden='true'></em>
          <span>MOTIV</span>
        </a>
      </h1>
      <div className="buttonMagin">
        <button onClick={onSubmitLogin}>{peopleName}</button>
        {peopleName === "로그인" && <button onClick={onSubmitRegister}>회원가입 창으로 이동</button>}
        {peopleName !== "로그인" && <button onClick={handleLogout}>로그아웃</button>}
        <button onClick={onSubmitRecipewrite}>레시피 등록</button>
        <button onClick={onSubmitRecipeboard}>레시피 게시판</button>
        <button onClick={onSubmitQuestion}>Q&A 게시판</button>
        <button onClick={onSubmitWrite}>Q&A 등록</button>
        <form onSubmit={onSubmit}>
          <input type='text' placeholder='재료 -> 음식 or 음식 -> 재료를 검색하시오.' value={searchInput} onChange={handleChange}></input>
          <button type="submit">검색</button>
        </form>
      </div>
      {isInputEmpty && <Aialert1 onCancel={handleCancel} />}
      {isLoading && <LoadingModal />}
    </header>
  );
}

export default Header;
