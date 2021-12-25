import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import notify from "../../../Services/Notify";

function Logout(): JSX.Element {
    const history = useHistory();
    useEffect( () => {
        // store.dispatch({ type: AuthActionType.UserLoggedOut });
        store.dispatch(userLoggedOutAction());
        store.dispatch(vacationsDownloadedAction([]));
        notify.success("You are now logged out.. <br />see you &#128284;"); // see you soon :)
        history.push("/home");
    })

    return null;
}

export default Logout;
