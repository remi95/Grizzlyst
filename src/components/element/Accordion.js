import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ProductRow from "./ProductRow";
import colors from "../../constants/colors";
import {FontAwesome} from "@expo/vector-icons";
import {Font} from "expo";
import Styles from "../../styles/styles";


class Accordion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: false,
            isIconLoaded: false,
        }
    }

    _keyExtractor = (item, index) => item.id.toString();

    gotoDetailProduct = (id) => {
        // TODO: redirect to product detail page.
    };

    switchCollapse = () => {
        this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }))
    };

    startAutocomplete = () => {

    };

    render () {
        let {department} = this.props;

        return (
            <View>
                <TouchableHighlight onPress={this.switchCollapse}>
                    <View style={styles.department}>
                        <View style={Styles.position.flex.rowBetween}>
                            <Text style={styles.name}>{ department.name }</Text>
                            <Text style={styles.quantity}>  - { department.products.length }</Text>
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