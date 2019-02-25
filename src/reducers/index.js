import { combineReducers } from 'redux';
import listReducer from "./listReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
    listReducer,
    userReducer,
});

export default reducers;