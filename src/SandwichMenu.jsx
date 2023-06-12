import React, { useRef, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getProjectUserId, getProjectsUrl } from "./utils/api";

import { auth } from "./auth/firebase";
import Input from "./Input";
import ListContent from "./ListContent";
import iconMenu from "./assets/icon-menu.png";
import iconAdd from "./assets/icon-add.png";

import "./SandwichMenu.css";
import "./Chakra.css";

const SandwichMenu = ({ onSelectProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [user] = useAuthState(auth);

  const [list, setList] = useState([]);

  const [newProjectValue, setNewProjectValue] = useState("");
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  const fetchData = async () => {
    console.log(`fetching all projects from user of ID ${user?.uid}`);
    // const fetchUrl = `https://mongo-db-spring-boot.onrender.com/api/v2/projects?userId=${user?.uid}`;
    const fetchUrl = getProjectUserId(user?.uid);

    const response = await fetch(fetchUrl);
    const responseJson = await response.json();

    console.log("fetch > responseJson.items", responseJson);
    setList(responseJson);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const onNewProjectInputChange = (e) => {
    console.log(e.target.value);
    const newInputValue = e.target.value;
    setNewProjectValue(newInputValue);
  };

  const onNewProjectButtonClick = () => {
    console.log("onNewProjectButtonClick");
    console.log(newProjectValue);

    if (newProjectValue === "") {
      toast("Fill the List Name", {
        icon: "✏️",
      });

      console.log("toast");
    } else {
      setIsLoadingAdd(true);
      postNewProject();
    }
  };

  const postNewProject = async () => {
    // make request

    const data = {
      name: newProjectValue,
      userId: user.uid,
    };
    // const url = `https://mongo-db-spring-boot.onrender.com/api/projects/`;
    const url = getProjectsUrl();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    console.log(responseJson);

    // update list of projects
    fetchData();
    // clean input
    setNewProjectValue("");
    // show toast

    toast("Project Save", {
      icon: "✅",
    });
    setIsLoadingAdd(false);
  };

  const handleKeyDown = (event) => {
    console.log("handleKeyDown");

    if (event.key === "Enter") {
      event.preventDefault();

      onNewProjectButtonClick();
    }
  };
  const onDeleteList = () => {
    fetchData();
  };

  const onCloseDrawer = (project) => {
    onClose();
    onSelectProject(project);
  };
  return (
    <div className="header-menu">
      <img src={iconMenu} onClick={onOpen} ref={btnRef} className="sandwich-menu-icon-menu" />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader>Create your List</DrawerHeader>

          <DrawerBody>
            <ListContent list={list} onDelete={onDeleteList} onSelectedProject={onCloseDrawer} />
          </DrawerBody>

          <DrawerFooter>
            <Input
              placeholder="List Name"
              value={newProjectValue}
              onChange={onNewProjectInputChange}
              onKeyDown={handleKeyDown}
              isDisabled={isLoadingAdd}
            />
            {isLoadingAdd === false && <img src={iconAdd} className="sandwich-menu-footer-img" onClick={onNewProjectButtonClick} />}
            {isLoadingAdd === true && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

SandwichMenu.propTypes = {
  onSelectProject: PropTypes.func,
};

export default SandwichMenu;
