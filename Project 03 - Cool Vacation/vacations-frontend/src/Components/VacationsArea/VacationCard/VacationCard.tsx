import { NavLink, useHistory } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Delete, Edit, Favorite, FavoriteBorder, ThumbDown, ThumbUp } from "@material-ui/icons";
import jwtAxios from "../../../Services/jwtAxios";
import config from "../../../Services/Config";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import { useState } from "react";
// import DeleteVacation from "../DeleteVacation/DeleteVacation";

import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    isAdmin: boolean;
    isFollower: boolean;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    // state here...
    const [isFollowing, setFollowing] = useState<Boolean>(props.isFollower);

    const history = useHistory();

    const handleDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='CustomUI'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this vacation?</p>
                        <div className="ConfirmButtons">
                            <button className="CancelButton" onClick={onClose}>No</button>
                            <button className="DeleteConfirmButton"
                                onClick={() => {
                                    history.push("/vacations/delete/" + props.vacation.vacationID);
                                    onClose();
                                }}
                            >
                                Yes, Delete it!
                            </button>
                        </div>
                    </div>
                );
            }
        })
    }

    async function followVacation() {
        try {
            const id = store.getState().authState.user.userID;
            await jwtAxios.post(`${config.followersUrl}${id}/${props.vacation.vacationID}`);
            notify.success("following '"+ props.vacation.destination + "' vacation");
            setFollowing(true);
            history.push("/vacations");
        } 
        catch (error) {
            notify.error("Error Occurred, please try again later");
            store.dispatch(userLoggedOutAction());
            history.push("/login");
        }
    }

    async function unfollowVacation() {
        try {
            const id = store.getState().authState.user.userID;
            await jwtAxios.delete(`${config.followersUrl}${id}/${props.vacation.vacationID}`);
            setFollowing(false);
            notify.success("unfollowing '"+ props.vacation.destination + "' vacation");
            history.push("/vacations");
        } 
        catch (error) {
            notify.error("Error Occurred, please try again later");
            store.dispatch(userLoggedOutAction());
            history.push("/login");
        }
    }

    return (
        <div className="VacationCard">
            <div className="CardHeader" >
                {/* <NavLink to="/"> <img src={sample} alt={props.vacation.destination + " image"} /> </NavLink> */}
                <img src={"http://localhost:3001/api/images/" + props.vacation.picFileName} alt={props.vacation.destination + " image"} />

                <h3>{props.vacation.destination}</h3>

            </div>
            <div className="CardBody">
                <p className="Description">{props.vacation.description}</p>
                <div className="Dates">
                    From: <strong>{new Date(props.vacation.start).toLocaleDateString('en-IL')}</strong>
                    <br />
                    To: <strong>{new Date(props.vacation.end).toLocaleDateString('en-IL')}</strong>
                </div>
            </div>
            <div className="CardFooter">
                {
                    !props.isAdmin &&
                    !isFollowing &&
                    <div className="Follow">
                        {/* <NavLink to="/"><Mood /></NavLink> */}
                        <button title="follow" onClick={followVacation}><FavoriteBorder /></button>
                    </div>
                }
                {
                    !props.isAdmin &&
                    isFollowing &&
                    <div className="Unfollow">
                        {/* <NavLink to="/"><MoodBad /></NavLink> */}
                        <button title="unfollow" onClick={unfollowVacation}><Favorite /></button>
                    </div>
                }
                {
                    !!props.isAdmin &&
                    <div className="Edit">
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationID}><Edit /></NavLink>
                    </div>
                }
                {
                    !!props.isAdmin &&
                    <div className="Delete">
                        {<button onClick={handleDelete}><Delete /></button>}
                        {/* <NavLink to={"/vacations/delete/" + props.vacation.vacationID}><Delete /></NavLink> */}
                    </div>
                }
                <div className="Price">
                    <strong>$ {props.vacation.price}</strong>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
