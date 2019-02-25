import {LOGIN} from "../constants/actions";

let initialState = {
    user: {
        id: 1,
        firstname: 'Grizz',
        name: 'Lyst',
        email: 'contact@grizzlyst.fr',
        pseudo: 'Grizzlyst',
        password: 'secret',
        updatedAt: '2019-02-23T18:14:30.117Z',
        createdAt: '2019-02-23T18:14:30.117Z',
    },
    token: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return action;
        default:
            return state;
    }
};

export default userReducer;