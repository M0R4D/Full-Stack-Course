import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";

// Create an object containing all the reducers: 
const reducers = combineReducers({ authState: authReducer, vacationsState : vacationsReducer });

// Crete the store object:
const store = createStore(reducers); 

// Export the store:
export default store;