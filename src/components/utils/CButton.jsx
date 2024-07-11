import React from 'react';

const CButton = ({ 
  text,
  clickFn,
  disabled,
  className = "button-primary"
}) => {

  return (
    <>
      <button
        disabled={disabled}
        className={className}
        onClick={clickFn} 
      >
        <span>
          {text}
        </span>
      </button>
    </>
  );
}

export default CButton;