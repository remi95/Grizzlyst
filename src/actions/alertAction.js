import {SET_ALERT} from "../constants/actions";

/**
 * Set new alert
 *
 * @param data
 *   Javascript object, must contains:
 *     - message:   The message alert.
 *     - type:      A constant from colors.js (SUCCESS, INFO, WARNING, DANGER...)
 *
 * @returns {{data: *, type: string}}
 */
export const setAlert = (data) => {
    return {
        type: SET_ALERT,
        data
    }

};