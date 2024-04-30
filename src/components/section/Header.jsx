// Header.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gpt from "../../api/gpt"
import LoadingModal from "../Loadingmodal/Loadingmodal";
import "../../내가만든css/Header.css";
import Aialert1 from '../Aialert/Aialert1';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const [peopleName, setPeopleName] = useState("로그인");
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [userData, setUserData] = useState(null); // 로컬 스토리지에서 사용자 데이터 상태

    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지에서 사용자 데이터 가져오기
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserData(userData);
            if (userData.user.nick) {
                setPeopleName(userData.user.nick); // 사용자의 이름이 있을 경우 설정
            } else {
                setPeopleName("로그인"); // 사용자의 이름이 없을 경우 기본값으로 설정
            }
        }

        // 사용자가 마지막으로 활동한 시간을 저장
        const lastActivityTime = new Date().getTime();
        localStorage.setItem('lastActivityTime', lastActivityTime);

        // 활동 감지 이벤트 리스너 설정
        const activityListener = () => {
            const lastActivityTime = new Date().getTime();
            localStorage.setItem('lastActivityTime', lastActivityTime);
        };
        window.addEventListener('mousemove', activityListener);
        window.addEventListener('keypress', activityListener);

        // 페이지가 언마운트 될 때 리스너 제거
        return () => {
            window.removeEventListener('mousemove', activityListener);
            window.removeEventListener('keypress', activityListener);
        }
    }, []);

    // 자동 로그아웃 타이머 설정
    useEffect(() => {
        const timer = setInterval(() => {
            const lastActivityTime = localStorage.getItem('lastActivityTime');
            if (lastActivityTime) {
                const currentTime = new Date().getTime();
                const timeDifference = currentTime - lastActivityTime;
                const logoutTime = 30 * 60 * 1000; // 30분 후에 자동 로그아웃
                if (timeDifference >= logoutTime) {
                    setPeopleName("로그인");
                    setUserData(null);
                    localStorage.removeItem('userData');
                }
            }
        }, 1000);

        // 컴포넌트가 언마운트 될 때 타이머 정리
        return () => clearInterval(timer);
    }, []);
    
    const handleLogout = () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (confirmLogout) {
            setPeopleName("로그인");
            setUserData(null);
            localStorage.removeItem('userData');
        }
    }

    const onSubmitLogin = () => {
        if (userData) {
            navigate('/Mypage');
        } else {
            alert("로그인이 되어있지않습니다.");
            const confirmLogin = window.confirm("로그인 하시겠습니까?");
            if (confirmLogin) {
                navigate('/loginpage');
            }
        }
    }

    const onSubmitRegister = () => {
        navigate('/registerpage1');
    }

    const onSubmitRecipeboard = () => {
        navigate('/recipeboard');
    }

    const onSubmitRecipewrite = () => {
        navigate('/recipewrite');
    }

    const onSubmitQuestion = () => {
        navigate('/questionboard');
    }

    const onSubmitWrite = () => {
        navigate('/write');
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) {
            setIsInputEmpty(true);
            return;
        }
        try {
            setIsLoading(true);
            const message = await gpt({
                prompt: `${searchInput}`
            });
            navigate('/recipe', { state: { message } });
        } catch (error) {
            // 오류 처리
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        setIsInputEmpty(false);
    }

    const handleCancel = () => {
        setIsInputEmpty(false);
    }

    return (
        <header id='header' role='banner'>
            <h1 className='header_logo'>
                <span>MOTIV</span>
            </h1>
            <div className="buttonMagin">
                <button onClick={onSubmitLogin}>{peopleName}</button>
                {peopleName === "로그인" && <button onClick={onSubmitRegister}>회원가입 창으로 이동</button>}
                {peopleName !== "로그인" && <button onClick={handleLogout}>로그아웃</button>}
                <button onClick={onSubmitRecipewrite}>레시피 등록</button>
                <button onClick={onSubmitRecipeboard}>레시피 게시판</button>
                <button onClick={onSubmitQuestion}>Q&A 게시판</button>
                <button onClick={onSubmitWrite}>Q&A 등록</button>
                <form onSubmit={onSubmit}>
                    <input type='text' placeholder='재료 -> 음식 or 음식 -> 재료를 검색하시오.' value={searchInput} onChange={handleChange}></input>
                    <button type="submit">검색</button>
                </form>
            </div>
            {isInputEmpty && <Aialert1 onCancel={handleCancel} />}
            {isLoading && <LoadingModal />}
        </header>
    );
}

export default Header;

