import React, {Component} from 'react';
import {Container, Content, Text, List, ListItem, Left, Right, Body, Footer, Button, Icon} from "native-base";
import AppHeader from "../components/AppHeader";
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import Styles from "../styles/styles";
import NavigationService from "../services/NavigationService";
import GrizzlystClient from "../clients/GrizzlystClient";
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
        await this.refreshList();
    }

    async isCompleted() {
        await GrizzlystClient.put(`lists/${this.state.listId}`, {
            state: 2
        });
        return NavigationService.navigate('ListList');
    }

    async refreshList() {
        const list = await this.getInProgressList();
        const shop = await this.getCompletedList();

        this.setState({
            list,
            shop,
            isLoading: false
        });
    }

    async addToCard(id) {
        await GrizzlystClient.put(`lists/${this.state.listId}/product/${id}`, {
            state: 1
        });
        await this.refreshList();
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

    renderEl(el, isInProgress=false) {
        return (
            <ListItem>
                <Left>
                    <Text>{el.quantity}</Text>
                    <Body>
                    <Text>{el.product.name}</Text>
                    </Body>
                </Left>
               {
                   isInProgress
                   ?
                       <Right>
                           <Button small onPress={ () => this.addToCard(el.product.id) }>
                               <Icon type="FontAwesome" name="shopping-cart" />
                           </Button>
                       </Right>
                   :
                       null
               }
            </ListItem>
        )
    }

    renderList(list) {
        return (
            <View>
                <ListItem itemDivider>
                    <Text style={ styles.department }>{ list.name }</Text>
                </ListItem>

                { list.products.map( el => this.renderEl(el, true)) }
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
                        <ListItem itemDivider noIndent style={ styles.shop }>
                            <Left>
                                <Icon type="FontAwesome" name="shopping-cart" />
                                <Body><Text>Panier</Text></Body>
                            </Left>
                        </ListItem>

                        { this.state.shop.map( el => this.renderEl(el)) }
                    </List>
                </Content>
                <Footer>
                    <Button full style={ Styles.button.fixedBottom } onPress={ () => this.isCompleted() }>
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
    },
    shop: {
        backgroundColor: "#cde1f9",
    }
});

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer
    }
};

export default connect(mapStateToProps, null)(ListInProgressScreen);