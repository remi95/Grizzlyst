import React, {Component} from 'react';
import {Title} from "../components/Title";
import GroupCreateForm from "../forms/GroupCreateForm";
import AppHeader from "../components/AppHeader";
import { Container } from "native-base";

class GroupCreateScreen extends Component {

    render() {
        return (
            <Container>
                <AppHeader title="Créer un groupe" navigation={ this.props.navigation } />
                <GroupCreateForm />
            </Container>
        )
    }
}

export default GroupCreateScreen;