import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Load_changepwd.css';

const Loadingmodal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [peoples, setPeoples] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChangeCurrent = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNew = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirm = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = peoples.find(person => person.ID === user.ID);

    if (!currentUser) {
      setError('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    if (currentPassword !== currentUser.pwd) {
      setError('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새로운 비밀번호가 일치하지 않습니다.');
      return;
    }

    changePassword(currentUser, newPassword);
    onClose(); // 제출 후 모달 닫기
  };

  const handleClose = () => {
    onClose(); // 모달 닫기
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:817/peoples'); // data.json 경로를 수정해주세요.
        const data = await response.json();
        setPeoples(data);

        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []);

  const changePassword = (currentUser, newPassword) => {
    const updatedPeoples = peoples.map(person => {
      if (person.ID === currentUser.ID) {
        return { ...person, pwd: newPassword };
      }
      return person;
    });

    // 변경된 비밀번호를 적용한 후 로컬 스토리지에 저장 또는 서버에 전송할 수 있습니다.
    console.log('비밀번호가 성공적으로 변경되었습니다.');
    console.log('변경된 사용자 정보:', updatedPeoples);
  };

  return ReactDOM.createPortal(
    <div className="loading-modal">
      <div className="loading-content">
        <form onSubmit={handleSubmit}>
          <label>현재 비밀번호</label>
          <div>
            <input type='password' placeholder='Enter your current password' value={currentPassword} onChange={handleChangeCurrent} />
          </div>
          <label>새로운 비밀번호</label>
          <div>
            <input type='password' placeholder='Enter your new password' value={newPassword} onChange={handleChangeNew} />
          </div>
          <label>새로운 비밀번호 확인</label>
          <div>
            <input type='password' placeholder='Confirm your new password' value={confirmPassword} onChange={handleChangeConfirm} />
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

export default Loadingmodal;
