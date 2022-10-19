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
        {label}

        <input type="checkbox" onChange={checkboxChange} checked={isDone} />
        <span className="checkmark"></span>
        <button onClick={onDeleteTasks}>delete</button>
      </label>
    </li>
  );
}

export default TaskItem;
