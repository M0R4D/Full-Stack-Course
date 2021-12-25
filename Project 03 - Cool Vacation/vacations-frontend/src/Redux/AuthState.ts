import UserModel from "../Models/UserModel";
import VacationsSocket from "../Services/VacationsSocket";

// Auth State: 
export class AuthState {
    public user: UserModel = null;
    public vacationsSocket: VacationsSocket = new VacationsSocket();

    public constructor() {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) {
            this.user = user;
        }
    }
}

// Auth Action Types: 
export enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // Here payload is optional because we have no data on UserLoggedOut.
}


// Auth Action Creators:   
export function userRegisteredAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user };
}
export function userLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}


// Auth Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch(action.type) {
        case AuthActionType.UserRegistered: 
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload; // Here action.payload is a UserModel object sent from backend.
            localStorage.setItem("user", JSON.stringify(newState.user));
            newState.vacationsSocket.connect(); // Socket connect
            break;
        case AuthActionType.UserLoggedOut:
            newState.user = null; // Here we don't have action.payload.
            newState.vacationsSocket.disconnect(); // socket disconnect
            localStorage.removeItem("user");
            break;
    }
    return newState;
}

