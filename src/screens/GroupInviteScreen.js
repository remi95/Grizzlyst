import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Title} from "../components/Title";
import GroupInviteForm from "../forms/GroupInviteForm";

class GroupInviteScreen extends Component {

    render() {
        return (
            <View style={styles.screen}>
                <Title text={'Inviter des membres'} />
                <GroupInviteForm />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GroupInviteScreen;