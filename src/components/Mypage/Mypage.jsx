import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css'; // CSS 파일 추가
import LoadingModal from './Load_changepwd'; // LoadingModal 추가

const Mypage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 나타내는 상태

    // 이메일 가리기
    const hideEmail = (email) => {
        const atIndex = email.indexOf('@');
        const firstChar = email.charAt(0);
        const lastChar = email.charAt(atIndex + 1);
        return `${firstChar}****@${lastChar}****`;
    };

    // 비밀번호 가리기
    const hidePassword = (password) => {
        const firstChar = password.charAt(0);
        const hiddenPart = '*'.repeat(password.length - 1);
        return `${firstChar}${hiddenPart}`;
    };

    // 전화번호 가리기
    const hidePhoneNumber = (phoneNumber) => {
        const firstPart = phoneNumber.substring(0, 5);
        const secondPart = phoneNumber.substring(8, 10);
        return `${firstPart}***-${secondPart}***`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:817/boards?name=${user.name}`);
                const data = await response.json();
                setPosts(data);

                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다');
                }
            } catch (error) {
                console.error('데이터를 불러오는 중 오류 발생:', error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [user.name]);

    // 비밀번호 변경 클릭 시
    const handlePasswordChange = () => {
        setIsLoading(true); 
    };

    // LoadingModal 닫기 함수
    const handleCloseModal = () => {
        setIsLoading(false); // 로딩 상태를 false로 변경하여 모달을 닫음
    };

    return (
        <div className='mypage-container'>
            <h1 className='header_logo'>
                <Link to='/'>MOTIV</Link>
            </h1>
            <div className='user-info'>
                <div className='info-label'>이름: {user.name}</div>
                <div className='info-label'>이메일: {hideEmail(user.ID)}</div>
                <div className='info-label'>닉네임: {user.nick}</div>
                <div className='info-label'>비밀번호: {hidePassword(user.pwd)}</div>
                <Link className='change-password-link' onClick={handlePasswordChange}>
                    <div className='change-password'>비밀번호 변경</div>
                </Link>
                <div className='hidden-info'>{user.pwd}</div>
                <div className='info-label'>전화번호: {hidePhoneNumber(user.phone)}</div>
                <div className='hidden-info'>{user.phone}</div>
            </div>
            <div className='user-posts'>
                {posts.map(board =>
                    <div key={board.id} className='post'>
                        <Link to={`/inboard/${board.id}`} className='post-link'>
                            <h3 className='post-title'>제목: {board.titleBoard}</h3>
                        </Link>
                    </div>
                )}
            </div>
            {isLoading && <LoadingModal onClose={handleCloseModal} />} {/* isLoading이 true일 때 LoadingModal을 렌더링 */}
        </div>
    );
}

export default Mypage;
