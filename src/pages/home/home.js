import React from 'react';
import ConnectCarolina from '../../static/ConnectCarolina.jpg';
import './home.css';

const Home = () => {
    return (
        <div id="home">
            <h1>ConnectCarolina</h1>
            <div className="logo-container">
            <img src={ConnectCarolina} alt="CC Logo" />
            </div>
            <p><em>Logo by Sahil Patel</em></p>
            <br/>
            <br/>
            

            <a href="/login">
                <div className="student-center-link">
                    Student Center
                </div>
            </a>
        </div>
    )
}

export default Home;