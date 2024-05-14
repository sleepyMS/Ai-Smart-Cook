import React from 'react';
import "../내가만든css/checkbox.css"

const Checkbox = ({children,disabled,checked,onChange}) => {
  return (
    <>
      <label>
        <input 
        type='checkbox' 
        disabled = {disabled}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}/>
        <span>{children}</span>
      </label>
    </>
  );
};

export default Checkbox;
