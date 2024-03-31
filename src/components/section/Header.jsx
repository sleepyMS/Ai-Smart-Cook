import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gpt from "../../api/gpt"
import LoadingModal from "../../components/Loadingmodal"; // LoadingModal 추가
import "../../내가만든css/Header.css";
import Aialert1 from '../../components/Aialert1';

const Header = () => {
  const navigate = useNavigate();
  const [peopleName, setPeopleName] = useState("로그인");
  const [isLoading, setIsLoading] = useState(false); // 로딩 중인지 여부를 나타내는 상태
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값을 관리하는 상태
  const [isInputEmpty, setIsInputEmpty] = useState(false); // 입력값이 비었는지 여부를 나타내는 상태
 
  //로그인 됐을 때 이름 변경
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setPeopleName(user.name);
    }
  }, []);

  const onSubmitLogin = () => {
    navigate('/loginpage');
  }

  const onSubmitRegister = () => {
    navigate('/registerpage1');
  }

  const onSubmitInboard = () => {
    navigate('/inboard');
  }

  const onSubmitBoard = () => {
    navigate('/board');
  }

  const onSubmitQuestion = () =>{
    navigate('/question');
  }

  const onSubmitWrite = () =>{
    navigate('/write');
  }
  //로그아웃 관련
  const handleLogout = () => {
    if(!localStorage.getItem('user')){
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
        localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 삭제
      }
    }
  }

  // 챗지피티 api 호출 
  const onSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 행동 방지
    if (!searchInput.trim()) {
      // 검색 입력값이 비어 있는 경우 경고 메시지 표시
      setIsInputEmpty(true);
      return;
    }
    try {
      setIsLoading(true); // API 호출 시작 시 로딩 상태 설정
      const message = await gpt({
        prompt : `${searchInput}`
      });
      navigate('/recipe',{state : {message}});
    } catch(error) {
      // 오류 처리
    } finally {
      setIsLoading(false); // API 호출 종료 시 로딩 상태 해제
    }
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value); // 입력값 변경 시 상태 업데이트
    setIsInputEmpty(false); // 입력값이 변경되면 비어 있음 상태를 false로 설정
  }

  const handleCancel = () => {
    setIsInputEmpty(false); // 경고 메시지 상태를 false로 설정하여 숨김
  }

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
        <button onClick={onSubmitRegister}>회원가입 창으로 이동</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={onSubmitBoard}>게시판 등록</button>
        <button onClick={onSubmitInboard}>????</button>
        <button onClick={onSubmitQuestion}>Q&A</button>
        <button onClick={onSubmitWrite}>레시피 등록</button>
        <form onSubmit={onSubmit}>
          <input type='text' placeholder='재료 -> 음식 or 음식 -> 재료를 검색하시오.' value={searchInput} onChange={handleChange}></input>
          <button type="submit">검색</button>
        </form>
      </div>
      {isInputEmpty && <Aialert1 onCancel={handleCancel} />} {/* 검색 입력값이 비었을 때 경고 메시지 표시 */}
      {isLoading && <LoadingModal />} {/* isLoading이 true일 때 LoadingModal을 렌더링 */}
    </header>
  );
}

export default Header;
