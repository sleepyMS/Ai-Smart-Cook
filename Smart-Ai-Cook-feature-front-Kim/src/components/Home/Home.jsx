import React from 'react';
import Main from '../section/Main';
import './koreafood.css'; // CSS 파일을 import하여 스타일링
import { useNavigate } from 'react-router-dom';
import LoadingModal from "../Loadingmodal/Loadingmodal";
import gpt from "../../api/gpt";
import { useState } from 'react';


const Home = () => {
    const navigate = useNavigate(); 
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitKoreafood = () => {
        navigate('/koreafood'); 
    }
    const onSubmitFastfood = async (e) => {
      e.preventDefault();
      try {
          setIsLoading(true);
          const userData = JSON.parse(localStorage.getItem('userData'));
          if (!userData) {
              const confirmLogin = window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?");
              if (confirmLogin) {
                  navigate('/loginpage');
              }
              return;
          }
          const message = await gpt({
              prompt: `패스트푸드`
          });
          navigate('/fastfood', { state: { message } });
      } catch (error) {
          console.error("An error occurred:", error);
      } finally {
          setIsLoading(false);
      }
  }
    function onSubmitChinafood() {
        navigate('/chinafood'); 
    }
    function onSubmitJapanfood() {
        navigate('/japanfood'); 
    }
    function onSubmitEuropefood() {
        navigate('/europefood'); 
    }
    function onSubmitDessert() {
        navigate('/dessert'); 
    }
    function onSubmitBread() {
        navigate('/bread'); 
    }
    function onSubmitSnackfood() {
        navigate('/snackfood'); 
    }
    function onSubmitAsiafood() {
        navigate('/asiafood'); 
    }
    
  return (
    <Main>
      <div className="grid-container">
        {/* 3x3 그리드 아이템 */}
        <div onClick={onSubmitFastfood} className="grid-item">패스트푸드</div>
        <div onClick={onSubmitKoreafood} className="grid-item">한식</div>
        <div onClick={onSubmitChinafood} className="grid-item">중식</div>
        <div onClick={onSubmitJapanfood} className="grid-item">일식</div>
        <div onClick={onSubmitEuropefood} className="grid-item">양식</div>
        <div onClick={onSubmitDessert} className="grid-item">디저트</div>
        <div onClick={onSubmitBread} className="grid-item">빵</div>
        <div onClick={onSubmitSnackfood} className="grid-item">분식</div>
        <div onClick={onSubmitAsiafood} className="grid-item">아시안</div>
      </div>
      {isLoading && <LoadingModal />}
    </Main>
  );
};

export default Home;
