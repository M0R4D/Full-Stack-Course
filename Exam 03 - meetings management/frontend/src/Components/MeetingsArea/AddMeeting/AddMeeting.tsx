import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import MeetingModel from "../../../Models/MeetingModel";
import GroupModel from "../../../Models/GroupModel";
import "./AddMeeting.css";

function AddMeeting(): JSX.Element {
    const history = useHistory();
    const [groups, setGroups] = useState<GroupModel[]>([]);
    const { register, handleSubmit, formState } = useForm<MeetingModel>();

    useEffect(() => {
        axios.get<GroupModel[]>("http://localhost:3001/api/groups")
            .then(response => setGroups(response.data))
            .catch(err => alert(err.message));
    });

    async function send(meeting: MeetingModel) {
        try {
            const response = await axios.post<MeetingModel>("http://localhost:3001/api/meetings", meeting);
            alert("Added Successfully. ID: " + response.data.meetingId);
            history.push("/meetings");
        }
        catch(err) {
            alert(err.message);
        }
    }

    return (
        <div className="AddMeeting">

            <form onSubmit={handleSubmit(send)}>

                <label>Group: </label>
                <select {...register("groupId", {required: true})}>
                    <option disabled selected value="0">Select Group...</option>
                    {groups.map(g => <option key={g.groupId} value={g.groupId}>{g.groupName}</option>)}
                </select>
                {formState.errors.groupId && <span>You should select a group.</span>}

                <label>Start Date & Time: </label>
                <input type="datetime-local" {...register("startTime", {required: true})} />
                {formState.errors.startTime && <span>Pick a valid date and time.</span>}

                <label>End Date & Time: </label>
                <input type="datetime-local" {...register("endTime", {required: true})} />
                {formState.errors.endTime && <span>Pick a valid date and time.</span>}

                <label>Description: </label>
                <input type="text" {...register("description", {required: true, minLength: 10, maxLength: 200})} />
                {formState.errors.description?.type === "required" && <span>Missing description.</span>}
                {formState.errors.description?.type === "maxLength" && <span>You should not add more than 200 chars.</span>}
                {formState.errors.description?.type === "minLength" && <span>description is to shoort.</span>}


                <label>Meeting Room:</label>
                <input type="text" {...register("meetingRoom", {required: true, minLength: 3, maxLength: 50})} />
                {formState.errors.meetingRoom?.type === "required" && <span>Missing Room name.</span>}
                {formState.errors.meetingRoom?.type === "maxLength" && <span>You should not add more than 50 chars.</span>}
                {formState.errors.meetingRoom?.type === "minLength" && <span>Room name is to shoort.</span>}



                <button>Add meeting</button>

            </form>

        </div>
    );
}

export default AddMeeting;
