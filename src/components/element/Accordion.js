import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableHighlight} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ProductRow from "./ProductRow";
import colors from "../../constants/colors";


class Accordion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: false,
        }
    }

    _keyExtractor = (item, index) => item.id.toString();

    gotoDetailProduct = (id) => {
        // TODO: redirect to product detail page.
    };

    switchCollapse = () => {
        this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))
    };

    render () {
        let {department} = this.props;

        return (
            <View>
                <TouchableHighlight onPress={this.switchCollapse}>
                    <View style={styles.department}>
                        <Text style={styles.name}>{ department.name }</Text>
                        <Text style={styles.quantity}>  - { department.products.length }</Text>
                    </View>
                </TouchableHighlight>

                <Collapsible collapsed={this.state.isCollapsed}>
                    <FlatList
                        data={department.products}
                        keyExtractor={this._keyExtractor}
                        renderItem={ ({item}) => <ProductRow product={item} /> }
                        onPressItem={this.gotoDetailProduct}
                    />
                </Collapsible>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    department: {
        alignSelf: 'stretch',
        flexDirection: 'row',
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