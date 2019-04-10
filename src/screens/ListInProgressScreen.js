import React, {Component} from 'react';
import {Container, Content, Text, List, ListItem, Left, Right, Body, Footer, Button, Icon, Spinner} from "native-base";
import AppHeader from "../components/AppHeader";
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import Styles from "../styles/styles";
import NavigationService from "../services/NavigationService";
import GrizzlystClient from "../clients/GrizzlystClient";
import Loader from "../components/Loader";
import listStatus from "../constants/list";
import colors from "../constants/colors";

class ListInProgressScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            shop: [],
            listId: this.props.listReducer.list.id,
            isLoading: true,
            currentList: null
        }
    }

    willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        async payload => {
            await this.setState({listId: payload.state.params.listId});
            this.refreshList()
        }
    );

    async isCompleted() {
        await GrizzlystClient.changeListStatus(this.state.listId, listStatus.TERMINATED);
        return NavigationService.navigate('ListList');
    }

    async refreshList() {
        const list = await this.getInProgressList();
        const shop = await this.getCompletedList();
        const currentList = await GrizzlystClient.getList(this.state.listId);

        this.setState({
            list,
            shop,
            currentList: currentList.data,
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
            <ListItem key={el.product.id}>
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
            <View key={list.id}>
                <ListItem itemDivider>
                    <Text style={ styles.department }>{ list.name }</Text>
                </ListItem>

                { list.products.map( el => this.renderEl(el, true)) }
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return <Spinner color={colors.DARK_GREEN} />;
        }
        return (
            <Container>
                <AppHeader title={this.state.currentList.name} navigation={ this.props.navigation } />
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