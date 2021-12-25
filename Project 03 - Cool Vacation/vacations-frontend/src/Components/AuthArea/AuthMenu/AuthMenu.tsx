import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribeMe: Unsubscribe;


    public constructor(props: {}) {
        super(props);
        this.state = {
            user: store.getState().authState.user 
        };
    }

    public componentDidMount() {
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ user: store.getState().authState.user });
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }


    public render(): JSX.Element {
        return (
            <div className="AuthMenu">
                {
                    this.state?.user &&
                    <>
                        <span>Hello &#128075; {this.state.user.firstName} &#128525;</span>
                        <NavLink to="/logout" exact>Logout</NavLink>
                    </>
                }
                {
                    !this.state?.user &&
                    <>
                        {/* <span>Hello Guest</span> */}
                        <NavLink to="/login" exact>Login</NavLink>
                        <NavLink to="/register" exact>Register</NavLink>
                    </>
                }
            </div>
            
        );
    }
}

export default AuthMenu;
