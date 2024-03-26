//2024-03-26 추가
import React from 'react';
import { useHistory } from 'react-router-dom'; // useHistory import 추가
import "../내가만든css/media.css";
import "../내가만든css/style.css";
import { useNavigate } from 'react-router-dom';


const Board = () => {
  const navigate = useNavigate(); 
  function onSubmitRegister() {
    navigate('/inboard'); 
  }

  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong>MOTIV</strong>
        <div className="UploadButton">
        <a href="#" className="on">등록</a>
          <a href="#">수정</a>
      </div>
      <div className="board_list_wrap">
        <div className="board_list">
          {/* 각 게시글 항목 */}
          <div className="top">
            <div className='num'>번호</div>
            <div className='title'>제목</div>
            <div className='writer'>글쓴이</div> {/* 닫는 태그가 누락됨 */}
            <div className='date'>작성일</div>
            <div className='count'>조회</div>
          </div>
          
          {/* 실제 게시글 데이터 */}
          <div>
            <div className='num'>5</div>
            <div className='title' onClick={onSubmitRegister}>글 제목</div>
            <div className='writer'>아무개</div>
            <div className='date'>작성일</div>
            <div className='count'>조회</div>
          </div>
          <div>
            <div className='num'>4</div>
            <div className='title'><a href='InBord.jsx'>글 제목</a></div>
            <div className='writer'>아무개</div>
            <div className='date'>작성일</div>
            <div className='count'>조회</div>
          </div>
          <div>
            <div className='num'>3</div>
            <div className='title'><a href='InBord.jsx'>글 제목</a></div>
            <div className='writer'>아무개</div>
            <div className='date'>작성일</div>
            <div className='count'>조회</div>
          </div>
          <div>
            <div className='num'>2</div>
            <div className='title'><a href='InBord.jsx'>글 제목</a></div>
            <div className='writer'>아무개</div>
            <div className='date'>작성일</div>
            <div className='count'>조회</div>
          </div>
          <div>
            <div className='num'>1</div>
            <div className='title'><a href='InBord.jsx'>글 제목</a></div>
            <div className='writer'>아무개</div>
            <div className='date'>작성일</div>
            <div className='count'>조회</div>
          </div>
        </div>
        <div className="board_page">
          <a href="#" className="bt first">{"<<"}</a>
          <a href="#" className="bt prev">{"<"}</a>
          <a href="#" className="num on">1</a>
          <a href="#" className="num">2</a>
          <a href="#" className="num">3</a>
          <a href="#" className="num">4</a>
          <a href="#" className="num">5</a>
          <a href="#" className="bt next">{'>'}</a>
          <a href="#" className="bt last">'{'>>'}</a>
        </div>
        
          
        </div>
      </div>
    </div>
  );
}

export default Board;