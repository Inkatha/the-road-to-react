import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ onClick, className = '', children }) =>
  <button 
    onClick={onClick} 
    className={className} 
    type="button"
    >  
      {children}
  </button>

SubmitButton.PropTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
};

export default SubmitButton;