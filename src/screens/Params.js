import React from "react";
import {Container, Content, List, ListItem, Text} from "native-base";
import AppHeader from "../components/AppHeader";

export default class Params extends React.Component {
    render() {
        return (
            <Container>
                <AppHeader title="Paramètres" navigation={ this.props.navigation } />
                <Text>Route des paramètres</Text>
            </Container>
        );
    }
}