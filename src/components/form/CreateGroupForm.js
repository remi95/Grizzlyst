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
            inputMember: {
                value: '',
                error: null,
            },
            members: [],
        }
    }

    updateValue = (input, value) => {
        this.setState(prevState => ({
            [input]: { ...prevState[input], value }
        }))
    };

    addMember = () => {
        let member = this.state.inputMember.value.trim();

        if (this.state.members.includes(member)) {
            this.setState(prevState => ({
                inputMember: {
                    ...prevState.inputMember,
                    error: 'Vous avez déjà ajouté ce membre'
                }
            }));

            return;
        }

        let currentMembers = this.state.members;
        currentMembers.push(member);

        this.setState({ members: currentMembers });
    };

    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    style={Styles.form.inputText}
                    placeholder={'Nom du groupe'}
                />

                {
                    this.state.members.map(member =>
                        <Text key={member}>{member}</Text>
                    )
                }

                <InputButton
                    placeholder={'Inviter des membres'}
                    type={'emailAddress'}
                    value={this.state.inputMember.value}
                    icon={'plus-circle'}
                    color={colors.BLUE}
                    error={this.state.inputMember.error}
                    action={this.addMember}
                    onChange={this.updateValue.bind(this, 'inputMember')}
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
});

export default CreateGroupForm;