import {REFERENCES, SET_FULL_LIST, SET_LIST, SET_PRODUCTS_BY_DEPARTMENT} from "../constants/actions";
import GrizzlystClient from "../clients/GrizzlystClient";
import DepartmentsHelper from "../helpers/Departments";
import NavigationService from "../services/NavigationService";

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

export const setDepartmentsReference = (data) => {
    return {
        type: REFERENCES,
        data
    }
};

/**
 * @param product
 *   The product get from API.
 * @param departmentId
 *   The departmentId to add product.
 */
export const addProductToDepartment = (product, departmentId) => {
    return async (dispatch, getState) => {
        let departments = Object.assign({}, getState().listReducer.departments);

        for (let i in departments) {
            if (departments[i].id === departmentId) {

                // Because weight is called 'quantity' on database.
                // product.weight = product.quantity;
                // delete product.quantity;

                departments[i].products.push(product);
            }
        }

        dispatch(setProductsByDepartment(departments));
    }
};

export const getAllDepartments = () => {
    return async (dispatch) => {
        try {
            let response = await GrizzlystClient.getAllDepartments();

            if (response.status) {
                dispatch(setDepartmentsReference(response.data));
            }
        }
        catch (error) {
            // TODO: throw alert.
            console.log(error)
        }
    }
};