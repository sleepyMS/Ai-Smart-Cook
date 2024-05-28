import React from "react";
import Main from "../section/Main";
import "./Home.css"; // CSS 파일을 import하여 스타일링
import { useNavigate } from "react-router-dom";
import LoadingModal from "../Loadingmodal/Loadingmodal";
import gpt from "../../api/gpt";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitCategory = async (category) => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData) {
        const confirmLogin = window.confirm(
          "로그인이 필요합니다. 로그인 하시겠습니까?"
        );
        if (confirmLogin) {
          navigate("/loginpage");
        }
        return;
      }
      const message = await gpt({
        prompt: category,
      });
      const data = JSON.parse(message);
      console.log(data);
      navigate(`/${category.toLowerCase()}`, { state: { message } });
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 각 카테고리에 대한 함수 호출
  const onSubmitKoreafood = () => onSubmitCategory("koreafood");
  const onSubmitFastfood = () => onSubmitCategory("fastfood");
  const onSubmitChinafood = () => onSubmitCategory("chinafood");
  const onSubmitJapanfood = () => onSubmitCategory("japanfood");
  const onSubmitEuropefood = () => onSubmitCategory("europefood");
  const onSubmitDessert = () => onSubmitCategory("dessert");
  const onSubmitBread = () => onSubmitCategory("bread");
  const onSubmitSnackfood = () => onSubmitCategory("snackfood");
  const onSubmitAsiafood = () => onSubmitCategory("asiafood");

  return (
    <Main>
      <div className="grid-container">
        {/* 3x3 그리드 아이템 */}
        <div
          style={{ position: "relative" }}
          onClick={onSubmitFastfood}
          className="grid-item fast-food"
        >
          <span>패스트푸드</span>
        </div>
        <div onClick={onSubmitKoreafood} className="grid-item korea-food">
          <span>한식</span>
        </div>
        <div onClick={onSubmitChinafood} className="grid-item china-food">
          <span>중식</span>
        </div>
        <div onClick={onSubmitJapanfood} className="grid-item japan-food">
          <span>일식</span>
        </div>
        <div onClick={onSubmitEuropefood} className="grid-item europe-food">
          <span>양식</span>
        </div>
        <div onClick={onSubmitDessert} className="grid-item dessert">
          <span>디저트</span>
        </div>
        <div onClick={onSubmitBread} className="grid-item bread">
          <span>빵</span>
        </div>
        <div onClick={onSubmitSnackfood} className="grid-item snack">
          <span>분식</span>
        </div>
        <div onClick={onSubmitAsiafood} className="grid-item asian">
          <span>아시안</span>
        </div>
      </div>
      {isLoading && <LoadingModal />}
    </Main>
  );
};

export default Home;
