import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import DeleteVacation from "../../VacationsArea/DeleteVacation/DeleteVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={Home} exact />

                <Route path="/vacations" component={VacationsList} exact />
                <Route path="/vacations/details/:id([0-9]+)" component={VacationDetails} exact />
                <Route path="/vacations/new" component={AddVacation} exact />
                <Route path="/vacations/edit/:id" component={EditVacation} exact />
                <Route path="/vacations/delete/:id" component={DeleteVacation} exact />
                {/* <Route path="/vacations/delete2/:id" component={DeleteVacation2} exact /> */}

                <Route path="/register" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/logout" component={Logout} exact />
                
                {/* <Route path="/" component={Home} exact /> */}
                <Redirect from="/" to="/home" exact />

                <Route component={PageNotFound} />

            </Switch>
        </div>
    );
}

export default Routing;
