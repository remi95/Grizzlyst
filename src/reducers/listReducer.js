import {LIST, SET_FULL_LIST, SET_LIST, SET_PRODUCTS_BY_DEPARTMENT} from "../constants/actions";

let initialState = {

};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_FULL_LIST:
          return {
              ...state,
              list: action.data.list,
              departments: action.data.departments,
          };
      case SET_LIST:
          return {
              ...state,
              list: action.data,
          };
      case SET_PRODUCTS_BY_DEPARTMENT:
          return {
              ...state,
              departments: action.data,
          };
      default:
          return state
  }
};

export default listReducer;