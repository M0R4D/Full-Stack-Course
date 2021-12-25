import store from "../../../Redux/Store";
import "./Home.css";

import node from '../../../Assets/Images/Node.js.png';
import express from '../../../Assets/Images/express-js.png';
import react from '../../../Assets/Images/React.png';
import redux from '../../../Assets/Images/Redux.png';
import mysql from '../../../Assets/Images/MySQL.png';
import rest from '../../../Assets/Images/RESTfulAPI.png';
import socket from '../../../Assets/Images/Socket-io.png';

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h1>Home</h1>
            <h3>Welcome {store.getState().authState.user?.firstName || "Visitor"},</h3>
            <p>This is "Cool Vacation" Project, was taken as the third project in Full Stack Course by John Bryce College.</p>
            <p>We were asked to implement a system to manage vacations, the system has an admin that can add, remove and edit an existing vacation, and an users that can view, follow, unfollow vacation.</p>
            <p>Another thing that our system supports is to create a new user account, and real-time updating page once there something has been changed by admin.</p>
            <p>This is a Responsive Website.</p>
            <div>
                <p>Technologies were used in this project: </p>
                <ul>
                    <li>Node.js as BackEnd</li>
                    <li>React as FrontEnd</li>
                    <li>MySQL as DataBase</li>
                    <li>Express as Server Manager</li>
                    <li>Redux as Cross-Application State Manager</li>
                    <li>Socket-IO as Real-Time Management</li>
                    <li>REST APIs as Site Architecture Style</li>
                    <li>Material UI</li>
                </ul>
            </div>
            <div>
                <img src={node} alt="nodejs" />
                <img src={express} alt="express" />
                <img src={react} alt="react" />
                <img src={redux} alt="redux" />
                <img src={mysql} alt="mysql" />
                <img src={rest} alt="rest" />
                <img src={socket} alt="socket" />
            </div>
            <br /> <br />
            <p>This page is a very simple page, See next pages for more enjoyment and beautiful design :)</p>
        </div>
    );
}

export default Home;
