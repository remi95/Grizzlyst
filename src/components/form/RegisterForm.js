import React, {Component} from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import colors from "../../constants/colors";
import styles from "../../styles/styles";
import FormValidator from "../../helpers/FormValidator";

class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                inputs: [
                    {
                        placeholder: 'Prénom',
                        value: '',
                        type: 'givenName',
                        validator: FormValidator.minLengthValidate,
                        params: 2,
                    },
                    {
                        placeholder: 'Nom',
                        value: '',
                        type: 'familyName',
                        validator: FormValidator.minLengthValidate,
                        params: 2,
                    },
                    {
                        placeholder: 'Pseudo',
                        value: '',
                        type: 'username',
                        validator: FormValidator.minLengthValidate,
                        params: 2,
                    },
                    {
                        placeholder: 'Email',
                        value: '',
                        type: 'emailAddress',
                        validator: FormValidator.emailValidate,
                    },
                    {
                        placeholder: 'Mot de passe',
                        value: '',
                        type: 'password',
                        validator: FormValidator.minLengthValidate,
                        params: 6,
                    },
                ],
                button: {
                    label: 'S\'inscrire',
                    color: colors.BLUE,
                },
            },
        }
    }

    /**
     * Update inputs value in the State.
     *
     * @param value
     *   Value of the input just changed.
     * @param index
     *   Index of the input in the array of inputs on the state.
     */
    updateInputValue = (value, index) => {
        let inputs = this.state.form.inputs;
        inputs[index].value = value;

        this.setState(prevState => ({
            form: {...prevState.form, inputs}
        }))
    };

    /**
     * Validate field and throw error if necessary.
     *
     * @param validator
     *   The validator method to execute on the field value.
     * @param index
     *   Index of the input on inputs state.
     * @param params
     *   Optional params for the validator method.
     */
    validate = (validator, index, params = null) => {
        let inputs = this.state.form.inputs;
        let value = inputs[index].value;

        if (value.length > 0) {
            let isValid = validator(value, params);

            inputs[index].error = isValid.success ? null : isValid.message;

            this.setState(prevState => ({
                form: {...prevState.form, inputs}
            }))
        }
    };

    render() {
        return (
            <View>
                {
                    this.state.form.inputs.map((input, i) =>
                        <View key={input.placeholder + i}>
                            <TextInput
                                style={[styles.form.inputText, input.error ? styles.form.inputError : null]}
                                placeholder={input.placeholder}
                                textContentType={input.type ? input.type : 'none'}
                                secureTextEntry={input.type && input.type === 'password'}
                                onChangeText={(text) => this.updateInputValue(text, i)}
                                onBlur={() => this.validate(input.validator, i, input.params ? input.params : null)}
                                value={input.value}
                            />
                            {
                                input.error
                                    ? <Text
                                        style={styles.form.textError}>{input.error}</Text>
                                    : null
                            }
                        </View>
                    )
                }
                <View>
                    <Button
                        style={styles.form.btnSubmit}
                        title={this.state.form.button.label}
                        color={this.state.form.button.color}
                        onPress={this.state.form.button.action}
                    />
                </View>
            </View>
        )
    }
}

export default RegisterForm;