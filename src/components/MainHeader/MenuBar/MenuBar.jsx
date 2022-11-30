import React from 'react';
import NavBar from '../NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './MenuBar.css';
import { NavLink } from 'react-router-dom';
const MenuBar = (props) => {
    const fixPosition = props.isClickOnMenuIcon ? "-10px" :  "-200px";
    
    return (
        <ul className='menu-list' style= {{position : "absolute", right : fixPosition, top : "0px", transition : "all 1s ease-in-out"} }>
            <FontAwesomeIcon icon={faClose} className = "close-icon" onClick={() => props.onClose()}/>
            <li>
                <NavBar />
            </li>
            <li>
            <NavLink to="/profile" className="nav-profile-link">
              <FontAwesomeIcon icon={faUser} /> Profile
            </NavLink>
          </li>
          <li onClick={() => props.onLogOut()} className = "logout-icon-list">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Log Out
          </li>
        </ul>
    );
};
export default MenuBar;