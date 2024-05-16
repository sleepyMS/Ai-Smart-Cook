import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gpt from "../../api/gpt";
import LoadingModal from "../Loadingmodal/Loadingmodal";
import "../../내가만든css/Header.css";
import Aialert1 from '../Aialert/Aialert1';

const Header = () => {
  const navigate = useNavigate();
  const [peopleName, setPeopleName] = useState("로그인");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setPeopleName(user.nick);
    }
  }, []);

  const onSubmitLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user)
      navigate('/Mypage');
    else {
      alert("로그인이 되어있지 않습니다.");
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
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

  const onSubmitQuestion = () => {
    navigate('/questionboard');
  }

  const onSubmitWrite = () => {
    navigate('/write');
  }

  const handleLogout = () => {
    if (!localStorage.getItem('user')) {
      alert("로그인이 되어있지않습니다.");
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate('/loginpage');
      }
    } else {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        setPeopleName("로그인");
        localStorage.removeItem('user');
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setIsInputEmpty(true);
      return;
    }
    try {
      setIsLoading(true);
      const message = await gpt({
        prompt: `${searchInput}`
      });
      navigate('/recipe', { state: { message } });
    } catch (error) {
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

  return (
    <header id='header' role='banner'>
      <div className='header'>
        <h1 className='header_main'>
          <a href="/">
            <em aria-hidden='true'></em>
            <div className='header_logo'>
              <span><h1><strong>MOTIV</strong></h1></span>
            </div>
          </a>
        </h1>
        <div className='buttonMargin'>
          <button onClick={onSubmitRecipeboard}>레시피 게시판</button>
          <button onClick={onSubmitRecipewrite}>레시피 등록</button>
          <button onClick={onSubmitQuestion}>Q&A 게시판</button>
          <button onClick={onSubmitWrite}>Q&A 등록</button>
        </div>

        <div className='header_list'>
          <button onClick={onSubmitLogin}>{peopleName}</button>
          {peopleName === "로그인" && <button onClick={onSubmitRegister}>회원가입</button>}
          {peopleName !== "로그인" && <button onClick={handleLogout}>로그아웃</button>}
          <form onSubmit={onSubmit} className='search-form'>
          <div className='input-container'>
            <button type="submit">검색</button>
            <input type='text' placeholder='재료 -> 음식 or 음식 -> 재료를 검색하시오.' value={searchInput} onChange={handleChange}></input>
          </div>
       
        </form>
        
        </div>
        
      </div>
      

      {isInputEmpty && <Aialert1 onCancel={handleCancel} />}
      {isLoading && <LoadingModal />}
      
    </header>
  );
}

export default Header;
