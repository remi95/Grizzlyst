import { combineReducers } from 'redux';
import listReducer from "./listReducer";
import userReducer from "./userReducer";
import groupReducer from "./groupReducer";
import alertReducer from "./alertReducer";

const reducers = combineReducers({
    listReducer,
    userReducer,
    groupReducer,
    alertReducer,
});

export default reducers;