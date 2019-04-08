import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, CheckBox} from 'react-native';
import { Picker, Button, Icon } from "native-base";
import {NutrientGradePreview} from "./NutrientGradePreview";
import colors from "../../constants/colors";
import {Font} from "expo";
import {FontAwesome} from "@expo/vector-icons";
import GrizzlystClient from "../../clients/GrizzlystClient";
import {connect} from "react-redux";
import {removeProductFromDepartment} from "../../actions/listAction";

/**
 * Display a product as row. Ideal for product preview in list.
 *
 * Required props:
 *   - product:
 *      - image_url     string
 *      - name          string
 *      - brand         string
 *      - weight        int
 *
 * You can pass optional props which display or not some actions/icons.
 *
 * Optional props:
 *   - product.nutrition_grade      string
 *   - product.favorite             bool
 *   - delete                       bool
 *   - selectable                   bool
 *   - quantity                     int
 *   - updateProduct                callback
 *      If you want to update product on parent.
 */
class ProductRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isIconLoaded: false,
            quantity: 1,
            isFavorite: false,
        }
    }

    switchFavorite = () => {
        // TODO: Send request to node server with product.id
    };

    switchProduct = () => {
        // TODO: Enable or Disable product
    };



    removeProduct = async () => {
        let {listProduct} = this.props;
        let response = await GrizzlystClient.removeProduct(listProduct.listId, listProduct.departmentId, listProduct.product.id);

        if (response.status) {
            this.props.removeProduct(listProduct.product.id);
            return this.props.removeProductFromDepartment(listProduct.product.id, listProduct.departmentId);
        }

        //TODO: throw alert
    };

    render() {
        let {listProduct} = this.props;
        let {product} = this.props.listProduct;

        return (
            <View style={styles.row}>
                <View style={styles.basicInformations}>
                    <View style={styles.iconContainer}>
                        <Image source={{uri: product.image_url}} style={styles.icon}/>
                    </View>

                    <View>
                        <Text style={styles.title}>
                            {product.name.substring(0, 25)}
                            {product.name.length > 25 ? '...' : ''}
                        </Text>
                        <Text style={styles.brand}>{product.brand}</Text>
                        <Text style={styles.description}>{product.quantity} { typeof product.quantity === "number" ? 'g' : ''}</Text>
                    </View>
                </View>

                <View style={styles.action}>
                    {
                        product.nutrition_grade
                            ?   <NutrientGradePreview style={styles.nutrient} grade={product.nutrition_grade}/>
                            :   null
                    }

                    {
                        this.props.favorite && this.state.isIconLoaded
                            ?   <FontAwesome
                                name={product.favorite ? 'star' : 'star-o'}
                                size={24}
                                color={colors.YELLOW}
                                onClick={this.switchFavorite}
                            />
                            :   null
                    }

                    {
                        this.props.delete && this.state.isIconLoaded
                            // ?   <FontAwesome
                            //     name={'trash-o'}
                            //     size={24}
                            //     color={colors.RED}
                            //     onClick={this.removeProduct}
                            // />
                            ? <Button iconLeft danger bordered onPress={this.removeProduct}>
                                <Icon name={'trash'} />
                            </Button>
                            :   null
                    }

                    {
                        this.props.selectable
                            ?   <CheckBox
                                value={product.enable}
                                onChange={this.switchProduct}
                            />
                            :   null
                    }

                    {
                        this.state.quantity
                            ?   <Picker
                                    mode={'dropdown'}
                                    selectedValue={this.state.quantity.toString()}
                                    onValueChange={(value) => this.changeQuantity(value)}
                                    style={styles.quantity}
                                >
                                    {
                                        Array(11).fill(1).map((value, index) =>
                                            <Picker.Item key={index} label={index.toString()} value={index.toString()} />
                                        )
                                    }
                                </Picker>
                            :   null
                    }

                </View>
            </View>
        )
    }

    async componentDidMount() {
        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isIconLoaded: true, quantity: this.props.listProduct.quantity})
        } catch {
            console.log('ERROR WHILE LOADING ICONS...')
        }
    }
}


const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 75,
        borderBottomWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        padding: 10,
    },
    basicInformations: {
        flex: 4,
        flexDirection: 'row',
    },
    iconContainer: {
        height: 50,
        width: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
    },
    icon: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        flexWrap: 'wrap',
    },
    brand: {
        fontSize: 14,
        color: colors.DARK_GRAY,
    },
    description: {
        fontSize: 12,
        color: colors.GRAY,
    },
    action: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    nutrient: {
        flex: 1,
    },
    quantity: {
        height: 50,
        width: 90,
        alignItems: 'center',
    },
});


const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromDepartment: (productId, departmentId) => dispatch(removeProductFromDepartment(productId, departmentId)),
    }
};

export default connect(null, mapDispatchToProps)(ProductRow);