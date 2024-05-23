import React, { useState } from "react";
import Main from "../section/Main";
import { useLocation } from "react-router-dom";
import Modal from "react-modal"; // 모달 관련 라이브러리 import
import "./Buttonrecipe.css";

const Buttonrecipe = () => {
  const location = useLocation();
  const message = location.state?.message || "";
  const data = JSON.parse(message);

  const recipes = [
    {
      title: data.title[0],
      ingredient: data.ingredient[0],
      recipe: data.procedure[0],
      tip: data.tip[0],
      extra: data.extra[0],
    },
    {
      title: data.title[1],
      ingredient: data.ingredient[1],
      recipe: data.procedure[1],
      tip: data.tip[1],
      extra: data.extra[1],
    },
    {
      title: data.title[2],
      ingredient: data.ingredient[2],
      recipe: data.procedure[2],
      tip: data.tip[2],
      extra: data.extra[2],
    },
    {
      title: data.title[3],
      ingredient: data.ingredient[3],
      recipe: data.procedure[3],
      tip: data.tip[3],
      extra: data.extra[3],
    },
    {
      title: data.title[4],
      ingredient: data.ingredient[4],
      recipe: data.procedure[4],
      tip: data.tip[4],
      extra: data.extra[4],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(0);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  const openModal = (index) => {
    setCurrentData(index);
    setModalSlideIndex(0);
    setIsOpen(true); // 모달을 열도록 설정
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextModalSlide = () => {
    setModalSlideIndex((prevIndex) => (prevIndex === 4 ? 0 : prevIndex + 1));
  };

  const prevModalSlide = () => {
    setModalSlideIndex((prevIndex) => (prevIndex === 0 ? 4 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentData((prevIndex) =>
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentData((prevIndex) =>
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  };

  return (
    <Main>
      <div className="btnrecipe">
        <div className="slider-container">
          {recipes.map((recipe, index) => (
            <button
              key={index}
              className={`slide ${index === currentData ? "active" : ""}`}
              onClick={() => openModal(index)}
            >
              {recipe.title}
            </button>
          ))}

          <button className="prev-button" onClick={prevSlide}>
            Prev
          </button>
          <button className="next-button" onClick={nextSlide}>
            Next
          </button>
          <div className="slide-indicator">
            {currentData + 1}/{recipes.length}
          </div>
        </div>
        {/* 모달 대화 상자 주석 처리 */}
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          {modalSlideIndex === 0 && <div>{recipes[currentData].title}</div>}
          {modalSlideIndex === 1 && (
            <div>{recipes[currentData].ingredient}</div>
          )}
          {modalSlideIndex === 2 && <div>{recipes[currentData].recipe}</div>}
          {modalSlideIndex === 3 && <div>{recipes[currentData].tip}</div>}
          {modalSlideIndex === 4 && <div>{recipes[currentData].extra}</div>}
          <div className="modal-controls">
            <button onClick={prevModalSlide}>Prev</button>
            <button onClick={nextModalSlide}>Next</button>
          </div>
        </Modal>
      </div>
    </Main>
  );
};

export default Buttonrecipe;
