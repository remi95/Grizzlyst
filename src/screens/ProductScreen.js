import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import OpenClient from "../clients/OpenFactClient";
import colors from "../constants/colors";

class ProductScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: null,
        }
    }

    _keyExtractor = (item, index) => (item + index).toString();

    render() {
        let { product } = this.state;

        return (
            <View>
            {
                product !== null
                ?
                    <View>
                        <View>
                            <Image source={{uri: product.image}} style={styles.image} />
                            <Text>{ product.name }</Text>
                            <Text>{ product.brand }</Text>
                            <Text>{ product.weight }</Text>
                        </View>

                        <Text>{ product.description }</Text>

                        <View>
                            <Text>{ product.nutrient_grade }</Text>
                            <Text>Allergènes : { product.allergens }</Text>
                            <Text>Ingrédients :</Text>
                            <FlatList
                                data={product.ingredients}
                                keyExtractor={this._keyExtractor}
                                renderItem={ ({item}) => <Text>{`\u2022 ${item}`}</Text>}
                            />
                        </View>

                        <View>
                            <View>
                                {
                                    product.nutriments.map(nutriment =>
                                        <Text key={`${nutriment.name}_name`}>{nutriment.name}</Text>
                                    )
                                }
                            </View>
                            <View>
                                {
                                    product.nutriments.map(nutriment =>
                                        <Text key={`${nutriment.name}_value`}>
                                            {nutriment.value} {nutriment.unit}
                                        </Text>
                                    )
                                }
                            </View>
                        </View>
                    </View>

                :   null
            }
            </View>
        )
    }

    async componentDidMount() {
        let product = await OpenClient.getProduct(this.props.code);

        if (product.status) {
            let data = await OpenClient.normalizeProduct(product.data);
            console.log(data)
            this.setState({ product: data });
        }
        // TODO: Manage if API doesn't respond correctly.
    }
}

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,

    },

});


export default ProductScreen;