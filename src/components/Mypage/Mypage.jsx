import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Mypage.css"; // CSS 파일 추가
import LoadingModal from "./Load_changepwd"; // LoadingModal 추가
import Load_changednick from "./Load_changednick"; // LoadingModal 추가
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const [userData, setUserData] = useState(null); // 초기값을 null로 설정
  const [posts, setPosts] = useState([]);
  const [qnas, setQnas] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 나타내는 상태
  const [isNickLoading, setIsNickLoading] = useState(false); // 로딩 상태를 나타내는 상태
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지를 나타내는 상태

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 사용자 데이터 가져오기
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }

    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/recipe/get", {
          from: 0,
          to: 10e5,
        });
        const userData = JSON.parse(storedUserData);
        const filteredPosts = response.data.data.filter(
          (post) => post.email === userData.user.email
        );
        setPosts(filteredPosts);
        const responseQna = await axios.post("http://localhost:8080/qna/get", {
          from: 0,
          to: 10e5,
        });
        const filteredQnas = responseQna.data.data.filter(
          (qna) => qna.email === userData.user.email
        );
        setQnas(filteredQnas);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (storedUserData) {
      fetchData(); // fetchData 함수 호출
    }
  }, []);

  if (!userData) {
    return null;
  }

  // 이메일 가리기
  const hideEmail = (email) => {
    const atIndex = email.indexOf("@");
    const firstChar = email.charAt(0);
    const lastChar = email.charAt(atIndex + 1);
    return `${firstChar}****@${lastChar}****`;
  };

  //비밀번호 가리기
  const hidePassword = (password) => {
    if (!password) return ""; // 비밀번호가 없는 경우 빈 문자열 반환
    const firstChar = password.charAt(0);
    const hiddenPart = "*".repeat(Math.max(password.length - 1, 0)); // 비밀번호 길이가 음수가 되지 않도록 수정
    return `${firstChar}${hiddenPart}`;
  };

  // 전화번호 가리기
  const hidePhoneNumber = (phoneNumber) => {
    const firstPart = phoneNumber.substring(0, 5);
    const secondPart = phoneNumber.substring(8, 10);
    return `${firstPart}***-${secondPart}***`;
  };

  // 이미지 변경
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    try {
      // const res = await fetch(`http://localhost:817/peoples/`, {
      //         method: 'PUT',
      //         headers: {
      //             'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //             ID: user.ID,
      //             name: user.name,
      //             pwd: user.pwd,
      //             birth: user.birth,
      //             phone: user.phone,
      //             nick: user.nick,
      //             img: profileImage
      //         }),
      //     });
      //     if (res.ok) {
      //         alert("생성이 완료되었습니다.");
      //     }
    } catch {}
  };

  // 비밀번호 변경 클릭 시
  const handlePasswordChange = () => {
    setIsLoading(true);
  };

  // LoadingModal 닫기 함수
  const handleCloseModal1 = () => {
    setIsLoading(false); // 로딩 상태를 false로 변경하여 모달을 닫음
  };

  const handleNickChange = () => {
    setIsNickLoading(true);
  };

  const handleCloseModal2 = () => {
    setIsNickLoading(false); // 로딩 상태를 false로 변경하여 모달을 닫음
  };

  const delRecipe = async (num) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const response = await axios.post(
          `http://localhost:8080/recipe/delete`,
          num,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setPosts((prevPosts) => prevPosts.filter((post) => post.num !== num));
        setQnas((prevQnas) => prevQnas.filter((qna) => qna.num !== num));
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="mypage-container">
      <h1 className="header_logo">
        <Link to="/">MOTIV</Link>
      </h1>
      <div className="user-info">
        <div className="info-label">
          프로필: {userData.user && userData.user.name}
        </div>
        {/* 프로필 이미지 출력 */}
        {profileImage && (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="profile-image"
          />
        )}
        {/* 파일 선택(input type="file") 추가 */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="info-label">이름: {userData.user.name}</div>
        <div className="info-label">
          이메일: {hideEmail(userData.user.email)}
        </div>
        <div className="info-label">닉네임: {userData.user.nick}</div>
        <Link className="change-password-link" onClick={handleNickChange}>
          <div className="change-password">닉네임 변경</div>
        </Link>
        <div className="info-label">
          비밀번호: {hidePassword(userData.user.password)}
        </div>
        <Link className="change-password-link" onClick={handlePasswordChange}>
          <div className="change-password">비밀번호 변경</div>
        </Link>
        <div className="hidden-info">{userData.user.password}</div>
        <div className="info-label">
          전화번호: {hidePhoneNumber(userData.user.phone)}
        </div>
        <div className="hidden-info">{userData.user.phone}</div>
      </div>
      <div className="user-posts">
        <h2>나의 레시피</h2>
        {posts.map((board) => (
          <div key={board.num} className="post">
            <Link to={`/recipeinboard/${board.num}`} className="post-link">
              <h3 className="post-title">제목: {board.title}</h3>
            </Link>
            <button onClick={() => delRecipe(board.num)}>삭제</button>
            <Link to={`/recipewrite/${board.num}`}>
              <button>변경</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="user-posts">
        <h2>나의 Q&A</h2>
        {qnas.map((board) => (
          <div key={board.num} className="post">
            <Link to={`/inboard/${board.num}`} className="post-link">
              <h3 className="post-title">제목: {board.title}</h3>
            </Link>
            <Link to={`/write/${board.num}`}>
              <button>변경</button>
            </Link>
          </div>
        ))}
      </div>
      {isLoading && <LoadingModal onClose={handleCloseModal1} />}{" "}
      {/* isLoading이 true일 때 LoadingModal을 렌더링 */}
      {isNickLoading && <Load_changednick onClose={handleCloseModal2} />}{" "}
      {/* isNickLoading이 true일 때 Load_changednick을 렌더링 */}
    </div>
  );
};

export default Mypage;
