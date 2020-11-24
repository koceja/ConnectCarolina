import React from 'react';
import './navbar.css';

const NavBar = (props) => {
    return (
        <div id="navbar">
            <ul className="nav-list">
                <li className="nav-home">
                    <h2></h2>
                </li>
                <li className="nav-auto">
                
                </li>
                <li className={`nav-link ${(props.active === "academics") ? "nav-selected" : null}`} >
                    <a href="/student-center/academics">Academics</a>
                </li>
                <li className={`nav-link ${(props.active === "financial") ? "nav-selected" : null}`}>
                    <a href="/student-center/financial">Financial</a>
                </li>
                <li className={`nav-link ${(props.active === "personal") ? "nav-selected" : null}`}>
                    <a href="/student-center/personal">Personal</a>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;