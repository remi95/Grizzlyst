import React from 'react';
import {View, TextInput, Text, KeyboardAvoidingView} from 'react-native';
import { Button } from "native-base";
import Styles from "../styles/styles";

/**
 * Provides a simple form
 *
 * @param props
 *     Must contains:
 *          - form:
 *              - input array
 *              - button object
 *          - update: To update the form state (parent)
 *          - action: To validate the form
 *     The button must contain:
 *          - label
 *          - color
 *     An input must contain:
 *          - placeholder
 *          - name (use to send at server)
 *          - value (can be init to empty)
 *          - type, the react native TextInput type
 *     An input may contain:
 *          - validator, from FormValidator helper
 *          - params, to pass params for validator
 */
export const SimpleForm = (props) => {

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
    const validate = (validator, index, params = null) => {
        let inputs = props.form.inputs;
        let value = inputs[index].value;

        if (value.length > 0) {
            let isValid = validator(value, params);

            inputs[index].error = isValid.success ? null : isValid.message;

            props.update(inputs);
        }
    };

    /**
     * Update inputs value in the State.
     *
     * @param value
     *   Value of the input just changed.
     * @param index
     *   Index of the input in the array of inputs on the state.
     */
    const updateInputValue = (value, index) => {
        let inputs = props.form.inputs;
        inputs[index].value = value;

        props.update(inputs);
    };

    /**
     * Check that each input isn't empty and execute the props action.
     */
    const action = async () => {
        let inputs = props.form.inputs;
        let form = {};

        for (let i in inputs) {
            if (inputs[i].value.trim() === '') {
                inputs[i].error = 'Ce champ est requis.';

                return props.update(inputs);
            }

            form[inputs[i].name] = inputs[i].value;
        }

        props.form.button.action(form);
    };

    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            {
                props.form.inputs.map((input, i) =>
                    <View key={input.placeholder + i}>
                        <TextInput
                            style={[Styles.form.inputText, input.error ? Styles.form.inputError : null]}
                            placeholder={input.placeholder}
                            textContentType={input.type ? input.type : 'none'}
                            secureTextEntry={input.type && input.type === 'password'}
                            onChangeText={(text) => updateInputValue(text, i)}
                            onBlur={() => validate(input.validator, i, input.params ? input.params : null)}
                            value={input.value}
                        />
                        {
                            input.error
                                ? <Text
                                    style={Styles.form.textError}>{input.error}</Text>
                                : null
                        }
                    </View>
                )
            }
            <Button
                title={props.form.button.label}
                color={props.form.button.color}
                onPress={() => action()}
                block
            />
        </KeyboardAvoidingView>
    )
};