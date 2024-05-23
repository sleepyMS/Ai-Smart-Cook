import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Registerpage.css";
import axios from "axios";

const Registerpage1 = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const IDRef = useRef(null);
  const pwdRef = useRef(null);
  const pwdCheckRef = useRef(null);
  const nameRef = useRef(null);
  const nickRef = useRef(null);

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };
  //폰 번호 유효성 검사
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const formattedPhoneNumber = value.replace(/\D/g, "");
    if (formattedPhoneNumber.length > 11) {
      alert("휴대폰 번호는 11자리 이하여야 합니다. 다시 입력해주세요.");
      e.target.disabled = true;
      setTimeout(() => {
        e.target.disabled = false;
        e.target.focus();
      }, 100); //
    } else {
      if (formattedPhoneNumber.length >= 4 && formattedPhoneNumber.length < 8) {
        setPhoneNumber(
          `${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(3)}`
        );
      } else if (formattedPhoneNumber.length >= 8) {
        setPhoneNumber(
          `${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(
            3,
            7
          )}-${formattedPhoneNumber.slice(7)}`
        );
      } else {
        setPhoneNumber(formattedPhoneNumber);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 이메일 형식 검사
    // const emailPattern = /\S+@\S+\.\S+/;
    // if (!emailPattern.test(IDRef.current.value)) {
    //     alert("올바른 이메일 주소를 입력해주세요.");
    //     IDRef.current.focus();
    //     return;
    // }

    // 패스워드 유효성 검사
    // const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    // if (!passwordPattern.test(pwdRef.current.value)) {
    //     alert("패스워드는 영어, 숫자, 특수문자를 포함한 6~20자 이내로 입력해주세요.");
    //     pwdRef.current.focus();
    //     return;
    // }

    // 유효성 검사 통과시에만 회원가입 요청
    try {
      await axios
        .post("http://localhost:8080/user/auth/signUp", {
          email: IDRef.current.value,
          name: nameRef.current.value,
          password: pwdRef.current.value,
          confirmPassword: pwdCheckRef.current.value,
          birth: birthDate,
          phone: phoneNumber,
          nick: nickRef.current.value,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="header_logo">
        <a href="/">
          <span>MOTIV</span>
        </a>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmit}
        >
          <label>이름</label>
          <input type="text" placeholder="김정호" ref={nameRef} required />
          <label>별명</label>
          <input type="text" placeholder="별명" ref={nickRef} required />
          <label>아이디</label>
          <input
            type="email"
            placeholder="com@example.co.kr"
            ref={IDRef}
            required
          />
          <label>비밀번호</label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="*********"
            ref={pwdRef}
            onClick={(e) => e.stopPropagation()}
            onBlur={() => (pwdRef.current.type = "password")}
            required
          />
          <label>비밀번호 확인</label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="*********"
            ref={pwdCheckRef}
            onClick={(e) => e.stopPropagation()}
            onBlur={() => (pwdCheckRef.current.type = "password")}
            required
          />
          <label>생년월일</label>
          <input
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
          <label>휴대폰번호</label>
          <input
            type="text"
            placeholder="010-1234-5678"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
          <br />
          <button>완료</button>
        </form>
      </div>
    </>
  );
};

export default Registerpage1;
