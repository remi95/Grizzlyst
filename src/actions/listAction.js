import {SET_FULL_LIST, SET_LIST, SET_PRODUCTS_BY_DEPARTMENT} from "../constants/actions";

export const setCurrentFullList = (data) => {
    return {
        type: SET_FULL_LIST,
        data
    }
};

export const setCurrentList = (data) => {
    return {
        type: SET_LIST,
        data
    }
};

export const setProductsByDepartment = (data) => {
    return {
        type: SET_PRODUCTS_BY_DEPARTMENT,
        data
    }
};