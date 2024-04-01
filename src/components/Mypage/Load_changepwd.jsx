import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Load_changepwd.css';

const Loadingmodal = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
    onClose(); // 제출 후 모달 닫기
  };

  return ReactDOM.createPortal(
    <div className="loading-modal">
      <div className="loading-content">
        <form onSubmit={handleSubmit}>
          <label>현재 비밀번호</label>
          <input type='password' placeholder='Enter your current password' value={password} onChange={handleChange} />
          <label>변경 비밀번호</label>
          <input type='password' placeholder='Enter your new password' value={password} onChange={handleChange} />
          <label>변경 비밀번호 확인</label>
          <input type='password' placeholder='Confirm your new password' value={password} onChange={handleChange} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Loadingmodal;
