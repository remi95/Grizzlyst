import {GROUP} from "../constants/actions";

export const setCurrentGroup = (data) => {
    return {
        type: GROUP,
        data
    }
};