import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Title} from "../components/Title";
import ListCreateForm from "../forms/ListCreateForm";

class ListCreateScreen extends Component {

    render() {
        return (
            <View>
                <Title text={'Créer une liste'} />
                <ListCreateForm />
            </View>
        )
    }
}

export default ListCreateScreen;