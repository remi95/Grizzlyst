import {GROUP} from "../constants/actions";

let initialState = {
    group: {},
    favorites: {},
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GROUP:
            return {
                ...state,
                group: action.data,
            };
        default:
            return state;
    }
};

export default groupReducer;