import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<h1>404 - Page Not Found :(</h1>
            <p>Don’t worry, we’ll help you get where you need to go. Try searching again, or using the links below to find what you’re looking for:</p>

            <h4>Popular Links: </h4>

            <ul>
                <li><NavLink to="/home">Home Page</NavLink></li>
                <li><NavLink to="/vacations">Vacations List</NavLink></li>
            </ul>
        </div>
    );
}

export default PageNotFound;
