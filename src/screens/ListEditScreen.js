import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import ProductList from "../components/list/ProductList";
import NavigationService from "../services/NavigationService";
import {Content} from "native-base";

class ListEditScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            needUpdate: false,
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ProductList navigation={this.props.navigation} />
                <Button title="Commencer les courses" onPress={() => NavigationService.navigate('ListInProgress')} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },
});

export default ListEditScreen;