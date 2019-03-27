import React, {Component} from 'react';
import {Container, Content, Text, CheckBox, List, ListItem, Left, Right, Body } from "native-base";
import AppHeader from "../components/AppHeader";
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";

class ListInProgressScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        const listProducts = this.props.listReducer.departments;
        let list = [];

        for (let i in listProducts) {
            if (listProducts[i].products.length) {
                list.push(listProducts[i])
            }
        }

        this.setState({
            list
        });

    }

    renderList(list) {
        return (
            <View>
                <ListItem itemDivider>
                    <Text style={ styles.department }>{ list.name }</Text>
                </ListItem>

                {
                    list.products.map( el =>
                        <ListItem>
                            <Left>
                                <Text>{el.quantity}</Text>
                                <Body>
                                    <Text>{el.product.name}</Text>
                                </Body>
                            </Left>
                            <Right>
                                <CheckBox checked={false} color="green"/>
                            </Right>
                        </ListItem>
                    )
                }

            </View>
        )
    }

    render() {
        return (
            <Container>
                <AppHeader title={this.props.listReducer.list.name} navigation={ this.props.navigation } />
                <Content padder>
                    <Content>
                        <List>
                            { this.state.list.map( list => this.renderList(list) ) }
                        </List>
                    </Content>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    department: {
        textTransform: 'capitalize'
    },
});

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer
    }
};

export default connect(mapStateToProps, null)(ListInProgressScreen);