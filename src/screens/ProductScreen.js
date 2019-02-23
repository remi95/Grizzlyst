import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Image, Text, FlatList} from 'react-native';
import OpenClient from "../clients/OpenFactClient";
import colors from "../constants/colors";
import Styles from "../styles/styles";
import NutrientGradeHelper from "../helpers/NutrientGrade";
import {NutrientGrade} from "../components/element/NutrientGrade";

class ProductScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: null,
            gradeColor: null,
        }
    }

    _keyExtractor = (item, index) => (item + index).toString();

    render() {
        let { product } = this.state;

        return (
            <ScrollView style={[Styles.position.size.fullWidth, styles.container]}>
            {
                product !== null
                ?
                    <View style={Styles.position.flex.flex}>
                        <View style={styles.box}>
                            <View style={styles.main}>
                                <Image source={{uri: product.image}} style={[styles.image, {borderColor: this.state.gradeColor}]} />
                                <View>
                                    <Text style={styles.title}>{ product.name }</Text>
                                    <Text style={styles.brand}>{ product.brand }</Text>
                                    <Text style={styles.weight}>{ product.weight }</Text>
                                </View>
                            </View>

                            <Text style={styles.description}>{ product.description }</Text>

                            <NutrientGrade grade={ product.nutrient_grade } />
                        </View>

                        <View>
                            <Text style={styles.underline}>Ingrédients :</Text>
                            <FlatList
                                data={product.ingredients}
                                keyExtractor={this._keyExtractor}
                                renderItem={ ({item}) => <Text>{`\u2022 ${item}`}</Text>}
                                style={styles.ingredients}
                            />

                            <Text style={styles.underline}>Allergènes :</Text><Text>{ product.allergens }</Text>
                        </View>

                        <View style={styles.table}>
                            <View style={styles.tableCol}>
                                {
                                    product.nutriments.map((nutriment, i) =>
                                        <View
                                            key={`${nutriment.name}_name`}
                                            style={[styles.tableRow, i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}
                                        >
                                            <Text>{nutriment.name}</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <View style={styles.tableCol}>
                                {
                                    product.nutriments.map((nutriment, i) =>
                                        <View
                                            key={`${nutriment.name}_value`}
                                            style={[styles.tableRow, i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}
                                        >
                                            <Text>{nutriment.value} {nutriment.unit}</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </View>

                :   null
            }
            </ScrollView>
        )
    }

    async componentDidMount() {
        let product = await OpenClient.getProduct(this.props.code);

        if (product.status) {
            let data = await OpenClient.normalizeProduct(product.data);
            let gradeColor = NutrientGradeHelper.getColor(data.nutrient_grade);

            this.setState({ product: data, gradeColor });
        }
        // TODO: Manage if API doesn't respond correctly.
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    main: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 20,
        borderWidth: 2,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
    },
    brand: {
        fontSize: 14,
        color: colors.DARK_GRAY,
    },
    weight: {
        fontSize: 12,
        color: colors.GRAY,
    },
    description: {
        padding: 25,
        marginBottom: 20,
        color: colors.GRAY,
        borderWidth: 1,
        borderColor: colors.GRAY,
        borderRadius: 10,
    },
    box: {
        padding: 10,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: colors.LIGHT_GRAY,
        borderRadius: 5,
    },
    ingredients: {
        marginTop: 5,
        marginLeft: 25,
        marginBottom: 20,
    },
    table: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginTop: 20,
    },
    tableCol: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.LIGHT_BLUE,
    },
    tableRow: {
        padding: 5,
    },
    tableRowEven: {
        backgroundColor: colors.WHITE,
    },
    tableRowOdd: {
        backgroundColor: colors.LIGHT_BLUE,
    },
    underline: {
        textDecorationLine: 'underline',
    },
});


export default ProductScreen;