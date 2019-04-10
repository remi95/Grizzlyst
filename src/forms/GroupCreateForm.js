import React, {Component} from 'react';
import {Button, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Styles from "../styles/styles";
import colors from "../constants/colors";
import FormValidator from "../helpers/FormValidator";
import TextList from "../components/list/TextList";
import GrizzlystClient from "../clients/GrizzlystClient";
import NavigationService from "../services/NavigationService";
import {connect} from "react-redux";
import {setCurrentGroup} from "../actions/groupAction";

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
            await this.props.setCurrentGroup(response.data);
            NavigationService.navigate('ListList', {groupId: response.data.id});
        }
        else {
            //TODO: throw alert
        }
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.form.container}>
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
            </KeyboardAvoidingView>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentGroup: (data) => dispatch(setCurrentGroup(data)),
    }
};

export default  connect(null, mapDispatchToProps)(GroupCreateForm);