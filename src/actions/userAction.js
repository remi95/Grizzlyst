import {LOGIN} from "../constants/actions";
import GrizzlystClient from "../clients/GrizzlystClient";
import {AsyncStorage} from 'react-native';
import NavigationService from "../services/NavigationService";

const success = (data) => {
    return {
        type: LOGIN,
        data
    }
};

export const registerAction = async (data) => {
    return userPostRequest('auth/signup', data);
};

export const loginAction = (data) => {
    return userPostRequest('auth/login', data);
};

const userPostRequest = async (endpoint, data) => {
    let response = await GrizzlystClient.post(endpoint, data);

    if (response.status) {
      return auth(response.data);
    } else {
      //TODO: throw alert.
    }
};

const auth = async (data) => {
    try {
        await AsyncStorage.setItem('token', data.token);
    } catch (error) {

    }
    // dispatch(success(data));
    NavigationService.navigate('CreateGroup');
};