import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    let location = useLocation()
    const id = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const [vacation, setVacation] = useState<VacationModel[]>([]); // state for vacations, set its initial value to empty array

    function changeType() {
        
    }

    useEffect(() => {
        if (!store.getState().authState.user) {
            notify.error("You are not logged in!");
            history.push("/login");
            return;
        }

        if (!store.getState().authState.user.isAdmin) {
            notify.error("You are not authorized to edit a vacation!");
            history.push("/vacations");
            return;
        }

        jwtAxios.get<VacationModel[]>(config.vacationsUrl + id)
            .then(response => setVacation(response.data))
            .catch(error => {
                console.log(error);
                if (error.response.data === "Your login session has been expired.") {
                    // store.dispatch({type: AuthActionType.UserLoggedOut});
                    store.dispatch(userLoggedOutAction());
                    notify.error(error.response.data);
                    history.push("/logout");
                }
            });
    }, []); // I dont know for what this is but without this react renders too many times


    async function send(vacation: VacationModel) {
        try {
            // Convert vacation object into FormData object: 
            const fd = new FormData();
            fd.append("destination", vacation.destination);
            fd.append("description", vacation.description)
            fd.append("price", vacation.price.toString());
            fd.append("start", vacation.start);
            fd.append("end", vacation.end);
            // fd.append("image", vacation.image.item(0));


            const vacationsSocket = store.getState().authState.vacationsSocket.socket;            


            // PUT to the server the FormData object:
            // const headers = { "authorization": "Bearer " + store.getState().authState.user?.token };
            // const response = await axios.post<VacationModel>(config.vacationsUrl, myFormData, { headers });
            const response = await jwtAxios.put<VacationModel>(config.vacationsUrl + id, fd);

            // emit updated vacation to server socket
            vacationsSocket.emit("vacation-updated-by-admin", response.data);

            // update the updated vacation to Redux (response.data is the updated vacation which backend sends us back): 
            // store.dispatch({ type: VacationsActionType.VacationUpdated, payload: response.data });
            // store.dispatch(vacationUpdatedAction(response.data));

            // Success message: 
            notify.success("Vacation has been updated.");

            // Navigate to "/vacations" route: 
            history.push("/vacations");
        }
        catch (error) {
            notify.error("Error Occurred" + error);
        }
    }


    return (
        <div className="EditVacation">
            <h1>Edit Vacation</h1>

            {vacation.map(vacation =>

                <form className="Form" onSubmit={handleSubmit(send)} key={vacation.vacationID}>

                    <label>Destination: </label>
                    <input type="text" defaultValue={vacation.destination} {...register("destination", { required: true, minLength: 3, maxLength: 25 })} />
                    {formState.errors.destination?.type === "required" && <span>Missing Destination</span>}
                    {formState.errors.destination?.type === "minLength" && <span>Destination too short (3 letters at least)</span>}
                    {formState.errors.destination?.type === "maxLength" && <span>Destination too long (up to 25 letters allowed)</span>}

                    <label>Description: </label>
                    <textarea defaultValue={vacation.description} {...register("description", { required: true, minLength: 5, maxLength: 1000 })} />
                    {formState.errors.description?.type === "required" && <span>Missing Description</span>}
                    {formState.errors.description?.type === "minLength" && <span>Description too short (5 letters at least)</span>}
                    {formState.errors.description?.type === "maxLength" && <span>Description too long (up to 1000 letters allowed)</span>}

                    <label>Price: </label>
                    <input type="number" step="0.01" defaultValue={vacation.price} {...register("price", { required: true, min: 0, max: 10000 })} />
                    {formState.errors.price?.type === "required" && <span>Missing Price</span>}
                    {formState.errors.price?.type === "min" && <span>Invalid Price (shouldn't be negative)</span>}
                    {formState.errors.price?.type === "max" && <span>Invalid Price (shouldn't exceed 10000)</span>}

                    <label>Start Date: </label>
                    <input type="datetime-local" onFocus={changeType} defaultValue={vacation.start} {...register("start", { required: true })} />
                    {formState.errors.start && <span>Missing Start Date</span>}

                    <label>End Date: </label>
                    <input type="datetime-local" defaultValue={vacation.end} {...register("end", { required: true })} />
                    {formState.errors.end && <span>Missing End Date</span>}

                    {/* <label>Image: </label>
                    <input type="file" accept="image/*" {...register("image", { required: true })} />
                    {formState.errors.image && <span>Missing Image</span>} */}

                    <div className="FormButtons">
                        <button className="OK">Edit Vacation</button>
                        <button className="Cancel"><NavLink to="/vacations"> Cancel</NavLink></button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default EditVacation;
