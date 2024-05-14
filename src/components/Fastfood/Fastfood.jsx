import React from 'react';
import Main from '../section/Main';
import gpt from "../../api/gpt";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Fastfood = () => {
  const location = useLocation();
  const message = location.state?.message || "";
  const data = JSON.parse(message);
  const images = ["../../image1.jpg", "../../image2.jpg", "../../image3.jpg", "../../image4.jpg"];

  // 현재 이미지 인덱스를 상태로 관리합니다.
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 다음 이미지로 이동하는 함수
  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // 이전 이미지로 이동하는 함수
  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
    
  return (
    <Main>
      <div className="grid-container">
        <div style={{ color: 'white' }}>
          {data.title}
        </div>
        <div style={{ color: 'white' }}>
          {data.ingredient}
        </div>
        <div style={{ color: 'white' }}>
          {data.procedure}
        </div>
        <div style={{ color: 'white' }}>
          {data.TIP}
        </div>
      </div>

      <div style={{ width: '400px', height: '400px', position: 'relative', overflow: 'hidden' }}>
          {/* 이미지 목록을 순회하며 현재 인덱스에 맞게 이미지를 보여줍니다. */}
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '50%', // 이미지를 가운데로 이동시킵니다.
                top: '50%', // 이미지를 가운데로 이동시킵니다.
                transform: 'translate(-50%, -50%)', // 이미지를 가운데로 정렬합니다.
                transition: 'opacity 0.5s ease-in-out',
                opacity: index === currentImageIndex ? 1 : 0, // 현재 이미지만 표시합니다.
                width: '300px', // 이미지의 너비를 200px로 설정합니다.
                height: '200px', // 이미지의 높이를 100px로 설정합니다.
                zIndex: index === currentImageIndex ? 1 : 0 // 현재 이미지만 z-index를 높여 화면에 표시합니다.
              }}
            >
              <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: '100%' }} />
            </div>
          ))}
          {/* 이전 슬라이드로 이동하는 버튼 */}
          <button style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} onClick={prevSlide}>Prev</button>
          {/* 다음 슬라이드로 이동하는 버튼 */}
          <button style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }} onClick={nextSlide}>Next</button>
        </div>
    </Main>
  );
};

export default Fastfood;
