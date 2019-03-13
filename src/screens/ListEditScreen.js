import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProductList from "../components/list/ProductList";
import {addProductToDepartment} from "../actions/listAction";
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
            <ScrollView style={styles.container}>
                <ProductList navigation={this.props.navigation} />
            </ScrollView>
        )
    }

    // willFocusSubscription = this.props.navigation.addListener(
    //     'willFocus',
    //     payload => {
    //         let params = payload.state.params;
    //         if (params !== undefined && 'departmentId' in params && 'product' in params) {
    //             this.props.addProductToDepartment(params.product, params.departmentId)
    //         }
    //     }
    // );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
    },
});

export default ListEditScreen;