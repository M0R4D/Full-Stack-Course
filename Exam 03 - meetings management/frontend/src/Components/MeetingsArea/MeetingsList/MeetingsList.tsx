import axios from "axios";
import { Component, SyntheticEvent } from "react";
import MeetingModel from "../../../Models/MeetingModel";
import GroupModel from "../../../Models/GroupModel";
import "./MeetingsList.css";

interface meetingListState {
    groups: GroupModel[];
    meetings: MeetingModel[];
}



class MeetingsList extends Component<{}, meetingListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { groups: [], meetings: [] };
    }

    public async componentDidMount() {
        try {
            const response = await axios.get<GroupModel[]>("http://localhost:3001/api/groups");
            this.setState({ groups: response.data });
        }
        catch (err) {
            alert(err.message);
        }
    }

    private groupSelected = async (args: SyntheticEvent) => {
        try {
            const groupId = (args.target as HTMLSelectElement).value;
            const response = await axios.get<MeetingModel[]>("http://localhost:3001/api/meetings-per-group/" + groupId);
            this.setState({ meetings: response.data });
        }
        catch (err) {
            alert(err.message);
        }
    }



    public render(): JSX.Element {
        return (
            <div className="MeetingsList">

                <select onChange={this.groupSelected}>
                    <option disabled selected value="0">Select Group...</option>
                    {this.state.groups.map(t => <option key={t.groupId} value={t.groupId}>{t.groupName}</option>)}
                </select>

                {this.state.meetings.length > 0 &&
                    <>
                        <h1>{this.state.meetings[0].groupName}</h1>
                        <hr />
                        <table>
                            <thead>
                                <tr>
                                    <th>Group Name</th>
                                    <th>Start Date & Time</th>
                                    <th>End Date & Time</th>
                                    <th>Description</th>
                                    <th>Meeting Room</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.meetings.map(m =>
                                    <tr key={m.meetingId}>
                                        <td>{m.groupName}</td>
                                        <td>{m.startTime}</td>
                                        <td>{m.endTime}</td>
                                        <td>{m.description}</td>
                                        <td>{m.meetingRoom}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>}

                {this.state.meetings.length === 0 && <p>No meetings to Show</p>}

            </div>
        );
    }
}


export default MeetingsList;
