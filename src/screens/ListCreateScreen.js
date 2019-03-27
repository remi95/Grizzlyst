import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Title} from "../components/Title";
import ListCreateForm from "../forms/ListCreateForm";
import AppHeader from "../components/AppHeader";

class ListCreateScreen extends Component {

    render() {
        return (
            <ScrollView>
                <AppHeader title="Créer une liste" navigation={ this.props.navigation } />
                <Title text={'Créer une liste'} />
                <ListCreateForm />
            </ScrollView>
        )
    }
}

export default ListCreateScreen;