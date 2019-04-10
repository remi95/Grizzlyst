import React, {Component} from 'react';
import ListCreateForm from "../forms/ListCreateForm";
import { Container, Content } from 'native-base';
import AppHeader from "../components/AppHeader";

class ListCreateScreen extends Component {

    render() {
        return (
            <Container>
                <AppHeader title="Créer une liste" navigation={ this.props.navigation } />
                <Content>
                    <ListCreateForm />
                </Content>
            </Container>
        )
    }
}

export default ListCreateScreen;
