import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Autocomplete from "react-native-autocomplete-input";
import ProductRow from "../components/element/ProductRow";
import OpenClient from "../clients/OpenFactClient";
import Styles from "../styles/styles";

/**
 * Display the autocomplete search screen.
 *
 * props:
 *   - departmentId
 *      The department id you want to add the product.
 */
class AutocompleteScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            data: [],
        };

        this.timeout = null;
    }

    updateQuery = (query) => {
        this.setState({query});

        clearTimeout(this.timeout);

        this.timeout = setTimeout(async () => {
            console.log('update')
            this.getData(query);
        }, 300);
    };

    getData = async (query) => {
        let search = await OpenClient.search(query);

        if (search.status) {
            let products = OpenClient.normalizeProductPreview(search.data.products)
            this.setState({data: products});
        }
    };

    addProduct = () => {

    };

    _renderItem = (item) => (
        <View style={styles.row}>
            <ProductRow product={item} />
            <Button title={'+'} onPress={this.addProduct} />
        </View>
    );

    render() {
        return (
            <View style={Styles.position.size.fullWidth}>
                <Autocomplete
                    data={this.state.data}
                    onChangeText={this.updateQuery.bind(this)}
                    value={this.state.query}
                    renderItem={this._renderItem}
                    listStyle={styles.results}
                />
            </View>
        )
    }

    componentDidMount() {
        if (!this.props.navigation.getParam('departmentId')) {
            this.props.navigation.goBack();
            // TODO: throw alert
        }
    }
}

const styles = StyleSheet.create({
    results: {
        margin: 0,
    },
});

export default AutocompleteScreen;