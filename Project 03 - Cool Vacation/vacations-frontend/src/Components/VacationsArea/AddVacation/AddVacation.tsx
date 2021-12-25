import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    // If you are not logged in:
    useEffect(() => {
        if (!store.getState().authState.user) {
            notify.error("You are not logged in!");
            history.push("/login");
            return;
        }
        if (!store.getState().authState.user.isAdmin) {
            notify.error("You are not authorized to add a new vacation!");
            history.push("/vacations");
            return;
        }
    });


    async function send(vacation: VacationModel) {
        try {
            // Convert vacation object into FormData object: 
            const fd = new FormData();
            fd.append("destination", vacation.destination);
            fd.append("description", vacation.description)
            fd.append("price", vacation.price.toString());
            fd.append("start", vacation.start);
            fd.append("end", vacation.end);
            fd.append("image", vacation.image.item(0));

            const vacationsSocket = store.getState().authState.vacationsSocket.socket;            

            // POST to the server the FormData object:
            // const headers = { "authorization": "Bearer " + store.getState().authState.user?.token };
            // const response = await axios.post<VacationModel>(config.vacationsUrl, myFormData, { headers });
            const response = await jwtAxios.post<VacationModel>(config.vacationsUrl, fd);
            
            // emit added vacation to server socket
            vacationsSocket.emit("vacation-added-by-admin", response.data);

            // Add the added vacation to Redux (response.data is the added vacation which backend sends us back): 
            // store.dispatch({ type: VacationsActionType.VacationAdded, payload: response.data });
            // store.dispatch(vacationAddedAction(response.data));

            // Success message: 
            notify.success("Vacation has been added.");

            // Navigate to "/vacations" route: 
            history.push("/vacations");

        }
        catch (error) {
            notify.error("Error Occurred" + error);
        }
    }

    return (
        <div className="AddVacation">
            <h1>Add Vacation</h1>

            <form className="Form" onSubmit={handleSubmit(send)}>
                <label>Destination: </label>
                <input type="text" {...register("destination", { required: true, minLength: 3, maxLength: 25 })} />
                {formState.errors.destination?.type === "required" && <span>Missing Destination</span>}
                {formState.errors.destination?.type === "minLength" && <span>Destination too short (3 letters at least)</span>}
                {formState.errors.destination?.type === "maxLength" && <span>Destination too long (up to 25 letters allowed)</span>}

                <label>Description: </label>
                <textarea {...register("description", { required: true, minLength: 5, maxLength: 1000 })} />
                {formState.errors.description?.type === "required" && <span>Missing Description</span>}
                {formState.errors.description?.type === "minLength" && <span>Destination too short (5 letters at least)</span>}
                {formState.errors.description?.type === "maxLength" && <span>Destination too long (up to 1000 letters allowed)</span>}

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", { required: true, min: 0, max: 10000 })} />
                {formState.errors.price?.type === "required" && <span>Missing Price</span>}
                {formState.errors.price?.type === "min" && <span>Invalid Price (shouldn't be negative)</span>}
                {formState.errors.price?.type === "max" && <span>Invalid Price (shouldn't exceed 10000)</span>}

                <label>Start Date: </label>
                <input type="datetime-local" {...register("start", { required: true })} />
                {formState.errors.start && <span>Missing Start Date</span>}

                <label>End Date: </label>
                <input type="datetime-local" {...register("end", { required: true })} />
                {formState.errors.end && <span>Missing End Date</span>}

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", { required: true })} />
                {formState.errors.image && <span>Missing Image</span>}

                <div className="FormButtons">
                    <button className="OK">Add Vacation</button>
                    <button className="Cancel"><NavLink to="/vacations">Cancel</NavLink></button>
                </div>

            </form>
        </div>
    );
}

export default AddVacation;
