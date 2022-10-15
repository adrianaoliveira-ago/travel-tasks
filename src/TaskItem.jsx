import "./TaskItem.css";

function TaskItem({ label }) {
  return (
    <li className="round">
      {/* {label} */}
      <label className="container">
        {label}
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </li>
  );
}

export default TaskItem;
