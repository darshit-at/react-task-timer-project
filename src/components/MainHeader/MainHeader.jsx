import React, { useState } from "react";
import ContentTitle from "../ContentTitle/ContentTitle";
import NavBar from "./NavBar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import './MainHeader.css';
import { clearStorage, getItem } from "../../helper/Storage";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
    const userName = getItem("user");
    const [showToggleOption, setShowToggleOption] = useState(false);

    const togglerHandler =() => {
      setShowToggleOption((previewState) => !previewState);
    }
 
    const logOutHandler = () => {
      clearStorage();
      window.location.reload();
    }
    const showToggle = () => {
        return (
            <div className="toggle">
                <ul>
                    <li>
                  <NavLink to ="/profile" className="nav-profile-link">
                  <FontAwesomeIcon icon={faUser} /> Profile
                  </NavLink>
                    </li>
                    <li onClick={() => logOutHandler()}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />Log Out</li>
                </ul>
            </div>
        )
    }
  return (
    <div className="container-fluid header">
        <div className="row">
        <div className="col-12 col-md-4 col-sm-4 col-lg-4 header-contain">
        <ContentTitle title="Task Time" />
      </div>

      <div className="col-12 col-md-4 col-sm-4 col-lg-4  header-contain" >
        <NavBar />
      </div>
      <div className="col-12 col-md-4 col-sm-4 col-lg-4  header-contain">
        <div className="float-end" onClick={togglerHandler}>
        <FontAwesomeIcon icon={faUser} />
        <span>Hi! {userName?.userName}</span>
        </div>    
      </div>
      {showToggleOption && showToggle() }
 </div>

  
    </div>
  );
};
export default MainHeader;
