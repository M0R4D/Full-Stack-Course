import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import "./VacationDetails.css";

interface RouteParams {
    id: string;
}

interface VacationDetailsProps extends RouteComponentProps<RouteParams> {

}

interface VacationDetailsState {
    vacation: VacationModel;
}

class VacationDetails extends Component<VacationDetailsProps, VacationDetailsState> {

    public async componentDidMount() {
        try {
            const id = +this.props.match.params.id;

            // // Without Redux: 
            // const response = await axios.get<VacationModel>(config.vacationsUrl + id);
            // this.setState({ vacation: response.data });

            // With Redux: 
            const foundVacation = store.getState().vacationsState.vacations.find(v => v.vacationID === id);
            this.setState({ vacation: foundVacation });
        }
        catch (error) {
            console.log(error);
        }
    }


    public render(): JSX.Element {
        return (
            <div className="VacationDetails">
                <h2>Vacation Details</h2>
                {this.state?.vacation &&
                    <div>
                        <h3>{this.state.vacation.destination}</h3>
                        <p>{this.state.vacation.description}</p>
                        <hr />
                        <p>Dates: From <span>{this.state.vacation.start} To {this.state.vacation.end}</span></p>
                        <p>The price is: {this.state.vacation.price}$</p>
                        <img src={"http://localhost:3001/api/vacations/images/" + this.state.vacation.picFileName } alt="" />
                    </div>
                }
                <NavLink to="/vacations">Back to Vacations List</NavLink>
            </div>
        );
    }
}

export default VacationDetails;
