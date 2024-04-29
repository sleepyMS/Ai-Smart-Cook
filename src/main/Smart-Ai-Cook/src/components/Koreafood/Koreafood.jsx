import React from 'react';
import Main from '../section/Main';
import './koreafood.css'; // CSS 파일을 import하여 스타일링
import { useNavigate } from 'react-router-dom';

const Koreafood = () => {
    const navigate = useNavigate(); 

    function onSubmitKoreafood() {
        navigate('/koreafood'); 
    }
    
  return (
    <Main>
      <div className="grid-container">
        ??
      </div>
    </Main>
  );
};

export default Koreafood;
