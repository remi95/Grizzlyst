import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProductList from "../components/list/ProductList";

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