import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity, Animated} from 'react-native';
import ProductRow from "./ProductRow";
import colors from "../../constants/colors";
import {FontAwesome} from "@expo/vector-icons";
import {Font} from "expo";
import Styles from "../../styles/styles";
import NavigationService from "../../services/NavigationService";
import {connect} from "react-redux";
import {addProductToDepartment} from "../../actions/listAction";

class Accordion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: true,
            isIconLoaded: false,
            accordionHeight: new Animated.Value(0),
        }
    }

    _keyExtractor = item => item.id.toString();

    gotoDetailProduct = (id) => {
        // TODO: redirect to product detail page.
    };

    switchCollapse = () => {


        Animated.timing(
            this.state.accordionHeight, {
                toValue: this.state.isCollapsed ? this.props.department.products.length * 75 : 0,
                duration: 250,
            }
        ).start();

        this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))
    };

    startAutocomplete = () => {
        NavigationService.navigate('Autocomplete', {
            departmentId: this.props.products[0].departmentId,
        })
    };

    render () {
        let {department} = this.props;

        return (
            <View>
                <TouchableHighlight onPress={this.switchCollapse}>
                    <View style={styles.department}>
                        <View style={Styles.position.flex.rowBetween}>
                            <Text style={styles.name}>{ department.name }</Text>
                            <Text style={styles.quantity}> - { department.products.length }</Text>
                        </View>

                        {
                            this.state.isIconLoaded
                                ?   <TouchableOpacity onPress={this.startAutocomplete} >
                                        <FontAwesome
                                            name={'plus'}
                                            size={24}
                                            color={colors.DARK_GRAY}
                                        />
                                    </TouchableOpacity>
                                :null
                        }
                    </View>
                </TouchableHighlight>

                {
                    department.products.length > 0 && department.products[0].id !== null ?
                        //<Collapsible collapsed={this.state.isCollapsed}>
                        <Animated.View style={{height: this.state.accordionHeight}}>
                            <FlatList
                                data={department.products}
                                keyExtractor={this._keyExtractor}
                                renderItem={ ({item}) =>
                                    <ProductRow
                                        listProduct={item}
                                        favorite={true}
                                        delete={true}
                                        quantity={true}
                                    />
                                }
                                onPressItem={this.gotoDetailProduct}
                            />
                        </Animated.View>

                        //</Collapsible>
                        //
                        // // TODO: Utiliser un component Native Base
                        // products.map(product =>
                        //     <Text>{product.name}</Text>
                        // )
                        : null
                }
            </View>
        )
    }

    async componentDidMount() {
        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isIconLoaded: true})
        } catch {
            console.log('ERROR WHILE LOADING ICONS...')
        }
    }
}

const styles = StyleSheet.create({
    department: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.LIGHT_GRAY,
    },
    name: {
        fontSize: 16,
    },
    quantity: {
        fontSize: 14,
        color: colors.GRAY
    },
});

export default Accordion;