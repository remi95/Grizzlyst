import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Styles from "../styles/styles";
import colors from "../constants/colors";
import FormValidator from "../helpers/FormValidator";
import TextList from "../components/list/TextList";

class GroupInviteForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emails: [],
        }
    }

    updateEmails = (emails) => {
        this.setState({emails})
    };

    invite = () => {

    };

    render() {
        return (
            <View style={styles.form}>
                <TextList
                    type={'emailAddress'}
                    placeholder={'Inviter des membres'}
                    validation={FormValidator.emailValidate}
                    updateList={this.updateEmails}
                />

                <Button
                    style={Styles.form.btnSubmit}
                    title={'Inviter'}
                    color={colors.BLUE}
                    onPress={this.invite}
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

export default GroupInviteForm;