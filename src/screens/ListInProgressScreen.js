import React, {Component} from 'react';
import {Container, Content, Text, CheckBox, List, ListItem, Left, Right, Body, Footer, Button, Root, Icon} from "native-base";
import AppHeader from "../components/AppHeader";
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import Styles from "../styles/styles";
import NavigationService from "../services/NavigationService";
import GrizzlystClient from "../clients/GrizzlystClient";
import LoadingScreen from "./LoadingScreen";
import Loader from "../components/Loader";

class ListInProgressScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            shop: [],
            listId: this.props.listReducer.list.id,
            isLoading: true
        }
    }

    async componentDidMount() {
        const list = await this.getInProgressList();
        const shop = await this.getCompletedList();

        this.setState({
            list,
            shop,
            isLoading: false
        });

    }

    async getInProgressList() {
        const { data } = await GrizzlystClient.get(`lists/${this.state.listId}/departments/products/progress`);
        let list = [];

        for (let i in data) {
            if (data[i].products.length) {
                list.push(data[i])
            }
        }
        return list;
    }

    async getCompletedList() {
        const { data } = await GrizzlystClient.get(`lists/${this.state.listId}/departments/products/completed`);
        return data;
    }

    renderEl(el) {
        return (
            <ListItem>
                <Left>
                    <Text>{el.quantity}</Text>
                    <Body>
                    <Text>{el.product.name}</Text>
                    </Body>
                </Left>
            </ListItem>
        )
    }

    renderList(list) {
        return (
            <View>
                <ListItem itemDivider>
                    <Text style={ styles.department }>{ list.name }</Text>
                </ListItem>

                { list.products.map( el => this.renderEl(el)) }
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />;
        }
        return (
            <Container>
                <AppHeader title={this.props.listReducer.list.name} navigation={ this.props.navigation } />
                <Content padder>
                    <List>
                        { this.state.list.map( list => this.renderList(list) ) }
                    </List>

                    <List>
                        <ListItem itemDivider>
                            <Body>
                            <Text>Panier</Text>
                            </Body>
                        </ListItem>

                        { this.state.shop.map( el => this.renderEl(el)) }
                    </List>
                </Content>
                <Footer>
                    <Button full style={ Styles.button.fixedBottom } onPress={ () => null }>
                        <Text>Terminer</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    department: {
        textTransform: 'capitalize'
    }
});

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer
    }
};

export default connect(mapStateToProps, null)(ListInProgressScreen);