import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Autocomplete from "react-native-autocomplete-input";
import ProductRow from "../components/element/ProductRow";
import OpenClient from "../clients/OpenFactClient";

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

    render() {
        let products = [
            {
                id: 1537,
                brand: 'Nestlé',
                name: 'Nesquik',
                weight: '250g',
                nutrient_grade: 'B',
                image: 'https://static.openfoodfacts.org/images/products/303/371/006/5066/front_fr.48.400.jpg',
                quantity: 2,
                favorite: false,
            },
            {
                id: 1557,
                brand: 'Ferrero',
                name: 'Nutella',
                weight: '750g',
                nutrient_grade: 'E',
                image: 'https://static.openfoodfacts.org/images/products/301/762/042/1006/front_fr.112.100.jpg',
                quantity: 1,
                favorite: false,
            },
        ];

        return (
            <View style={styles.autocomplete}>
                <Autocomplete
                    data={this.state.data}
                    onChangeText={this.updateQuery.bind(this)}
                    value={this.state.query}
                    renderItem={item => (<ProductRow product={item} />)}
                    listStyle={styles.results}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    autocomplete: {
        flex: 1,
        alignSelf: 'stretch',
    },
    results: {
        margin: 0,
    },
});

export default AutocompleteScreen;