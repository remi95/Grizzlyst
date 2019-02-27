import {LOGIN, GROUPS, INVITATIONS} from "../constants/actions";

let initialState = {
    user: {},
    token: null,
    groups: [],
    invitations: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
            };
        case GROUPS:
            return {
                ...state,
                groups: action.data,
            };
        case INVITATIONS:
            return {
                ...state,
                invitations: action.data,
            };
        default:
            return state;
    }
};

export default userReducer;