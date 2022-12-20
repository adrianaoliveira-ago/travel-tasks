import React from "react";
import PropTypes from "prop-types";
import "./PriorityDropdown.css";

const PriorityDropdown = ({ value, onChange }) => {
  return (
    <div className="task-item-content-icons-priority">
      <select name="priority" className="priority-dropdown-box" value={value} onChange={onChange}>
        <option value={3}>High 🌡️</option>
        <option value={2}>Medium 👌🏾</option>
        <option value={1}>Low ❄️</option>
      </select>
    </div>
  );
};

PriorityDropdown.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default PriorityDropdown;
