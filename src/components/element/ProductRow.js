import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, CheckBox} from 'react-native';
import {NutrientGrade} from "./NutrientGrade";
import colors from "../../constants/colors";
import {Font} from "expo";
import {FontAwesome} from "@expo/vector-icons";

class ProductRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isIconLoaded: false,
        }
    }

    switchFavorite = () => {
        // TODO: Send request to node server with product.id
    };

    switchProduct = () => {

    };

    render() {
        let {product} = this.props;

        return (
            <View style={styles.row}>
                <View style={styles.basicInformations}>
                    <View style={styles.iconContainer}>
                        <Image source={{uri: product.image}} style={styles.icon}/>
                    </View>

                    <View>
                        <Text style={styles.title}>{product.name}</Text>
                        <Text style={styles.brand}>{product.brand}</Text>
                        <Text style={styles.description}>{product.weight}</Text>
                    </View>
                </View>

                <NutrientGrade style={styles.nutrient} grade={product.nutrient_grade}/>

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
                    this.props.selectable
                        ?   <CheckBox
                                value={product.enable}
                                onChange={this.switchProduct}
                            />
                        :null
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    brand: {
        fontSize: 14,
        color: colors.DARK_GRAY,
    },
    description: {
        fontSize: 12,
        color: colors.GRAY,
    },
    nutrient: {
        flex: 1,
    }
});

export default ProductRow;