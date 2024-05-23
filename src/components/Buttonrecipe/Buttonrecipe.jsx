import React, { useState } from "react";
import Main from "../section/Main";
import { useLocation } from "react-router-dom";
import Modal from "react-modal"; // react-modal 라이브러리를 import합니다.

const Buttonrecipe = () => {
  const location = useLocation();
  const message = location.state?.message || "";
  const data = JSON.parse(message);

  // 타이틀, 재료, 제조 방법을 포함하는 데이터 구조
  const recipes = [
    {
      title: data.title[0],
      ingredients: data.ingredient[0],
      recipe: data.procedure[0],
    },
    {
      title: data.title[1],
      ingredients: data.ingredient[1],
      recipe: data.procedure[1],
    },
    {
      title: data.title[2],
      ingredients: data.ingredient[2],
      recipe: data.procedure[2],
    },
    {
      title: data.title[3],
      ingredients: data.ingredient[3],
      recipe: data.procedure[3],
    },
    {
      title: data.title[4],
      ingredients: data.ingredient[4],
      recipe: data.procedure[4],
    },
  ];

  // 모달 창을 열기 위한 상태를 관리합니다.
  const [isOpen, setIsOpen] = useState(false);
  // 현재 선택된 레시피의 인덱스를 저장하는 상태를 추가합니다.
  const [currentData, setCurrentData] = useState(0);
  // 모달 내 슬라이드 인덱스를 관리하는 상태
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  // 모달 창을 열고 선택된 레시피의 인덱스를 설정하는 함수를 정의합니다.
  const openModal = (index) => {
    setCurrentData(index); // 선택된 레시피의 인덱스를 설정합니다.
    setModalSlideIndex(0); // 슬라이드 인덱스를 초기화합니다.
    setIsOpen(true); // 모달 창을 엽니다.
  };

  // 모달 창을 닫는 함수를 정의합니다.
  const closeModal = () => {
    setIsOpen(false); // 모달 창을 닫습니다.
  };

  // 모달 내 다음 슬라이드로 이동하는 함수
  const nextModalSlide = () => {
    setModalSlideIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  // 모달 내 이전 슬라이드로 이동하는 함수
  const prevModalSlide = () => {
    setModalSlideIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  // 다음 이미지로 이동하는 함수
  const nextSlide = () => {
    setCurrentData((prevIndex) =>
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 이전 이미지로 이동하는 함수
  const prevSlide = () => {
    setCurrentData((prevIndex) =>
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  };

  return (
    <Main>
      <div
        style={{
          width: "400px",
          height: "400px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 이미지 목록을 순회하며 현재 인덱스에 맞게 이미지를 보여줍니다. */}
        {recipes.map((recipe, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: "50%", // 이미지를 가운데로 이동시킵니다.
              top: "50%", // 이미지를 가운데로 이동시킵니다.
              transform: "translate(-50%, -50%)", // 이미지를 가운데로 정렬합니다.
              transition: "opacity 0.5s ease-in-out",
              opacity: index === currentData ? 1 : 0, // 현재 이미지만 표시합니다.
              width: "300px", // 이미지의 너비를 200px로 설정합니다.
              height: "200px", // 이미지의 높이를 100px로 설정합니다.
              zIndex: index === currentData ? 1 : 0, // 현재 이미지만 z-index를 높여 화면에 표시합니다.
              cursor: "pointer", // 이미지에 마우스를 올렸을 때 커서 모양을 변경합니다.
            }}
            onClick={() => openModal(index)} // 이미지를 클릭했을 때 openModal 함수 호출
          >
            {recipe.title}
          </div>
        ))}
        {/* 이전 슬라이드로 이동하는 버튼 */}
        <button
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
          }}
          onClick={prevSlide}
        >
          Prev
        </button>
        {/* 다음 슬라이드로 이동하는 버튼 */}
        <button
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
          }}
          onClick={nextSlide}
        >
          Next
        </button>
        {/* 현재 이미지의 번호를 표시합니다. */}
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
      {/* 모달 창을 나타냅니다. */}
      <Modal
        isOpen={isOpen} // 모달 창이 열려있는지 여부를 나타냅니다.
        onRequestClose={closeModal} // 모달 창을 닫는 함수를 호출합니다.
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 창 배경색을 설정합니다.
          },
          content: {
            width: "400px", // 모달 창 너비를 설정합니다.
            height: "300px", // 모달 창 높이를 설정합니다.
            margin: "auto", // 모달 창을 가운데 정렬합니다.
            display: "flex", // 내용을 가로로 정렬합니다.
            flexDirection: "column", // 세로 정렬을 추가합니다.
            justifyContent: "center", // 내용을 가운데 정렬합니다.
            alignItems: "center", // 내용을 가운데 정렬합니다.
            backgroundColor: "white", // 모달 창 배경색을 설정합니다.
          },
        }}
      >
        {/* 모달 창에 선택된 레시피의 제목, 재료, 제조 방법을 슬라이드로 표시합니다. */}
        {modalSlideIndex === 0 && <div>{recipes[currentData].title}</div>}
        {modalSlideIndex === 1 && <div>{recipes[currentData].ingredients}</div>}
        {modalSlideIndex === 2 && <div>{recipes[currentData].recipe}</div>}
        <div style={{ marginTop: "20px" }}>
          <button onClick={prevModalSlide}>Prev</button>
          <button onClick={nextModalSlide}>Next</button>
        </div>
      </Modal>
    </Main>
  );
};

export default Buttonrecipe;
