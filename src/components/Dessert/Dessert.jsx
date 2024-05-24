import React, { useState } from "react";
import Main from "../section/Main";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";

const Dessert = () => {
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
          width: "100%",
          maxWidth: "1000px",
          height: "400px",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto",
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
              width: "80%",
              height: "200px",
              zIndex: index === currentData ? 1 : 0,
              cursor: "pointer",
              background: "black",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
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
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 999,
            background: "black",
            color: "white",
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 999,
            background: "black",
            color: "white",
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
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
            zIndex: 9999,
          },
          content: {
            width: "80%",
            maxWidth: "500px",
            height: "400px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            color: "white",
            zIndex: 10000,
          },
        }}
      >
        {modalSlideIndex === 0 && (
          <div>
            <h3>Title</h3>
            <div>{recipes[currentData].title}</div>
          </div>
        )}
        {modalSlideIndex === 1 && (
          <div>
            <h3>Ingredient</h3>
            <div>{recipes[currentData].ingredients}</div>
          </div>
        )}
        {modalSlideIndex === 2 && (
          <div>
            <h3>Recipe</h3>
            <div>{recipes[currentData].recipe}</div>
          </div>
        )}
        {modalSlideIndex === 3 && (
          <div>
            <h3>Tip</h3>
            <div>{recipes[currentData].tip}</div>
          </div>
        )}
        {modalSlideIndex === 4 && (
          <div>
            <h3>Advice</h3>
            <div>{recipes[currentData].extra}</div>
          </div>
        )}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={prevModalSlide}>Prev</button>
          <button onClick={nextModalSlide}>Next</button>
        </div>
      </Modal>
    </Main>
  );
};

export default Dessert;
