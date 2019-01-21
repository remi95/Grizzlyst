import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Text, Button} from 'react-native';
import Styles from "../../styles/styles";
import colors from "../../constants/colors";
import InputButton from "./InputButton";
import FormValidator from "../../helpers/FormValidator";
import TextButton from "../Text/TextButton";

class CreateGroupForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputGroup: {
                placeholder: 'Nom du groupe',
                value: '',

            },
            inputEmail: {
                value: '',
                error: null,
            },
            emails: [],
        }
    }

    updateValue = (input, value) => {
        this.setState(prevState => ({
            [input]: { ...prevState[input], value }
        }));
    };

    addEmail = () => {
        let email = this.state.inputEmail.value.trim();

        if (this.state.emails.includes(email)) {
            this.setState(prevState => ({
                inputEmail: {
                    ...prevState.inputEmail,
                    error: 'Vous avez déjà ajouté ce membre'
                }
            }));

            return;
        }

        let currentEmails = this.state.emails;
        currentEmails.push(email);

        this.setState({ emails: currentEmails });
    };

    removeEmail = (email) => {
        let emails = this.state.emails;

        if (emails.includes(email)) {
            emails = emails.filter(element => element !== email);
            this.setState({emails})
        }
    };

    create = () => {

    };

    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    style={Styles.form.inputText}
                    placeholder={'Nom du groupe'}
                />

                <View style={styles.emails}>
                    {
                        this.state.emails.map(email =>
                            <TextButton
                                key={email}
                                style={styles.email}
                                text={email}
                                icon={'close'}
                                color={colors.GRAY}
                                action={this.removeEmail.bind(this, email)}
                            />
                        )
                    }
                </View>

                <InputButton
                    placeholder={'Inviter des membres'}
                    type={'emailAddress'}
                    value={this.state.inputEmail.value}
                    icon={'plus-circle'}
                    color={colors.BLUE}
                    error={this.state.inputEmail.error}
                    action={this.addEmail}
                    onChange={this.updateValue.bind(this, 'inputEmail')}
                    validation={FormValidator.emailValidate}
                />

                <Button
                    style={Styles.form.btnSubmit}
                    title={'Valider'}
                    color={colors.BLUE}
                    onPress={this.create}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    emails: {
        margin: 15,
    },
    email: {
        color: colors.GRAY,
    },
});

export default CreateGroupForm;