import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ value, onChange, onKeyDown, placeholder, isDisabled }) => {
  return (
    <input
      className="app-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Input;
