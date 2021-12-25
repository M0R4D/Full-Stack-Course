import "./Header.css";
import logo from '../../../Assets/Images/cool-vacation-logo.png';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import store from "../../../Redux/Store";

function Header(): JSX.Element {
    
    // socket need to be reopened every time after page refresh
    useEffect(() => {
        refreshConnecting();
    });    

    // connect the socket of the user, every refresh page while the user is still connected: 
    const refreshConnecting = () => {
        const refresh = window.performance.navigation.type;
        const isUserConnect = store.getState().authState.user;
        if (refresh && isUserConnect) {
            store.getState().authState.vacationsSocket.connect();
            // store.getState().authState.vacationsSocket = JSON.parse(sessionStorage.getItem('socket'));
        }
    }


    return (
        <NavLink to="/home">
            <div className="Header">
                <img src={logo} alt="logo" />
                <h1>Cool Vacations</h1>
            </div>
        </NavLink>
    );
}

export default Header;
