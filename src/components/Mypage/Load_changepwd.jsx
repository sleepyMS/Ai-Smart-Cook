import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Load_changepwd.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Loadingmodal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const handleChangeCurrent = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNew = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirm = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const passwordPattern =
    //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    // if (!passwordPattern.test(newPassword)) {
    //   alert(
    //     "패스워드는 영어, 숫자, 특수문자를 포함한 6~20자 이내로 입력해주세요."
    //   );
    //   return;
    // }
    if (currentPassword === newPassword) {
      alert("현재 사용 중인 비밀번호입니다.");
      return;
    }
    try {
      const ID = JSON.parse(localStorage.getItem("userData"));
      await axios
        .post(`http://localhost:8080/user/auth/alterIn`, {
          email: ID.user.email,
          password: ID.user.password,
          newPassword: newPassword,
          confirmNewPassword: confirmPassword,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          alert("로그인에 실패했습니다. 다시 시도해주세요."); // 기타 오류 발생 시의 메시지
        });
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      setError("비밀번호 변경에 실패했습니다.");
    }
  };

  const handleClose = () => {
    onClose(); // 모달 닫기
  };

  return ReactDOM.createPortal(
    <div className="loading-modal">
      <div className="loading-content">
        <form onSubmit={handleSubmit}>
          <label>현재 비밀번호</label>
          <div>
            <input
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={handleChangeCurrent}
            />
          </div>
          <label>새로운 비밀번호</label>
          <div>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={handleChangeNew}
            />
          </div>
          <label>새로운 비밀번호 확인</label>
          <div>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleChangeConfirm}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">확인</button>
          <button type="button" onClick={handleClose}>
            닫기
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Loadingmodal;
