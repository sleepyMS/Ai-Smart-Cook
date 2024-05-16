import React from 'react';
import ReactDOM from 'react-dom';
import './LoadingModal.css';

const Aialert1 = ({ onCancel }) => {
  return ReactDOM.createPortal(
    <div className="loading-modal">
      <div className="loading-content">
        <p>검색어를 입력해주세요</p>
        <button onClick={onCancel}>취소</button> {/* 취소 버튼 추가 */}
      </div>
    </div>,
    document.body
  );
};

export default Aialert1;
