import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Autocomplete from "react-native-autocomplete-input";
import ProductRow from "../components/element/ProductRow";
import OpenClient from "../clients/OpenFactClient";
import Styles from "../styles/styles";
import GrizzlystClient from "../clients/GrizzlystClient";
import NavigationService from "../services/NavigationService";
import {connect} from "react-redux";
import {addProductToDepartment} from "../actions/listAction";
import AppHeader from "../components/AppHeader";

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
            departmentId: null,
        };

        this.timeout = null;
    }

    updateQuery = (query) => {
        this.setState({query});

        clearTimeout(this.timeout);

        this.timeout = setTimeout(async () => {
            this.getData(query);
        }, 300);
    };

    getData = async (query) => {
        let search = await OpenClient.search(query);

        if (search.status) {
            let products = OpenClient.normalizeProductPreview(search.data.products);
            this.setState({data: products});
        }
    };

    addProduct = async (item) => {
       let response = await GrizzlystClient.addProduct(
           this.props.listReducer.list.id,
           this.state.departmentId,
           {
               _id: item.code,
               quantity: 1,
           }
       );

       if (response.status) {
           this.props.addProductToDepartment(response.data.product, this.state.departmentId)
       }

       NavigationService.navigate('EditList');
    };

    updateProduct = (product) => {
        let data = this.state.data;

        for (let i in data) {
            if (data[i].code === product.code) {
                data[i] = product;
                this.setState({data})
            }
        }
    };

    _renderItem = (item) => (
        <View style={styles.row}>
            <ProductRow listProduct={item} style={styles.product} updateProduct={this.updateProduct} />
            <Button title={'+'} onPress={() => this.addProduct(item.product)} style={styles.button} />
        </View>
    );

    render() {
        return (
            <View style={Styles.position.size.fullWidth}>
                <AppHeader title="Rechercher un produit" navigation={ this.props.navigation } />
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

        this.setState({departmentId: this.props.navigation.getParam('departmentId')})
    }
}

const styles = StyleSheet.create({
    results: {
        margin: 0,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    product: {
        flex: 3,
    },
    button: {
        flex: 2,
    },
});

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProductToDepartment: (product, departmentId) => dispatch(addProductToDepartment(product, departmentId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteScreen);