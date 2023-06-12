import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, signInWithGoogle, logout } from "./auth/firebase";

import "./Header.css";
import "./Chakra.css";
import SandwichMenu from "./SandwichMenu";
import iconLogIn from "./assets/icon-login.png";
import iconLogOut from "./assets/icon-logout.png";

const Header = () => {
  const [user] = useAuthState(auth);
  const [selectedProject, setSelectedProject] = useState();

  const onGoogleSignIn = () => {
    signInWithGoogle();
  };

  const onGoogleLogOut = () => {
    logout();
  };

  const updateProject = (project) => {
    console.log(project);
    setSelectedProject(project);
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <div>
          <SandwichMenu onSelectProject={updateProject} />
          <span>{selectedProject?.name}</span>
        </div>
        <div className="header-name-user-and-email">
          <div className="header-user-photo-button">
            <div className="header-name-email">
              <span className="header-name-user">{user?.displayName}</span>
              <span className="header-email">{user?.email}</span>
            </div>

            <img src={user?.photoURL} referrerPolicy="no-referrer" className="header-photo"></img>
            {!user && (
              <img src={iconLogIn} onClick={onGoogleSignIn} className="header-icon-log-in"></img>
              // <button data-label="Register" className="rainbow-hover" >
              // <span className="sp">Register with Google</span>
              // </button>
            )}
            {user && (
              <img src={iconLogOut} onClick={onGoogleLogOut} className="header-icon-log-out"></img>
              // <button data-label="Register" className="rainbow-hover" >
              //   <span className="sp">Log Out</span>
              // </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
