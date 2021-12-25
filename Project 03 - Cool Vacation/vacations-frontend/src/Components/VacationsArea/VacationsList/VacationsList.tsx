import { AddRounded } from "@material-ui/icons";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { History } from "history";
import VacationModel from "../../../Models/VacationModel";
import { userLoggedOutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import config from "../../../Services/Config";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notify";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

interface VacationsListState {
    vacations: VacationModel[];
}

interface VacationsListProps {
    history: History;
}

class VacationsList extends Component<VacationsListProps, VacationsListState> {

    public constructor(props: VacationsListProps) {
        super(props);
        this.state = {
            vacations: []
        };
    }


    public async componentDidMount() {

        const user = store.getState().authState.user;
        const vacations = store.getState().vacationsState.vacations;

        try {
            // const response = await axios.get<VacationModel[]>("http://localhost:3001/api/vacations");
            // this.setState({ vacations: response.data })

            if (!user) {
                this.props.history.push("/login");
                notify.error('To see our "COOL VACATIONS" you should login or register');
                return;
            }

            // With Redux:
            if (vacations.length === 0) {
                const response = await jwtAxios.get<VacationModel[]>(config.followingVacationsUrl + user.userID);
                console.log(response.data)
                // store.dispatch({ type: VacationsActionType.VacationsDownloaded, payload: response.data });
                store.dispatch(vacationsDownloadedAction(response.data));
            }
            this.setState({
                vacations: store.getState().vacationsState.vacations
            });

            this.socketListeners();
        }
        catch (error) {
            notify.error("Error Occurred Please Login Again");
            store.dispatch(userLoggedOutAction());
            this.props.history.push("/login");
        }
    }


    public socketListeners(): void {
        store.getState().authState.vacationsSocket.socket.on("vacation-added-from-server", newVacation => {
            const allVacations = [...this.state.vacations];
            allVacations.push(newVacation);
            this.setState({ vacations: allVacations });
        });

        store.getState().authState.vacationsSocket.socket.on("vacation-updated-from-server", updatedVacation => {
            const allVacations = [...this.state.vacations];
            const indexToUpdate = allVacations.findIndex(vacation => vacation.vacationID === updatedVacation.vacationId);
            allVacations[indexToUpdate] = updatedVacation;
            this.setState({ vacations: allVacations });
        });

        store.getState().authState.vacationsSocket.socket.on("vacation-deleted-from-server", deletedVacation => {
            const allVacations = [...this.state.vacations];
            const indexToDelete = allVacations.findIndex(v => v.vacationID === deletedVacation);
            allVacations.splice(indexToDelete, 1);
            this.setState({ vacations: allVacations });
        });
    }


    public render(): JSX.Element {
        return (
            <div className="VacationsList">
                <h1>Vacations List</h1>
                {
                    !store.getState().authState.user &&
                    <p>
                        <strong>Sorry... </strong>
                        <br />
                        To see our "COOL VACATIONS" you should <NavLink to="/login">login</NavLink> or <NavLink to="/register">register</NavLink>
                    </p>
                }
                {
                    !!store.getState().authState.user?.isAdmin &&
                    <NavLink to="/vacations/new"><span>Add Vacation</span> <AddRounded /></NavLink>
                }

                <br />

                <div className="Cards">
                    {
                        this.state.vacations
                            .sort((vacation1, vacation2): number => +vacation2.following - +vacation1.following)
                            .map(vacation => <VacationCard key={vacation.vacationID} vacation={vacation} isAdmin={store.getState().authState.user?.isAdmin} isFollower={vacation.following} />)
                    }
                </div>

            </div>
        );
    }
}

export default VacationsList;
