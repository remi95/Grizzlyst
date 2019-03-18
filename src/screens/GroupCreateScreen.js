import React, {Component} from 'react';
import {Title} from "../components/Title";
import GroupCreateForm from "../forms/GroupCreateForm";
import AppHeader from "../components/AppHeader";
import { Container } from "native-base";

class GroupCreateScreen extends Component {

    render() {
        return (
            <Container>
                <AppHeader title="Créer un group" navigation={ this.props.navigation } />
                <Title text={'Créer un groupe'} />
                <GroupCreateForm />
            </Container>
        )
    }
}

export default GroupCreateScreen;