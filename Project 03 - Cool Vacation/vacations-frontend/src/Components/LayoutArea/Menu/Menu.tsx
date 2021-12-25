import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <nav>
                <div>
                    <NavLink to="/home" exact>Home</NavLink>
                    <NavLink to="/vacations" exact>Vacations</NavLink>
                </div>
                <div>
                    <AuthMenu />
                </div>
            </nav>
        </div>
    );
}

export default Menu;
