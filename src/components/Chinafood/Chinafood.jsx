import React, { useState } from "react";
import Main from "../section/Main";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";

const Chinafood = () => {
  const location = useLocation();
  const message = location.state?.message || "";
  const data = JSON.parse(message);

  const recipes = [
    {
      title: data.title[0],
      ingredients: data.ingredients[0],
      recipe: data.procedures[0],
      tip: data.tips[0],
      extra: data.extras[0],
    },
    {
      title: data.title[1],
      ingredients: data.ingredients[1],
      recipe: data.procedures[1],
      tip: data.tips[1],
      extra: data.extras[1],
    },
    {
      title: data.title[2],
      ingredients: data.ingredients[2],
      recipe: data.procedures[2],
      tip: data.tips[2],
      extra: data.extras[2],
    },
    {
      title: data.title[3],
      ingredients: data.ingredients[3],
      recipe: data.procedures[3],
      tip: data.tips[3],
      extra: data.extras[3],
    },
    {
      title: data.title[4],
      ingredients: data.ingredients[4],
      recipe: data.procedures[4],
      tip: data.tips[4],
      extra: data.extras[4],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(0);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  const openModal = (index) => {
    setCurrentData(index);
    setModalSlideIndex(0);
    setIsOpen(true);
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
      <div
        className="btnrecipe"
        style={{
          width: "1000px", // 너비를 1000px로 설정합니다.
          height: "400px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {recipes.map((recipe, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              transition: "opacity 0.5s ease-in-out",
              opacity: index === currentData ? 1 : 0,
              width: "300px",
              height: "200px",
              zIndex: index === currentData ? 1 : 0,
              cursor: "pointer",
              background: "skyblue",
              display: "flex", // 텍스트를 가운데 정렬하기 위해 flex로 설정합니다.
              justifyContent: "center", // 텍스트를 가로로 가운데 정렬합니다.
              alignItems: "center", // 텍스트를 세로로 가운데 정렬합니다.
              textAlign: "center", // 텍스트를 수평 가운데 정렬합니다.
            }}
            onClick={() => openModal(index)}
          >
            {recipe.title}
          </div>
        ))}
        <button
          style={{
            position: "absolute",
            top: "50%",
            left: "10px", // 왼쪽 버튼의 위치를 수정합니다.
            transform: "translateY(-50%)",
            zIndex: 999, // 버튼이 가려져 있더라도 모달 창보다 위에 나오도록 z-index 값을 설정합니다.
          }}
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          style={{
            position: "absolute",
            top: "50%",
            right: "10px", // 오른쪽 버튼의 위치를 수정합니다.
            transform: "translateY(-50%)",
            zIndex: 999, // 버튼이 가려져 있더라도 모달 창보다 위에 나오도록 z-index 값을 설정합니다.
          }}
          onClick={nextSlide}
        >
          Next
        </button>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
          }}
        >
          {currentData + 1}/{recipes.length}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999, // 모달 창의 배경에 대한 z-index 값을 설정합니다.
          },
          content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 10000, // 모달 창의 z-index 값을 설정합니다.
          },
        }}
      >
        {modalSlideIndex === 0 && <div>{recipes[currentData].title}</div>}
        {modalSlideIndex === 1 && <div>{recipes[currentData].ingredients}</div>}
        {modalSlideIndex === 2 && <div>{recipes[currentData].recipe}</div>}
        {modalSlideIndex === 3 && <div>{recipes[currentData].tip}</div>}
        {modalSlideIndex === 4 && <div>{recipes[currentData].extra}</div>}
        <div style={{ marginTop: "20px" }}>
          <button onClick={prevModalSlide}>Prev</button>
          <button onClick={nextModalSlide}>Next</button>
        </div>
      </Modal>
    </Main>
  );
};

export default Chinafood;
