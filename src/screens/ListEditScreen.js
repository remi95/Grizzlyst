import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProductList from "../components/list/ProductList";

class ListEditScreen extends Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <ProductList />
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