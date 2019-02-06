import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Title} from "../components/Title";
import ListCreateForm from "../forms/ListCreateForm";

class ListCreateScreen extends Component {

    render() {
        return (
            <ScrollView>
                <Title text={'Créer une liste'} />
                <ListCreateForm />
            </ScrollView>
        )
    }
}

export default ListCreateScreen;