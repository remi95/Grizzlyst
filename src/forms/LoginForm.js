import React, {Component} from 'react';
import colors from "../constants/colors";
import FormValidator from "../helpers/FormValidator";
import {SimpleForm} from "./SimpleForm";
import {loginAction} from "../actions/userAction";
import {connect} from "react-redux";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                inputs: [
                    {
                        placeholder: 'Email',
                        name: 'email',
                        value: '',
                        type: 'emailAddress',
                        validator: FormValidator.emailValidate,
                        params: 2,
                    },
                    {
                        placeholder: 'Mot de passe',
                        name: 'password',
                        value: '',
                        type: 'password',
                        validator: FormValidator.minLengthValidate,
                        params: 6,
                    },
                ],
                button: {
                    label: 'Connexion',
                    color: colors.GREEN,
                    action: null,
                },
            },
        }
    }

    updateForm = (inputs) => {
        this.setState(prevState => ({
            form: {...prevState.form, inputs}
        }))
    };

    render() {
        return (
            <SimpleForm
                form={this.state.form}
                update={this.updateForm}
                action={this.props.login} />
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return { userReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(loginAction(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);