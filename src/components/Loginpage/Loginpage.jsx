import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import peoplesData from '../../db/data.json'; 
import './loginpage.module.css';
import { useState } from 'react';

const Loginpage = () => {
    const navigate = useNavigate();
    const IDRef = useRef(null);
    const pwdRef = useRef(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSubmitRegister = () => {
        navigate('/registerpage1');
    }

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
            <h1 className='header_logo'>
                <a href="/">
                    <span>MOTIV</span>
                </a>
            </h1>
            <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                width: '100%', height: '100vh'
                }}>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmit}>
                    <label>Email</label>
                    <input type="text" placeholder="com@example.co.kr" ref={IDRef} />
                    <label>Password</label>
                    <input 
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="*********" 
                        ref ={pwdRef}
                        onClick={(e) => e.stopPropagation()}
                        onBlur={() => pwdRef.current.type = "password"}
                        required
                    />
                    <br />
                    <button type="submit">로그인</button>
                </form>
                <div>
                    <button onClick={onSubmitRegister}>회원가입 하러가기</button>
                </div>
            </div>
        </>
    )
}

export default Loginpage;
