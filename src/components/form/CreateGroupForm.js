import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Styles from "../../styles/styles";
import colors from "../../constants/colors";
import InputButton from "./InputButton";
import FormValidator from "../../helpers/FormValidator";

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

    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    style={Styles.form.inputText}
                    placeholder={'Nom du groupe'}
                />

                <View style={styles.emails}>
                    {
                        this.state.emails.map(emails =>
                            <Text
                                key={emails}
                                style={styles.email}
                            >
                                {emails}
                            </Text>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'column',
    },
    emails: {
        margin: 15,
        marginLeft: 25,
    },
    email: {
        color: colors.GRAY,
    },
});

export default CreateGroupForm;