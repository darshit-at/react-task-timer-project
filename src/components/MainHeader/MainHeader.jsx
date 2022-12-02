import React, { useContext, useEffect, useState } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import NavBar from "./NavBar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./MainHeader.css";
import { clearStorage, getItem } from "../../helper/Storage";
import { NavLink, useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar/MenuBar";
import authContext from "../../context/AuthContext";

const MainHeader = () => {
  const userName = getItem("user");
  const { onLogOut } = useContext(authContext);
  const [showToggleOption, setShowToggleOption] = useState(false);
  const [isCurrenScreenMoblieScreenSize, setIsCurrenScreenMoblieScreenSize] =
    useState();
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    const toggleMenuHandler = () => {
      if (window.innerWidth < 500) {
        setIsCurrenScreenMoblieScreenSize(true);
      } else {
        setIsCurrenScreenMoblieScreenSize(false);
      }
    };
    window.addEventListener("resize", toggleMenuHandler);

    return () => {
      window.removeEventListener("resize", toggleMenuHandler);
    };
  }, [window.innerWidth]);

  const togglerHandler = () => {
    setShowToggleOption((previewState) => !previewState);
  };

  const closeToggleHandler = () => {
    setToggleMenu(false);
  };
  const logOutHandler = () => {
    clearStorage();
    window.location.reload();
  };

  const showToggleMenuHandler = () => {
    setToggleMenu(true);
  };
  const showToggle = () => {
    return (
      <div className="toggle">
        <ul>
          <li>
            <NavLink to="/profile" className="nav-profile-link">
              <FontAwesomeIcon icon={faUser} /> Profile
            </NavLink>
          </li>
          <li onClick={() => logOutHandler()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Log Out
          </li>
        </ul>
      </div>
    );
  };
  return (
    <div className="container-fluid header">
      <div className="row">
        <div className="col-6 col-md-3 col-sm-3 col-lg-3 header-contain">
          <ContentTitle title="Task Time" />
        </div>
        {!isCurrenScreenMoblieScreenSize && (
          <div className="col-3 col-md-6 col-sm-6 col-lg-6  header-contain">
            <NavBar />
          </div>
        )}

        <div className="col-6 col-md-3 col-sm-3 col-lg-3  header-contain">
          <div className="float-end">
            {isCurrenScreenMoblieScreenSize ? (
              <FontAwesomeIcon
                icon={faBars}
                className="menu-icon"
                onClick={showToggleMenuHandler}
              />
            ) : (
              <div onClick={togglerHandler}>
                <FontAwesomeIcon icon={faUser} />
                <span>Hi! {userName?.userName}</span>
              </div>
            )}
            {toggleMenu && (
              <MenuBar
                onLogOut={() => logOutHandler()}
                onClose={closeToggleHandler}
                isClickOnMenuIcon={toggleMenu}
              />
            )}
          </div>
        </div>
        {showToggleOption && showToggle()}
      </div>
    </div>
  );
};
export default MainHeader;
