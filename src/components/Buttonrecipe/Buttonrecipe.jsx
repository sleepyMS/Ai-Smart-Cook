import React from 'react'
import Main from '../section/Main';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Buttonrecipe = () => {
    const location = useLocation();
    const message = location.state?.message || "";
    const data = JSON.parse(message);
    const titles = [data.title[0],data.title[1],data.title[2],data.title[3],data.title[4]];

    // 현재 이미지 인덱스를 상태로 관리합니다.
    const [currentData, setCurrentData] = useState(0);

    // 다음 이미지로 이동하는 함수
    const nextSlide = () => {
      setCurrentData((prevIndex) => (prevIndex === titles.length - 1 ? 0 : prevIndex + 1));
    };

    // 이전 이미지로 이동하는 함수
    const prevSlide = () => {
      setCurrentData((prevIndex) => (prevIndex === 0 ? titles.length - 1 : prevIndex - 1));
    };

  return (
    <Main>
        <div style={{ color: 'white' }}>
          {data.title[0]}
        </div>
        <div style={{ width: '400px', height: '400px', position: 'relative', overflow: 'hidden' }}>
          {/* 이미지 목록을 순회하며 현재 인덱스에 맞게 이미지를 보여줍니다. */}
          {titles.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '50%', // 이미지를 가운데로 이동시킵니다.
                top: '50%', // 이미지를 가운데로 이동시킵니다.
                transform: 'translate(-50%, -50%)', // 이미지를 가운데로 정렬합니다.
                transition: 'opacity 0.5s ease-in-out',
                opacity: index === currentData ? 1 : 0, // 현재 이미지만 표시합니다.
                width: '300px', // 이미지의 너비를 200px로 설정합니다.
                height: '200px', // 이미지의 높이를 100px로 설정합니다.
                zIndex: index === currentData ? 1 : 0 // 현재 이미지만 z-index를 높여 화면에 표시합니다.
              }}
            >
              {image}
            </div>
          ))}
          {/* 이전 슬라이드로 이동하는 버튼 */}
          <button style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }} onClick={prevSlide}>Prev</button>
          {/* 다음 슬라이드로 이동하는 버튼 */}
          <button style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }} onClick={nextSlide}>Next</button>
        </div>
      </Main>
  )
}

export default Buttonrecipe
