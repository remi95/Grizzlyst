import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Title} from "../components/Title";
import GroupCreateForm from "../forms/GroupCreateForm";

class GroupCreateScreen extends Component {

    render() {
        return (
            <View style={styles.screen}>
                <Title text={'Créer un groupe'} />
                <GroupCreateForm />
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

export default GroupCreateScreen;