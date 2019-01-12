class FormValidator {

    emailValidate = (email) => {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        var isValid = emailRegex.test(email);

        return {
            success: isValid,
            message: isValid ? '' : 'Cet email semble incorrect.',
        }
    };

    minLengthValidate = (string, minLength) => {
        var isValid = string.length >= minLength;

        return {
            success: isValid,
            message: isValid ? '' : 'Ce champ doit faire au moins ' + minLength + ' caractères.',
        }
    };
}

const Validator = new FormValidator();

export default Validator;