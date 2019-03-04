import {LIST} from "../constants/actions";

let initialState = {

};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
      case LIST:
          return {
              ...state,
              list: action.data.list,
              departments: action.data.departments,
          };
      default:
          return state
  }
};

export default listReducer;