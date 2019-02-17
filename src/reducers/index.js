import { combineReducers } from 'redux';
import listReducer from "./listReducer";

const reducers = combineReducers({
    listReducer,
});

export default reducers;