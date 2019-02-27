import { combineReducers } from 'redux';
import listReducer from "./listReducer";
import userReducer from "./userReducer";
import groupReducer from "./groupReducer";

const reducers = combineReducers({
    listReducer,
    userReducer,
    groupReducer,
});

export default reducers;