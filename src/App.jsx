import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";

import "./App.css";
import TaskItem from "./TaskItem";
import iconAdd from "./assets/icon-add.png";
import icondone from "./assets/icon-done.png";
import iconToDo from "./assets/icon-to-do.png";
import iconTrashAll from "./assets/icon-trash-all.png";

function App() {
  const isFirstRender = useRef(true);

  const [taskList, setTaskList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [estaAberto, setValorPara] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log("first render");

      const savedList = JSON.parse(localStorage.getItem("taskList"));
      const savedListDone = JSON.parse(localStorage.getItem("doneList"));

      if (savedList && savedList.length) {
        console.log(savedList);
        // update task list
        setTaskList(savedList);
      }
      if (savedListDone && savedListDone.length) {
        console.log(savedListDone);
        // update task list
        setDoneList(savedListDone);
      }

      return; // 👈️ return early if first render
    } else {
      console.log(taskList.length);
      // store the tasks in the local Storage
      localStorage.setItem("taskList", JSON.stringify(taskList));
      localStorage.setItem("doneList", JSON.stringify(doneList));
    }
  }, [taskList, doneList]);

  function addTask() {
    const filterArray = taskList.filter((item) => {
      return item.task === inputText;
    });
    console.log({ filterArray });

    // if input is empty don't add a new task
    if (inputText === "") {
      toast("Fill the Task", {
        icon: "✏️",
      });
      console.log("toast");
      // show the alert "Input is empty"
    } else if (filterArray.length > 0) {
      toast("Task already exists", {
        icon: "✏️",
      });
    } else {
      // get text from input and add on task list
      // taskList = [ "task 2", task 1"," ...] => [{task: "task1", total: 10, priority: 0}, {task: "task2", total: 5, priority: 0}...]

      const newTask = { task: inputText, total: 1, priority: 2 };

      const newArray = taskList.concat(newTask);
      setTaskList(newArray);

      // clear the input
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
    let itemToDone = {};

    const newTaskArray = taskList.filter((item) => {
      if (item.task === label) {
        itemToDone = item;
      }

      return item.task !== label;
    });

    setTaskList(newTaskArray);

    // add label on done list
    const newArray = doneList.concat(itemToDone);
    setDoneList(newArray);
    setIsOpen(true);
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
    const arrayRemove = taskList.filter((item) => {
      return item.task !== label;
    });

    setTaskList(arrayRemove);

    toast("Task Deleted", {
      icon: "✏️",
    });
  };

  const onClickIcon = () => {
    // console.log(estaAberto);

    if (estaAberto === false) {
      setValorPara(true);
    }

    if (estaAberto === true) {
      setValorPara(false);
      toast("Closed Tasks", {
        icon: "✏️",
      });
    }
  };

  const isOpenList = () => {
    // console.log(isOpen);

    if (isOpen === false) {
      setIsOpen(true);
    }

    if (isOpen === true) {
      setIsOpen(false);
      toast("Closed Tasks", {
        icon: "✏️",
      });
    }
  };

  const clearDone = () => {
    setDoneList([]);

    toast("All Tasks Deleted", {
      icon: "❌",
    });

    isOpenList();
  };

  const handleKeyDown = (event) => {
    console.log("handleKeyDown");

    if (event.key === "Enter") {
      event.preventDefault();

      addTask();
    }
  };

  const increaseTotal = (label) => {
    console.log("increaseTotal", label);

    // find the array item to change
    const newArray = taskList.map((item) => {
      if (label === item.task) {
        item.total = item.total + 1;
      }

      return item;
    });

    console.log(newArray);
    setTaskList(newArray);
    // update the list => setTaskList(?)
  };

  const decreaseTotal = (label) => {
    console.log("decreaseTotal");

    const newArray = taskList.map((item) => {
      if (item.task === label) {
        item.total = item.total - 1;
      }
      return item;
    });

    setTaskList(newArray);
  };

  const changePriority = (label, value) => {
    const newArray = taskList.map((item) => {
      if (label === item.task) {
        item.priority = value;
      }

      return item;
    });

    console.log(newArray);
    setTaskList(newArray);
  };
  console.log(taskList);

  return (
    <div className="app-container">
      <Toaster position="top-center" />

      <div className="app-task-container">
        <div className="app-task-container-input-button">
          <input className="app-input" type="text" placeholder="Enter your task" value={inputText} onChange={onChange} onKeyDown={handleKeyDown} />
          <img src={iconAdd} onClick={addTask} className="app-icon-add" />
        </div>

        <div>
          <div className="app-icon-to-do">
            <img src={iconToDo} onClick={onClickIcon} className="app-img-to-do" />

            <label className="app-name-label-to-do">ToDo({taskList.length})</label>
          </div>

          {estaAberto === true && (
            <ul className="app-list">
              {taskList.map((item) => {
                //item: "task 1" => {task: "task 1", total: 1, priority: 0}
                return (
                  <TaskItem
                    key={item.task}
                    label={item.task}
                    total={item.total}
                    priority={item.priority}
                    onChange={markDone}
                    onDelete={onDeleteTasks}
                    onMinus={decreaseTotal}
                    onPlus={increaseTotal}
                    onPriorityChange={changePriority}
                  />
                );
              })}
            </ul>
          )}
        </div>

        <div>
          <div className="app-done-header">
            <div className="app-icon-done">
              <img src={icondone} className="app-img-done" onClick={isOpenList} />

              <label className="app-name-label-done">Done ({doneList.length})</label>
            </div>

            {doneList.length > 0 && (
              <div className="app-icon-trash-all-contanier">
                <ReactTooltip place="top" type="warning" effect="float" />
                <img src={iconTrashAll} className="app-icon-trash-all" onClick={clearDone} data-tip="❗️ Delete ALL?" />
              </div>
            )}
          </div>

          {isOpen === true && (
            <ul className="app-list-done">
              {doneList.map((item) => {
                return <TaskItem key={item.task} label={item.task} total={item.total} isDone={true} onDelete={onDeleteDone} />;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
