// LoadingModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import '../내가만든css/LoadingModal.css';

const Loadingmodal = () => {
  return ReactDOM.createPortal(
    <div className="loading-modal">
      <div className="loading-content">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    </div>,
    document.body
  );
};

export default Loadingmodal;
