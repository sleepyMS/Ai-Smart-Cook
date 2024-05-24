import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Write.css";

const Write = () => {
  const navigate = useNavigate();
  const { num } = useParams();
  const titleRef = useRef(null);
  const postRef = useRef(null);
  const passRef = useRef(null);
  const [peopleName, setPeopleName] = useState("로그인");
  const [newQna, setNewQna] = useState([]);

  // 아이디 이름으로 바꾸기
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setPeopleName(user.user.nick);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/qna/getByNum`,
          { num },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.data;
        setNewQna(data);
        if (titleRef.current) titleRef.current.value = data.title;
        if (passRef.current) passRef.current.value = data.pass;
        if (postRef.current) postRef.current.value = data.que;
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (num) {
      fetchData(); // fetchData 함수 호출
    }
  }, [num]);

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

    if (!ID) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!titleRef.current.value || !postRef.current.value) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const postData = {
        email: ID.user.email,
        title: titleRef.current.value,
        pass: passRef.current.value,
        que: postRef.current.value,
      };

      if (num) {
        postData.num = num;
        postData.time = newQna.time;
        await axios.post(`http://localhost:8080/qna/alterIn`, postData);
        alert("변경이 완료되었습니다.");
      } else {
        const response = await axios.post(
          `http://localhost:8080/qna/insert`,
          postData
        );
        if (response.data.result === true) {
          alert("생성이 완료되었습니다.");
          navigate("/questionboard");
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="qna">
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
            <div className="info">글쓴이: {peopleName}</div>
            <div className="cont">
              <label>글 내용</label>
              <textarea placeholder="내용입력" ref={postRef}></textarea>
            </div>
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
