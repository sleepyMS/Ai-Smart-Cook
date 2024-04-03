import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import peoplesData from '../../db/data.json'; 
import './loginpage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "boxicons";

const Loginpage = () => {
    const navigate = useNavigate();
    const IDRef = useRef(null);
    const pwdRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!IDRef.current.value || !pwdRef.current.value) {
            alert("모든 입력칸에 값을 입력해주세요.");
            return;
        }

        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(IDRef.current.value)) {
            alert("올바른 이메일 주소를 입력해주세요.");
            IDRef.current.focus();
            return;
        }

        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        if (!passwordPattern.test(pwdRef.current.value)) {
            alert("패스워드는 영어, 숫자, 특수문자를 포함한 6~20자 이내로 입력해주세요.");
            pwdRef.current.focus();
            return;
        }

        const user = peoplesData.peoples.find(person => person.ID === IDRef.current.value && person.pwd === pwdRef.current.value);

        if (user) {
            alert("로그인 성공!");
            localStorage.setItem('user', JSON.stringify(user)); 
            navigate('/');
        } else {
            alert("이메일 주소 또는 비밀번호가 올바르지 않습니다.");
        }
    }

    return (
        <>
            <div className='wrapper'>
                <div className='login-box'>
                    <form onSubmit={onSubmit}>
                        <h1>
                            <Link to={'/'}>
                                <span>MOTIV</span>
                            </Link>
                        </h1>
                        <div className='input-box'>
                            <input type='text' placeholder='Username' required ref={IDRef}></input>
                            <box-icon type ="solid" name = "user" color="white"></box-icon>
                        </div>
                        <div className='input-box'>
                            <input type='password' placeholder='Password' required ref ={pwdRef}></input>
                            <box-icon type ="solid" name = "lock-alt" color="white"></box-icon>
                        </div>
                        <div className="remember-forgod">
                            <label>
                            <input type="checkbox" /> 아이디 기억하기
                            </label>
                            <a href="#"> 비밀번호 찾기</a>
                        </div>

                        <button type="submit" className="btn">
                            Login
                        </button>

                        <div className="register-link">
                            <p>
                            계정이 없으신가요? <Link to={"/registerpage1"}>회원가입</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Loginpage;
