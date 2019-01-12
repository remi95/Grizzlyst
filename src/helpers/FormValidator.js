/**
 * Class containing methods to check form's values.
 */
class FormValidator {

    /**
     * Check if email has an email pattern.
     *
     * @param email
     *   Email to check.
     *
     * @returns Object {{success: boolean, message: string}}
     */
    emailValidate = (email) => {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        var isValid = emailRegex.test(email);

        return {
            success: isValid,
            message: isValid ? '' : 'Cet email semble incorrect',
        }
    };

    /**
     * Check if a string is longer than the minLength.
     *
     * @param string
     *   The string to check the length.
     * @param minLength
     *   The minimal length waiting for.
     *
     * @returns Object {{success: boolean, message: string}}
     */
    minLengthValidate = (string, minLength) => {
        var isValid = string.length >= minLength;

        return {
            success: isValid,
            message: isValid ? '' : 'Ce champ doit faire au moins ' + minLength + ' caractères',
        }
    };
}

const Validator = new FormValidator();

export default Validator;