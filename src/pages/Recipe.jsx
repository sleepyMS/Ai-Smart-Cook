import React from 'react'
import Main from '../components/section/Main';
import { useLocation } from 'react-router-dom';


const Recipe = () => {
  const location = useLocation();
  const message = location.state?.message || "";

  return (
    <>
      <Main>
        <div style={{ color: 'white' }}>
          {message}
        </div>
      </Main>
    </>
  )
}

export default Recipe


