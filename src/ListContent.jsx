import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  // AlertDialogCloseButton,
  // Button,
} from "@chakra-ui/react";

import "./ListContent.css";
import iconDropDown from "./assets/icon-drop-down.png";
import iconTrash from "./assets/icon-trash-all.png";
import iconYes from "./assets/icon-yes.png";
import iconNo from "./assets/icon-no.png";
import { getProjectUrl } from "./utils/api";

const ListContent = ({ list, onDelete, onSelectedProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const cancelRef = React.useRef();

  const DeleteConfimationModal = () => {
    const deleteProject = async () => {
      console.log("delete", selectedProjectId);

      // const url = `https://mongo-db-spring-boot.onrender.com/api/v2/projects/${selectedProjectId}`;
      const url = getProjectUrl(selectedProjectId);

      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      });

      // const responseJson = await response.json();
      // console.log(responseJson);

      // on success close modal and show toast and call prop on delete
      onClose();
      onDelete();
    };

    return (
      <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          {/* <AlertDialogCloseButton /> */}
          <AlertDialogBody>Are you sure you want to discard all of your notes? </AlertDialogBody>
          <AlertDialogFooter>
            <div>
              <img src={iconNo} ref={cancelRef} onClick={onClose} className="list-icon-no" />

              <img src={iconYes} onClick={deleteProject} className="list-icon-yes" />
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const onOpenModal = (projectId) => {
    console.log(projectId);
    setSelectedProjectId(projectId);
    onOpen();
  };

  return (
    <div className="list-content-div">
      <DeleteConfimationModal />

      {list.map((item) => {
        return (
          <li key={item.id} className="list">
            <span className="list-name">{item.name}</span>
            <div className="list-icons">
              <img
                src={iconTrash}
                className="list-icon-trash"
                onClick={() => {
                  onOpenModal(item.id);
                }}
              ></img>
              <img
                src={iconDropDown}
                className="list-content-icon-drop-down"
                onClick={() => {
                  onSelectedProject(item);
                }}
              />
            </div>
          </li>
        );
      })}
    </div>
  );
};

ListContent.propTypes = {
  list: PropTypes.array,
  onDelete: PropTypes.func,
  onSelectedProject: PropTypes.func,
};

export default ListContent;
