import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity, Animated, ListView} from 'react-native';
import {List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon} from 'native-base';
import ProductRow from "./ProductRow";
import colors from "../../constants/colors";
import {FontAwesome} from "@expo/vector-icons";
import {Font} from "expo";
import Styles from "../../styles/styles";
import NavigationService from "../../services/NavigationService";
import {NutrientGradePreview} from "./NutrientGradePreview";
import GrizzlystClient from "../../clients/GrizzlystClient";

class Accordion extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            isCollapsed: true,
            isIconLoaded: false,
            accordionHeight: new Animated.Value(0),
            department: {
                products: []
            },
        }
    }

    _keyExtractor = item => item.product.id.toString();

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
            departmentId: this.props.department.id,
        })
    };

    changeQuantity = async (quantity) => {
        let {listProduct} = this.props;
        let response = await GrizzlystClient.updateProduct(listProduct.listId, listProduct.productId, {quantity});

        if (response.status) {
            return this.setState({quantity});
        }

        //TODO: throw alert
    };

    deleteRow = async (secId, rowId, rowMap) => {
        let listProduct = this.state.department.products[rowId];
        let response = await GrizzlystClient.removeProduct(listProduct.listId, listProduct.departmentId, listProduct.product.id);

        if (response.status) {
            rowMap[`${secId}${rowId}`].props.closeRow();
            const newData = this.state.department;
            newData.products.splice(rowId, 1);
            this.setState({ department: newData });
        }
    };

    render () {
        let {department} = this.state;
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return (
            <View>
                {
                    department.id ?
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
                                    <Animated.View style={{height: this.state.accordionHeight}}>
                                        <List
                                            leftOpenValue={75}
                                            rightOpenValue={-75}
                                            dataSource={this.ds.cloneWithRows(department.products)}
                                            renderRow={listProduct =>
                                                <ListItem avatar key={listProduct.id}>
                                                    <Left>
                                                        <Thumbnail source={{uri: listProduct.product.image_url}}/>
                                                    </Left>
                                                    <Body>
                                                        <Text>{listProduct.product.name}</Text>
                                                        <Text
                                                            note>{listProduct.product.brand} - {listProduct.product.quantity}g</Text>
                                                    </Body>
                                                    <Right>
                                                        <NutrientGradePreview
                                                            grade={listProduct.product.nutrition_grade}/>
                                                    </Right>
                                                </ListItem>
                                            }
                                            renderLeftHiddenRow={data =>
                                                <Button full onPress={() => alert(data)}>
                                                    <Icon active name="information-circle"/>
                                                </Button>}
                                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                                <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap)}>
                                                    <Icon active name="trash"/>
                                                </Button>}
                                        />
                                    </Animated.View>

                                    : null
                            }
                        </View>

                        : null
                }
            </View>
        )
    }

    async componentDidMount() {
        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isIconLoaded: true, department: this.props.department})
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