import { Redirect, Route, Switch } from "react-router-dom";
import AddMeeting from "../../MeetingsArea/AddMeeting/AddMeeting";
import MeetingsList from "../../MeetingsArea/MeetingsList/MeetingsList";

import Home from "../Home/Home";

function Routing(): JSX.Element {
    return (
        <Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/meetings" component={MeetingsList} exact />
            <Route path="/add-meeting" component={AddMeeting} exact />
            <Redirect from="/" to="/home" exact />
        </Switch>
    );
}

export default Routing;
