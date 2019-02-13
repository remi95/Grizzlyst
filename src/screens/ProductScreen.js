import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import OpenClient from "../clients/OpenFactClient";

class ProductScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: null,
        }
    }

    render() {
        return (
            <View>

            </View>
        )
    }

    componentDidMount() {
        OpenClient.getProduct(this.props.code);
    }
}

export default ProductScreen;