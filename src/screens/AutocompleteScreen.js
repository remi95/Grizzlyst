import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Autocomplete from "react-native-autocomplete-input";
import OpenClient from "../clients/OpenFactClient";
import Styles from "../styles/styles";
import GrizzlystClient from "../clients/GrizzlystClient";
import NavigationService from "../services/NavigationService";
import {connect} from "react-redux";
import {addProductToDepartment} from "../actions/listAction";
import AppHeader from "../components/AppHeader";
import {Body, Left, ListItem, Right, Text, Thumbnail, Icon} from "native-base";
import {NutrientGradePreview} from "../components/element/NutrientGradePreview";
import colors from "../constants/colors";

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
        const listId = this.props.navigation.getParam('listId');

        let response = await GrizzlystClient.addProduct(
            listId,
            this.state.departmentId,
            {
                _id: item.code,
                quantity: 1,
            }
        );

        if (response.status) {
            this.props.addProductToDepartment(response.data.product, this.state.departmentId)
        }

        NavigationService.navigate('EditList', {listId});
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
        <ListItem avatar key={item.id} style={styles.listItem}>
            <Left>
                <Thumbnail source={{uri: item.product.image_url}} style={styles.image}/>
            </Left>
            <Body>
                <Text>{item.product.name}</Text>
                <Text
                    note>{item.product.brand} - {item.product.quantity}</Text>
            </Body>
            <Right>
                <NutrientGradePreview
                    grade={item.product.nutrition_grade}/>
            </Right>
            <Right>
                <Button title={'+'} onPress={() => this.addProduct(item.product)} style={styles.button}/>
            </Right>
        </ListItem>
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

    willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
            this.setState({departmentId: this.props.navigation.getParam('departmentId')})
        }
    );
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
        width: 35,
        height: 31,
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: colors.BLUE,
    },
    image: {
        height: 45,
        width: 45,
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