import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
    return (
        <ul>
            <li className='nav-list'>
                <NavLink to = "/" className = "nav-link">Dashboard</NavLink>
            </li>
            <li className='nav-list'>
                <NavLink to = "/timeHistory" className = "nav-link">Time history</NavLink>
            </li>
            
        </ul>
    )
};

export default NavBar;