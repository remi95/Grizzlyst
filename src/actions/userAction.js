import {LOGIN, GROUPS, INVITATIONS} from "../constants/actions";
import GrizzlystClient from "../clients/GrizzlystClient";
import {AsyncStorage} from 'react-native';

const login = (data) => {
    return {
        type: LOGIN,
        data
    }
};

const groups = (data) => {
    return {
        type: GROUPS,
        data
    }
};

const invitations = (data) => {
    return {
        type: INVITATIONS,
        data
    }
};

export const registerAction = (data) => {
    return userPostRequest('auth/signup', data);
};

export const loginAction = (data) => {
    return userPostRequest('auth/login', data);
};

export const loginByTokenAction = () => {
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            let response = await GrizzlystClient.get('me', token);

            if (response.status) {
                AsyncStorage.setItem('token', response.data.token);
                dispatch(login(response.data));
            }
            else {
                //TODO: throw alert.
                console.log(response)
            }
        }
    }
};

export const getGroups = () => {
    return async (dispatch) => {
        let response = await GrizzlystClient.get('me/groups');

        if (response.status) {
            dispatch(groups(response.data));
        }
    }
};

export const getInvitations = () => {
    return async (dispatch) => {
        let response = await GrizzlystClient.get('me/invitations');

        if (response.status) {
            dispatch(invitations(response.data));
        }
    }
};

const userPostRequest = async (endpoint, data)  => {
      let response = await GrizzlystClient.post(endpoint, data);

      if (response.status) {
          return auth(response.data);
      }
      else {
          //TODO: throw alert.
          console.log(response)
      }
};

const auth = (data) => {
    return async (dispatch) => {
        await AsyncStorage.setItem('token', data.token);
        dispatch(login(data));
    }
};

const setUserInfos = async () => {
    let groups = await GrizzlystClient.post(endpoint, data);
};
