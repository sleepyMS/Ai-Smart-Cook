import React, { useState } from "react";
import Main from "../section/Main";
import "./koreafood.css"; // CSS 파일을 import하여 스타일링
import { useNavigate } from "react-router-dom";
import LoadingModal from "../Loadingmodal/Loadingmodal";
import gpt from "../../api/gpt";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    "패스트푸드",
    "한식",
    "중식",
    "일식",
    "양식",
    "디저트",
    "빵",
    "분식",
    "아시안"
  ];

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? categories.length - 1 : prevIndex - 1));
  };

  return (
    <Main>
      <div className="grid-container">
        {categories.map((category, index) => (
          <div key={index} onClick={() => onSubmitCategory(category)} className={`grid-item ${index === currentIndex ? "active" : ""}`}>
            {category.toUpperCase()}
          </div>
        ))}
        <div className="slider-controls">
          <button onClick={prevSlide} className="slider-button">Prev</button>
          <button onClick={nextSlide} className="slider-button">Next</button>
        </div>
      </div>
      {isLoading && <LoadingModal />}
    </Main>
  );
};

export default Home;
