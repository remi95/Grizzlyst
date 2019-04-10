import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Title} from "../components/Title";
import GroupInviteForm from "../forms/GroupInviteForm";
import AppHeader from "../components/AppHeader";

class GroupInviteScreen extends Component {

    render() {
        return (
            <View style={styles.screen}>
                <AppHeader title="Inviter des membres" navigation={ this.props.navigation } />
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