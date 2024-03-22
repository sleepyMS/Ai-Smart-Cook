import React, { useRef, useState, useEffect } from 'react'; // useState, useEffect 추가
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import "../내가만든css/loginpage.module.css";

const Loginpage = () => {
    const navigate = useNavigate();
    const IDRef = useRef(null);
    const pwdRef = useRef(null);

    const [peoplesData, setPeoplesData] = useState([]); // 데이터 상태 추가
    const response = useFetch('http://localhost:817/peoples/');

    useEffect(() => {
        if (response) {
            setPeoplesData(response.peoples); // 데이터가 로드되면 상태 업데이트
        }
    }, [response.data]);

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

        const user = peoplesData.find(person => person.ID === IDRef.current.value && person.pwd === pwdRef.current.value); // 데이터에서 사용자 찾기

        if (user) {
            console.log("로그인 성공! 사용자 ID:", user.id);
            navigate('/');
        } else {
            alert("일치하는 사용자를 찾을 수 없습니다. 이메일과 비밀번호를 확인해주세요.");
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
                    <input type="password" placeholder="*********" ref={pwdRef} />
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
