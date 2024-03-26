//2024-03-26//
import React from 'react';
import "../내가만든css/media.css"
import "../내가만든css/style.css"

const Board = () => {
  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong>공지사항</strong>
        <p>공지사항을 빠르고 정확하게 안내해드립니다</p>
      </div>
      <div className="board_write_wrap">
        <div className="board_write">
            <div className='title'></div>
                <dl>
                    <dt>제목</dt>
                    <dd><input type='text' placeholder='제목 입력'></input></dd>
                    
                </dl>
                <dl>
                    <dt>글쓴이</dt>
                    <dd><input type='text' placeholder='글쓴이 입력'></input></dd>
                </dl>
                <dl>
                    <dt>비밀번호</dt>
                    <dd><input type='password' placeholder='비밀번호 입력'></input></dd>
                </dl>
            <div className='info'></div>
            <div className='cont'></div>
    

        </div>
            <div className="bt_wrap">
                <a href='Write.jsx' className='on'>등록</a>
                <a href='InBord.jsx'>취소</a>
            </div>
        </div>
    </div>

  );
}

export default Board;
