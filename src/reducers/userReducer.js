import {LOGIN, GROUPS, INVITATIONS, LOGOUT} from "../constants/actions";

const initialState = {
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
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
