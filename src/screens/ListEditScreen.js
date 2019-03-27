import React, {Component} from 'react';
import ProductList from "../components/list/ProductList";
import NavigationService from "../services/NavigationService";
import {Container, Content, Footer, Text, Button} from "native-base";
import AppHeader from "../components/AppHeader";
import Styles from "../styles/styles";
import {connect} from "react-redux";

class ListEditScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            needUpdate: false,
        }
    }

    render() {
        return (
            <Container>
                <AppHeader title="List " navigation={ this.props.navigation } />
                <Content>
                    <ProductList navigation={this.props.navigation} />
                </Content>
                <Footer>
                    <Button full style={ Styles.button.fixedBottom } onPress={ () => NavigationService.navigate('ListInProgress') }>
                        <Text>Commencer les courses</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return { userReducer }
};

export default connect(mapStateToProps, null)(ListEditScreen);