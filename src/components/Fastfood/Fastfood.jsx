import React from 'react';
import Main from '../section/Main';
import gpt from "../../api/gpt";
import { useLocation } from 'react-router-dom';

const Fastfood = () => {
  const location = useLocation();
  const message = location.state?.message || "";
    
  return (
    <Main>
      <div className="grid-container">
        <div style={{ color: 'white' }}>
          {message}
        </div>
      </div>
    </Main>
  );
};

export default Fastfood;
