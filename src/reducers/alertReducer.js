import {SET_ALERT} from "../constants/actions";

let initialState = {
    message: null,
    type: null,
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            return action.data;
        default:
            return state;
    }
};

export default alertReducer;