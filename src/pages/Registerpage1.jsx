import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import style from '../내가만든css/loginpage.module.css';

const Loginpage = () => {

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    };

    const navigate = useNavigate();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    // 번호 유효 검사.
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const formattedPhoneNumber = value.replace(/\D/g, '');
        if (formattedPhoneNumber.length > 11) {
            alert("휴대폰 번호는 11자리 이하여야 합니다. 다시 입력해주세요.");
            e.target.disabled = true;
            setPhoneNumber('');
            setTimeout(() => {
                e.target.disabled = false;
                e.target.focus();
            }, 100); // 
        } else {
            if (formattedPhoneNumber.length >= 4 && formattedPhoneNumber.length < 8) {
                setPhoneNumber(`${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(3)}`);
            } else if (formattedPhoneNumber.length >= 8) {
                setPhoneNumber(`${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(3, 7)}-${formattedPhoneNumber.slice(7)}`);
            } else {
                setPhoneNumber(formattedPhoneNumber);
            }
        }
    };
    const onSubmit = async(e) => {
        e.preventDefault();

        // 유효성 검사 수행
        if (!IDRef.current.value || !nameRef.current.value || !pwdRef.current.value || !phoneNumber) {
            alert("모든 입력칸에 값을 입력해주세요.");
            return;
        }

        // 이메일 형식 검사
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(IDRef.current.value)) {
            alert("올바른 이메일 주소를 입력해주세요.");
            IDRef.current.focus();
            return;
        }

        // 패스워드 유효성 검사
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
        if (!passwordPattern.test(pwdRef.current.value)) {
            alert("패스워드는 영어, 숫자, 특수문자를 포함한 6~20자 이내로 입력해주세요.");
            pwdRef.current.focus();
            return;
        }

        // 유효성 검사 통과시에만 회원가입 요청
        try {
            const emailResponse = await fetch(`http://localhost:817/peoples/?ID=${IDRef.current.value}`);
            const numResponse = await fetch(`http://localhost:817/peoples/?num=${phoneNumber}`);
            const pwdResponse = await fetch(`http://localhost:817/peoples/?pwd=${pwdRef.current.value}`);
    
            const emailData = await emailResponse.json();
            const numData = await numResponse.json();
            const pwdData = await pwdResponse.json();
    
            if (emailData.length > 0 ){
                alert("이미 같은 이메일 정보가 존재합니다. 다시 입력해주세요.");
                return;
            } 
            else if(numData.length > 0){
                alert("이미 같은 휴대폰번호 정보가 존재합니다. 다시 입력해주세요.");
                return;
            }
            else if(pwdData.length > 0){
                alert("이미 같은 비밀번호 정보가 존재합니다. 다시 입력해주세요.");
                return;
            }
            else {
                const res = await fetch(`http://localhost:817/peoples/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ID: IDRef.current.value,
                        name: nameRef.current.value,
                        pwd: pwdRef.current.value,
                        birth: birthDate,
                        num: phoneNumber
                    }),
                });
                if (res.ok) {
                    alert("생성이 완료되었습니다.");
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const IDRef = useRef(null);
    const pwdRef = useRef(null);
    const nameRef = useRef(null);
    const [birthDate, setBirthDate] = useState("2000-01-01");
    const [phoneNumber, setPhoneNumber] = useState('');

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
                <form  style={{ display: 'flex', flexDirection: 'column'}} onSubmit={onSubmit} >
                    <label>이름</label>
                    <input type="text" placeholder="김정호" ref ={nameRef} />
                    <label>Email</label>
                    <input type="email" placeholder="com@example.co.kr" ref ={IDRef} />
                    <label>Password</label>
                    <input type="password" placeholder="*********" ref ={pwdRef}/>
                    <label>생년월일</label>
                    <input type="date" value={birthDate} onChange={handleBirthDateChange}/>
                    <label>휴대폰번호</label>
                    <input type="text" placeholder="010-1234-5678" value={phoneNumber} onChange={handlePhoneNumberChange} />
                    <br />
                    <button>완료</button>
                </form>
            </div>
        </>
    )
}

export default Loginpage;
