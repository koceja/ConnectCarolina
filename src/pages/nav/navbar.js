import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './navbar.css';

export const ShoppingNavBar = (props) => {
    return (
        <div id="shopping-navbar">
            <ul className="nav-list">
            <li className={`nav-link ${(props.active === "search") ? "nav-selected" : null}`} >
                    <a href="/student-center/academics/search">Search</a>
                </li>
                <li className={`nav-link ${(props.active === "enroll") ? "nav-selected" : null}`} >
                    <a href="/student-center/academics/enroll">Enroll</a>
                </li>
                <li className="nav-auto">
                
                </li>
            </ul>
            <hr/>
        </div>
    )
}

const NavBar = (props) => {

    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        localStorage.removeItem("onyen");
        setLoggedOut(true);
    }

    if (loggedOut) {
        return (<Redirect to="/" />);
    }

    return (
        <div id="navbar">
            <ul className="nav-list">
                <li className="nav-home nav-link">
                    <a href="/student-center/dashboard"><p>Student Center</p></a>
                </li>
                <li className="nav-auto">
                
                </li>
                <li className={`nav-link ${(props.active === "dashboard") ? "nav-selected" : null}`} >
                    <a href="/student-center/dashboard">Dashboard</a>
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
                <li className={`nav-link`}>
                    <div onClick={logout} className="logout">Log Out</div>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;