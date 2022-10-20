import "./TaskItem.css";

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
    <li className="round">
      <label className={labelClass}>
        <div className="task-item-button">
          {label}
          <input type="checkbox" onChange={checkboxChange} checked={isDone} />
          <span className="checkmark"></span>
          <button onClick={onDeleteTasks}>delete</button>
        </div>
      </label>
    </li>
  );
}

export default TaskItem;
