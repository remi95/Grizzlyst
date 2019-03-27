import React, {Component} from 'react';
import { Container, Content } from "native-base";
import AppHeader from "../components/AppHeader";

class ListInProgressScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <AppHeader title="Liste en cours" navigation={ this.props.navigation } />
                <Content>
                    <Text>Liste en cours</Text>
                </Content>
            </Container>
        )
    }
}

export default ListInProgressScreen;