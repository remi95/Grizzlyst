import {LOGIN} from "../constants/actions";
import GrizzlystClient from "../clients/GrizzlystClient";

const login = (data) => {
    return {
        type: LOGIN,
        data
    }
};

export const register = (data) => {
      return async (dispatch) => {
          let response = await GrizzlystClient.register(data);

          if (response.status) {
              dispatch(login(response.data))
          }
          else {
              //TODO: throw alert.
          }
      };
};