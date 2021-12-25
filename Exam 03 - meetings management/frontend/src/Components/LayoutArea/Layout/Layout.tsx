import { NavLink } from "react-router-dom";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <div className="Navigation">
                <NavLink to="/home" exact>Home</NavLink>
                <span> | </span>
                <NavLink to="/meetings" exact>Meetings</NavLink>
                <span> | </span>
                <NavLink to="/add-meeting" exact>Add Meeting</NavLink>
            </div>
            
            <hr />

            <h1>Groups & Meetings</h1>

            <Routing />
        </div>
    );
}

export default Layout;
