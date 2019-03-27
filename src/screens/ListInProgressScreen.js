import React, {Component} from 'react';
import { Container, Content, Text } from "native-base";
import AppHeader from "../components/AppHeader";
import {connect} from "react-redux";

class ListInProgressScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.listReducer)
    }

    render() {
        return (
            <Container>
                <AppHeader title={this.props.listReducer.list.name} navigation={ this.props.navigation } />
                <Content>
                    <Text>Liste en cours</Text>

                </Content>
            </Container>
        )
    }
}

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer
    }
};

export default connect(mapStateToProps, null)(ListInProgressScreen);