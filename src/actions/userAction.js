import {LOGIN, GROUPS, INVITATIONS, LOGOUT} from "../constants/actions";
import GrizzlystClient from "../clients/GrizzlystClient";
import {AsyncStorage} from 'react-native';
import NavigationService from "../services/NavigationService";
import HomeService from "../services/HomeService";

const login = (data) => {
    return {
        type: LOGIN,
        data
    }
};

export const logout = () => {
    return {
        type: LOGOUT
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

export const auth = (data, isRegistration = false) => {
    return async (dispatch) => {

        let response = isRegistration ?
            await GrizzlystClient.signup(data) :
            await GrizzlystClient.login(data);

        if (response.status) {
            await AsyncStorage.setItem('token', response.data.token);
            await dispatch(login(response.data));
            await HomeService.getHomeScreen();
        } else {
            //TODO: throw alert.
            console.log(response)
        }
    }
};

export const getGroups = () => {
    return async (dispatch) => {
        try {
            let response = await GrizzlystClient.get('me/groups');

            if (response.status) {
                dispatch(groups(response.data));
            }
        }
        catch (error) {
            // TODO: throw alert.
            console.log(error)
        }
    }
};

export const getInvitations = () => {
    return async (dispatch) => {
        try {
            let response = await GrizzlystClient.get('me/invitations');

            if (response.status) {
                dispatch(invitations(response.data));
            }
        }
        catch (error) {
           // TODO: throw alert.
            console.log(error)
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

const setUserInfos = async () => {
    let groups = await GrizzlystClient.post(endpoint, data);
};
