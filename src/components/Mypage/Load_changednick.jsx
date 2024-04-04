import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Load_changepwd.css';
import { useNavigate } from 'react-router-dom';

const Load_changednick = ({ onClose }) => {
  const [currentNick, setCurrentNick] = useState('');
  const [newNick, setNewNick] = useState('');
  const [confirmNick, setConfirmNick] = useState('');
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigator = useNavigate();

  const handleChangeCurrent = (e) => {
    setCurrentNick(e.target.value);
  };

  const handleChangeNew = (e) => {
    setNewNick(e.target.value);
  };

  const handleChangeConfirm = (e) => {
    setConfirmNick(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:817/peoples/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            ID: user.ID,
            name: user.name,
            pwd: user.pwd ,
            birth: user.birth,
            phone: user.phone,
            nick: newNick
        })
      });
        
      if (!response.ok) {
        throw new Error('비밀번호 변경에 실패했습니다.');
      }

      alert('비밀번호가 성공적으로 변경되었습니다.');
      localStorage.removeItem('user');
      navigator('/');
      onClose(); // 패스워드 변경 후 모달 닫기
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
      setError('비밀번호 변경에 실패했습니다.');
    }
  };

  const handleClose = () => {
    onClose(); // 모달 닫기
  };

  return ReactDOM.createPortal(
    <div className="loading-modal">
      <div className="loading-content">
        <form onSubmit={handleSubmit}>
          <label>현재 닉네임</label>
          <div>
            <input type='text' placeholder='Enter your nick' value={currentNick} onChange={handleChangeCurrent} />
          </div>
          <label>새로운 비밀번호</label>
          <div>
            <input type='text' placeholder='Enter your new nick' value={newNick} onChange={handleChangeNew} />
          </div>
          <label>새로운 비밀번호 확인</label>
          <div>
            <input type='text' placeholder='Confirm your new nick' value={confirmNick} onChange={handleChangeConfirm} />
          </div>
          {error && <div className="error">{error}</div>}
          <button type='submit'>확인</button>
          <button type='button' onClick={handleClose}>닫기</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Load_changednick;
