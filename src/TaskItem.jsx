import { useState } from "react";
import "./TaskItem.css";
import iconTrash from "./assets/icon-trash.svg";
import iconMinus from "./assets/icon-minus.png";
import iconPlus from "./assets/icon-plus.png";

function TaskItem({ label, total, onChange, onDelete, isDone }) {
  function checkboxChange() {
    onChange(label);
  }
  const labelClass = isDone ? "container-done container" : "container";

  function onDeleteTasks() {
    onDelete(label);
  }

  // const [addMinus, setAddMinus] = useState(0);

  const buttonMinus = (e) => {
    e.preventDefault();
    // let newCount = addMinus === 1;

    // if (newCount > 1) {
    //   newCount < 1;
    // }
    // setAddMinus(newCount);

    console.log("minus");
  };

  const buttonPlus = (e) => {
    e.preventDefault();

    console.log("plus");
  };

  return (
    <li className="round" key={label}>
      <label className={labelClass}>
        <div className="task-item-button">
          {label}
          <div>
            <input type="checkbox" onChange={checkboxChange} checked={isDone} />
            <span className="checkmark"></span>
          </div>
          <div className="task-item-button-minus-plus">
            <div className="task-item-icons-minus-plus">
              <img
                src={iconMinus}
                className="task-item-icon-minus"
                onClick={buttonMinus}
              />
              {total}
              <img
                src={iconPlus}
                className="task-item-icon-plus"
                onClick={buttonPlus}
              />
              {/* - total + */}
            </div>
            <img
              src={iconTrash}
              onClick={onDeleteTasks}
              className="task-item-icon-trash"
            />
            {/* <button onClick={onDeleteTasks}>delete</button> */}
          </div>
        </div>
      </label>
    </li>
  );
}

export default TaskItem;
