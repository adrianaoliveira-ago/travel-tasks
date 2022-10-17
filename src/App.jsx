import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import TaskItem from "./TaskItem";
import iconAdd from "./assets/icon-add.png";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [inputText, setInputText] = useState("");
  // const [list, updateList] = useState([]);

  function addTask() {
    // if input is empty don't add a new task
    if (inputText === "") {
      toast("Fill the Task", {
        icon: "✏️",
      });
      console.log("toast");
      // show the alert "Input is empty"
    } else {
      // get text from input and add on task list
      const newArray = taskList.concat(inputText);
      setTaskList(newArray);
      setInputText("");
    }
  }

  const onChange = (event) => {
    setInputText(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="app-task-container">
        <div className="app-task-container-input-button">
          <input
            className="app-input"
            type="text"
            placeholder="Enter your task"
            value={inputText}
            onChange={onChange}
          />

          {/* <img src="icon-add.png" onClick={addTask}/> */}
          <Toaster position="top-center" />
          <img src={iconAdd} onClick={addTask} className="app-icon-add" />
        </div>
        <ul className="app-list">
          {taskList.map((item) => {
            return <TaskItem label={item} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
