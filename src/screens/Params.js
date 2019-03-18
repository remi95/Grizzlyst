import React from "react";
import {Container, Content, Text} from "native-base";
import AppHeader from "../components/AppHeader";

export default class Params extends React.Component {
    render() {
        return (
            <Container>
                <AppHeader title="Paramètres" navigation={ this.props.navigation } />
                <Content>
                    <Text>Route des paramètres</Text>
                </Content>
            </Container>
        );
    }
}