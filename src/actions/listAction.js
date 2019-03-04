import {LIST} from "../constants/actions";

export const setCurrentList = (data) => {
    return {
        type: LIST,
        data
    }
};