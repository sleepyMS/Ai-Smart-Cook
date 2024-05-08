// Header.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gpt from "../../api/gpt";
import LoadingModal from "../Loadingmodal/Loadingmodal";
import "../../내가만든css/Header.css";
import Aialert1 from '../Aialert/Aialert1';

const Header = () => {
    const navigate = useNavigate();
    const [peopleName, setPeopleName] = useState("로그인");
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isInputEmpty, setIsInputEmpty] = useState(false);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setPeopleName(userData?.user?.nick || "로그인");
        }

        const activityListener = () => {
            localStorage.setItem('lastActivityTime', Date.now());
        };

        const unloadListener = () => {
            logout();
        };

        window.addEventListener('mousemove', activityListener);
        window.addEventListener('keypress', activityListener);
        window.addEventListener('unload', unloadListener);

        return () => {
            window.removeEventListener('mousemove', activityListener);
            window.removeEventListener('keypress', activityListener);
            window.removeEventListener('unload', unloadListener);
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const lastActivityTime = localStorage.getItem('lastActivityTime');
            if (lastActivityTime) {
                const timeDifference = Date.now() - lastActivityTime;
                const logoutTime = 30 * 60 * 1000; // 30분 후에 자동 로그아웃
                if (timeDifference >= logoutTime) {
                    logout();
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const logout = () => {
        setPeopleName("로그인");
        localStorage.removeItem('userData');
    }

    const handleLogout = () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (confirmLogout) {
            logout();
        }
    }

    const onSubmitLogin = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            navigate('/Mypage');
        } else {
            alert("로그인이 되어있지 않습니다.");
            const confirmLogin = window.confirm("로그인 하시겠습니까?");
            if (confirmLogin) {
                navigate('/loginpage');
            }
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) {
            setIsInputEmpty(true);
            return;
        }
        try {
            setIsLoading(true);
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                const confirmLogin = window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?");
                if (confirmLogin) {
                    navigate('/loginpage');
                }
                return;
            }
            const message = await gpt({
                prompt: `${searchInput}`
            });
            navigate('/recipe', { state: { message } });
        } catch (error) {
            console.error("An error occurred:", error);
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
                {peopleName === "로그인" && <button onClick={() => navigate('/registerpage1')}>회원가입 창으로 이동</button>}
                {peopleName !== "로그인" && <button onClick={handleLogout}>로그아웃</button>}
                <button onClick={() => navigate('/recipewrite')}>레시피 등록</button>
                <button onClick={() => navigate('/recipeboard')}>레시피 게시판</button>
                <button onClick={() => navigate('/questionboard')}>Q&A 게시판</button>
                <button onClick={() => navigate('/write')}>Q&A 등록</button>
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
