//2024-03-26 추가//
import React from 'react';
import "../내가만든css/media.css"
import "../내가만든css/style.css"

const Inboard = () => {
  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong>공지사항</strong>
        <p>공지사항을 빠르고 정확하게 안내해드립니다</p>
      </div>
      <div className="board_view_wrap">
        <div className="board_view">
        <div className='title'>

        </div>
        <div className="info">
            <dl>
                <dt>번호</dt>
                <dd>1</dd>
            </dl>
            <dl>
                <dt>글쓴이</dt>
                <dd>박용선</dd>
            </dl>
            <dl>
                <dt>작성일</dt>
                <dd>2024.03.26</dd>
            </dl>
            <dl>
                <dt>조회</dt>
                <dd>99999</dd>
            </dl>
            
        </div>

        <div className='cont'>
            <br>글 내용이 들어갑니다</br>
            <br>글 내용이 들어갑니다</br>
            <br>글 내용이 들어갑니다</br>
            <br>글 내용이 들어갑니다</br>
            <br>글 내용이 들어갑니다</br>
            <br>글 내용이 들어갑니다</br>
            <br>글 내용이 들어갑니다</br>
            글 내용이 들어갑니다

        </div>
        </div>
        <div className="bt_wrap">
          <a href="#" className="on">목록</a>
          <a href="#">수정</a>
        </div>
      </div>
    </div>
  );
}

export default Inboard;