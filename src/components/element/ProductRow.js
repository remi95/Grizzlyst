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
        this.props.enableAction()
    };

    render() {
        let {product} = this.props;

        return (
            <View style={styles.row}>
                <View style={styles.basicInformations}>
                    <Image source={{uri: product.image}} style={styles.icon}/>

                    <View>
                        <Text style={styles.title}>{product.brand} - {product.name}</Text>
                        <Text style={styles.description}>{product.weight}</Text>
                    </View>
                </View>

                <NutrientGrade grade={product.nutrient_grade}/>

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

                <CheckBox
                    value={product.enable}
                    onChange={this.switchProduct}
                />
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
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        padding: 10,
    },
    basicInformations: {
        flexDirection: 'row',
    },
    icon: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: colors.LIGHT_GRAY,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
    },
    description: {
        color: colors.GRAY,
    },
});

export default ProductRow;