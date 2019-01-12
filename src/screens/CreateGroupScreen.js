import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Title} from "../components/Title";
import CreateGroupForm from "../components/form/CreateGroupForm";

class CreateGroupScreen extends Component {

    render() {
        return (
            <View style={styles.screen}>
                <Title text={'Créer un groupe'} />
                <CreateGroupForm />
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

export default CreateGroupScreen;