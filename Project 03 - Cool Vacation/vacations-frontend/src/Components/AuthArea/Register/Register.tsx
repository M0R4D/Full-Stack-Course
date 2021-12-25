import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { userRegisteredAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import config from "../../../Services/Config";
import notify from "../../../Services/Notify";
import "./Register.css";

function Register(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState} = useForm<UserModel>()

    async function send(user: UserModel) {
        try {
            // const response = await axios.post<UserModel>("http://localhost:3001/auth/register", user);
            const response = await axios.post<UserModel>(config.registerUrl, user);
            
            // Redux..
            console.log(response.data);
            // store.dispatch({ type: AuthActionType.UserRegistered, payload: response.data });
            store.dispatch(userRegisteredAction(response.data));
            notify.success("You have been successfully registered!");
            
            history.push("/vacations")
        } 
        catch (error) {
            notify.error("Error Occurred while registering, please try again");
        }
    }


    return (
        <div className="Register">
            <h1>Register</h1>



            <form className="Form" onSubmit={handleSubmit(send)}>

                <p className="Greeting">
                    Hello 👋 Friend,<br />
                    We Are 😊 To See You Here <br />
                    <strong>Spoiler: </strong> You Are In The Right Place :)
                </p>

                {/* <label>First Name: </label> */}
                <input type="text" placeholder="First Name" {...register("firstName", { required: true, minLength: 3, maxLength: 25})} />
                {formState.errors.firstName?.type === "required" && <span>Missing First Name</span>}
                {formState.errors.firstName?.type === "minLength" && <span>First Name too short (3 letters at least)</span>}
                {formState.errors.firstName?.type === "maxLength" && <span>First Name too long (up to 25 letters allowed)</span>}

                {/* <label>Last Name: </label> */}
                <input type="text" placeholder="Last Name" {...register("lastName", { required: true, minLength: 3, maxLength: 25})} />
                {formState.errors.lastName?.type === "required" && <span>Missing Last Name</span>}
                {formState.errors.lastName?.type === "minLength" && <span>last Name too short (3 letters at least)</span>}
                {formState.errors.lastName?.type === "maxLength" && <span>last Name too long (up to 25 letters allowed)</span>}

                {/* <label>Username: </label> */}
                <input type="text" placeholder="Username" {...register("username", { required: true, minLength: 3, maxLength: 25})} />
                {formState.errors.username?.type === "required" && <span>Missing Username</span>}
                {formState.errors.username?.type === "minLength" && <span>Username too short (3 letters at least)</span>}
                {formState.errors.username?.type === "maxLength" && <span>Username too long (up to 25 letters allowed)</span>}

                {/* <label>Password: </label> */}
                <input type="password" placeholder="Password" {...register("password", { required: true})} />
                {formState.errors.password?.type === "required" && <span>I need a password 🥺</span>}

                <button>Register</button> 
                <p className="Message">Already have an account? <NavLink to="/login" className="AuthRedirect">Login</NavLink></p>

            </form>
        </div>
    );
}

export default Register;
