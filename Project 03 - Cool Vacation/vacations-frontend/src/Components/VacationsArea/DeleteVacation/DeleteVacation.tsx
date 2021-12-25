import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./DeleteVacation.css";

function DeleteVacation(): JSX.Element {

    let location = useLocation()
    const id = +location.pathname.substr(location.pathname.lastIndexOf("/") + 1);

    const history = useHistory();

    const socketVacation = store.getState().authState.vacationsSocket.socket;

    useEffect(() => {
        if (!store.getState().authState.user) {
            notify.error("To do this you have to login");
            history.push("/login");
            return;
        }

        if (!store.getState().authState.user.isAdmin) {
            notify.error('You are not authorized to delete a vacation');
            history.push("/vacations");
            return
        }

        jwtAxios.delete(config.vacationsUrl + id)
        // .then((response) => { store.dispatch({ type: VacationsActionType.VacationDeleted, payload: response.data }) })
        // .then((response) => { store.dispatch(vacationDeletedAction(response.data)); })
        // .then(() => { store.dispatch(vacationDeletedAction(id)); })
        .then(() => socketVacation.emit("vacation-deleted-by-admin", id))
        .then(() => notify.success("Vacation has been deleted."))
        .then(() => history.push("/vacations"))
        .catch((error) => {
            notify.error("Error Occurred, can't deleting");
            history.push("/vacations");
        })
    });


    return null;
}

export default DeleteVacation;
