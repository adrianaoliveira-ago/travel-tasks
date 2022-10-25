import "./TaskItem.css";
import iconTrash from "./assets/icon-trash.svg";

function TaskItem({ label, onChange, onDelete, isDone }) {
  function checkboxChange() {
    // console.log("checkboxChage");
    onChange(label);
  }
  const labelClass = isDone ? "container-done container" : "container";

  function onDeleteTasks() {
    onDelete(label);
  }

  return (
    <li className="round" key={label}>
      <label className={labelClass}>
        <div className="task-item-button">
          {label}
          <div>
            <input type="checkbox" onChange={checkboxChange} checked={isDone} />
            <span className="checkmark"></span>
          </div>
          <img
            src={iconTrash}
            onClick={onDeleteTasks}
            className="task-item-icon-trash"
          />
          {/* <button onClick={onDeleteTasks}>delete</button> */}
        </div>
      </label>
    </li>
  );
}

export default TaskItem;
