import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import Styles from "../styles/styles";
import colors from "../constants/colors";
import FormValidator from "../helpers/FormValidator";
import TextList from "../components/list/TextList";
import GrizzlystClient from "../clients/GrizzlystClient";
import NavigationService from "../services/NavigationService";

class GroupCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            emails: [],
        };
    }

    updateValue = (value) => {
        this.setState({name: value});
    };

    updateEmails = (emails) => {
        this.setState({emails})
    };

    create = async () => {
        let response = await GrizzlystClient.post('groups', this.state);

        if (response.status) {
            NavigationService.navigate('ListList', {groupId: response.data.id});
        }
        else {
            //TODO: throw alert
        }
    };

    render() {
        return (
            <View style={styles.form.container}>
                <TextInput
                    style={Styles.form.inputText}
                    placeholder={'Nom du groupe'}
                    onChangeText={this.updateValue.bind(this)}
                />

                <TextList
                    type={'emailAddress'}
                    placeholder={'Inviter des membres'}
                    validation={FormValidator.emailValidate}
                    updateList={this.updateEmails}
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
});

export default GroupCreateForm;