import "./TaskItem.css";
import PropTypes from "prop-types";
import React from "react";
import PriorityDropdown from "./PriorityDropdown";
import iconMinus from "./assets/icon-minus.png";
import iconPlus from "./assets/icon-plus.png";
import iconTrash from "./assets/icon-trash.svg";

const TaskItem = ({ label, total, priority, onChange, onDelete, onPlus, onMinus, onPriorityChange, isDone = false }) => {
  function checkboxChange() {
    onChange(label);
  }
  const labelClass = isDone ? "container-done task-item-button" : "task-item-button";

  function onDeleteTasks() {
    onDelete(label);
  }

  const buttonMinus = (e) => {
    e.preventDefault();

    console.log("minus");
    onMinus(label);
  };

  const buttonPlus = (e) => {
    e.preventDefault();

    console.log("plus");
    onPlus(label);
  };

  const onPriorityDropdownChange = (e) => {
    console.log("onPriorityChange", e.target.value);
    onPriorityChange(label, e.target.value);
  };

  return (
    <li className="round" key={label}>
      <div className="task-item-div-container">
        <label className={"container"}>
          <input type="checkbox" onChange={checkboxChange} checked={isDone} />
          <span className="checkmark"></span>
        </label>

        <div className={labelClass}>
          {label} {isDone === true && `(${total})`}
        </div>
      </div>
      <div className="task-item-div">
        <PriorityDropdown value={priority} onChange={onPriorityDropdownChange} />

        <div className="task-item-button-minus-plus">
          {isDone === false && (
            <div className="task-item-icons-minus-plus">
              {total > 0 && <img src={iconMinus} className="task-item-icon-minus" onClick={buttonMinus} />}
              <div>{total}</div>

              <img src={iconPlus} className="task-item-icon-plus" onClick={buttonPlus} />
            </div>
          )}
        </div>

        <img src={iconTrash} onClick={onDeleteTasks} className="task-item-icon-trash" />
      </div>
    </li>
  );
};

TaskItem.propTypes = {
  label: PropTypes.string,
  total: PropTypes.number,
  priority: PropTypes.number,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onPriorityChange: PropTypes.func,
  onPlus: PropTypes.func,
  onMinus: PropTypes.func,
  isDone: PropTypes.bool,
};

export default TaskItem;
