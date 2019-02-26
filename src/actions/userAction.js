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
    userPostRequest('auth/signup', data);
};

export const loginAction = (data) => {
    userPostRequest('auth/login', data);
};

const userPostRequest = (endpoint, data) => {
      return async (dispatch) => {
          let response = await GrizzlystClient.post(endpoint, data);

          if (response.status) {
              dispatch(auth(response.data));
          }
          else {
              //TODO: throw alert.
          }
      };
};

const auth = async (data) => {
    try {
        await AsyncStorage.setItem('token', data.token);
    } catch (error) {

    }
    dispatch(success(data));
    NavigationService.navigate('CreateGroup');
};