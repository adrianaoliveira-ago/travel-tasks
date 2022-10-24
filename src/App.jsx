import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import "./App.css";
import TaskItem from "./TaskItem";
import iconAdd from "./assets/icon-add.png";
import icondone from "./assets/icon-done.png";
import iconToDo from "./assets/icon-to-do.png";
import iconTrashAll from "./assets/icon-trash-all.png";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [estaAberto, setValorPara] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

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
    // console.log(event.target.value);
  };

  const markDone = (label) => {
    // console.log("markDone", label);
    // remove label from taskList
    const newTaskArray = taskList.filter((item) => {
      return item !== label;
    });
    setTaskList(newTaskArray);

    // add label on done list
    const newArray = doneList.concat(label);
    setDoneList(newArray);
  };

  const onDeleteDone = (label) => {
    toast("Task Deleted", {
      icon: "✏️",
    });
    const arrayRemove = doneList.filter((item) => {
      return item !== label;
    });
    setDoneList(arrayRemove);
  };

  const onDeleteTasks = (label) => {
    toast("Task Deleted", {
      icon: "✏️",
    });

    const arrayRemove = taskList.filter((item) => {
      return item !== label;
    });
    setTaskList(arrayRemove);
  };

  const onClickIcon = () => {
    // console.log(estaAberto);
    toast("Closed Tasks", {
      icon: "✏️",
    });

    if (estaAberto === false) {
      setValorPara(true);
    }

    if (estaAberto === true) {
      setValorPara(false);
    }
  };

  const isOpenList = () => {
    // console.log(isOpen);
    toast("Closed Tasks", {
      icon: "✏️",
    });

    if (isOpen === false) {
      setIsOpen(true);
    }

    if (isOpen === true) {
      setIsOpen(false);
    }
  };

  const clearDone = () => {
    toast("All Tasks Deleted", {
      icon: "❌",
    });

    setDoneList([]);
  };

  return (
    <div className="app-container">
      <ReactTooltip place="top" type="warning" effect="float" />
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

        <div>
          <div className="app-icon-to-do">
            <Toaster position="top-center" />
            <img
              src={iconToDo}
              onClick={onClickIcon}
              className="app-img-to-do"
            />

            <label>ToDo ({taskList.length})</label>
          </div>

          {estaAberto === true && (
            <ul className="app-list">
              {taskList.map((item) => {
                <Toaster position="top-center" />;

                return (
                  <TaskItem
                    label={item}
                    onChange={markDone}
                    onDelete={onDeleteTasks}
                  />
                );
              })}
            </ul>
          )}
        </div>

        <div>
          <div className="app-icon-done">
            <img src={icondone} className="app-img-done" onClick={isOpenList} />
            <label>Done ({doneList.length})</label>
          </div>
          <div className="app-icon-trash-all-contanier">
            <Toaster position="top-center" />

            <img
              src={iconTrashAll}
              className="app-icon-trash-all"
              onClick={clearDone}
              data-tip="❗️Delete ALL?"
            />
          </div>
          {isOpen === true && (
            <ul className="app-list">
              {doneList.map((item) => {
                <Toaster position="top-center" />;
                return (
                  <TaskItem
                    label={item}
                    isDone={true}
                    onDelete={onDeleteDone}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
