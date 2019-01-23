import colors from "../../constants/colors";

const form = {
    label: {
        margin: 10,
        marginTop: 20,
        fontSize: 16,
        color: colors.GRAY,
    },
    inputText: {
        width: 350,
        borderColor: colors.GRAY,
        borderWidth: 0,
        borderBottomWidth: 1,
        margin: 10,
        padding: 10,
    },
    inputError: {
        borderColor: colors.RED,
    },
    textError:  {
        fontSize: 12,
        color: colors.RED,
        marginLeft: 20,
    },
    btnSubmit: {
        marginTop: 50,
        width: 250,
    },
};

export default form;