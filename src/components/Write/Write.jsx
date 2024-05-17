import React from "react";
import "../../내가만든css/media.css";
import "../../내가만든css/style.css";
import style from "./loginpage.module.css";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const Write = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const postRef = useRef(null);
  const passRef = useRef(null);
  const [peopleName, setPeopleName] = useState("로그인");

  // 아이디 이름으로 바꾸기
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setPeopleName(user.user.nick);
    }
  }, []);

  //로그인/로그아웃 기능
  const handleLogout = () => {
    if (!localStorage.getItem("userData")) {
      alert("로그인이 되어있지않습니다.");
      const confirmLogin = window.confirm("로그인 하시겠습니까?");
      if (confirmLogin) {
        navigate("/loginpage");
      }
    } else {
      const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
      if (confirmLogout) {
        setPeopleName("로그인"); // 이름 초기화
        localStorage.removeItem("userData"); // 로컬 스토리지에서 사용자 정보 삭제
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ID = JSON.parse(localStorage.getItem("userData"));

    if (!localStorage.getItem("userData")) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!titleRef.current.value || !postRef.current.value) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await axios
        .post(`http://localhost:8080/qna/insert`, {
          email: ID.user.email,
          title: titleRef.current.value,
          pass: passRef.current.value,
          que: postRef.current.value,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.result === true) {
            const recipeUser = response.data.data;
            console.log("Logged in user data:", recipeUser);
            alert("생성이 완료되었습니다.");
            navigate("/questionboard");
          } else {
            alert(response.data.message); // 서버로부터 받은 메시지 표시
          }
        })
        .catch((error) => {
          console.log(error);
          alert("로그인에 실패했습니다. 다시 시도해주세요."); // 기타 오류 발생 시의 메시지
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="header_logo">
        <a href="/">
          <span>MOTIV</span>
        </a>
        <button onClick={handleLogout}>{peopleName}</button>
      </h1>
      <div>
        <form onSubmit={onSubmit}>
          <h3>게시판 글 등록</h3>
          <div className="board_write">
            <div className="title">
              <label>제목</label>
              <input type="text" placeholder="제목" ref={titleRef} />
            </div>
            <div className="title">
              <label>비밀번호</label>
              <input type="text" placeholder="비밀번호" ref={passRef} />
            </div>
            <div className="info">글쓴이</div>
            <div className="cont">
              <label>글 내용</label>
              <textarea placeholder="내용입력" ref={postRef}></textarea>
            </div>
            <button>등록하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Write;
