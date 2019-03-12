import React, {Component} from 'react';
import colors from "../constants/colors";
import FormValidator from "../helpers/FormValidator";
import {connect} from "react-redux";
import {auth} from '../actions/userAction'
import {SimpleForm} from "./SimpleForm";

class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                inputs: [
                    {
                        placeholder: 'Prénom',
                        name: 'firstname',
                        value: '',
                        type: 'givenName',
                        validator: FormValidator.minLengthValidate,
                        params: 2,
                    },
                    {
                        placeholder: 'Nom',
                        name: 'name',
                        value: '',
                        type: 'familyName',
                        validator: FormValidator.minLengthValidate,
                        params: 2,
                    },
                    {
                        placeholder: 'Pseudo',
                        name: 'pseudo',
                        value: '',
                        type: 'username',
                        validator: FormValidator.minLengthValidate,
                        params: 2,
                    },
                    {
                        placeholder: 'Email',
                        name: 'email',
                        value: '',
                        type: 'emailAddress',
                        validator: FormValidator.emailValidate,
                    },
                    {
                        placeholder: 'Mot de passe',
                        name: 'password',
                        value: '',
                        type: 'password',
                        validator: FormValidator.minLengthValidate,
                        params: 6,
                    },
                    {
                        placeholder: 'Confirmer le mot de passe',
                        name: 'confirmPassword',
                        value: '',
                        type: 'password',
                        validator: FormValidator.minLengthValidate,
                        params: 6,
                    },
                ],
                button: {
                    label: 'S\'inscrire',
                    color: colors.BLUE,
                    action: this.props.register,
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
                update={this.updateForm} />
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return {
        userReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (data) => dispatch(auth(data, true)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);