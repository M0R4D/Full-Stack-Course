import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { AuthActionType } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import notify from "../../../Services/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    function send(credentials: CredentialsModel) {
        // With Promises: 
        axios.post<CredentialsModel>(config.loginUrl, credentials)
            .then((response) => {
                console.log(response.data)
                // Redux...
                store.dispatch({ type: AuthActionType.UserLoggedIn, payload: response.data });
                // store.dispatch(userLoggedInAction(response.data));
                notify.success("You are now logged in.");

                history.push("/vacations");
            })
            .catch((error) => {
                notify.error(error.response.data);
            });

        // // With async await: 
        // try {
        //     // const response = await axios.post<CredentialsModel>("http://localhost:3001/auth/login", credentials);
        //     const response = await axios.post<CredentialsModel>(config.loginUrl, credentials);
        //     console.log(response.data)

        //     // Redux...
        //     store.dispatch({ type: AuthActionType.UserLoggedIn, payload: response.data });
        //     // store.dispatch(userLoggedInAction(response.data));
        //     notify.success("You are now logged in.");

        //     history.push("/vacations");
        // } 
        // catch (error) {
        //     notify.error("Invalid User Credentials Error,\nPlease try again");
        //     console.log(typeof error , error);
        // }
    }


    return (
        <div className="Login">
            <h1>Login</h1>


            <form className="Form" onSubmit={handleSubmit(send)}>

                <p className="Greeting">
                    Hello 👋 Friend, <br />
                    We Are 😊 To See You Again <br />
                </p>

                {/* <label>Username: </label> */}
                <input type="text" placeholder="&#128113; Username" {...register("username", { required: true })} />
                {formState.errors.username?.type === "required" && <span>Username is required</span>}

                {/* <label>Password: </label> */}
                <input type="password" placeholder="&#128273; Password" {...register("password", { required: true })} />
                {formState.errors.password?.type === "required" && <span>Are you OK 🤔? I need a password 🥺</span>}

                <button>Login</button>
                <p className="Message">New Here? <NavLink to="/register" className="AuthRedirect">Register</NavLink></p>
            </form>
        </div>
    );
}

export default Login;
