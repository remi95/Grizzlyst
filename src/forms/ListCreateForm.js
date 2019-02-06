import React, {Component} from 'react';
import {View, TextInput, CheckBox, StyleSheet, Text, Button} from 'react-native';
import Styles from "../styles/styles";
import Validator from "../helpers/FormValidator";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {TouchableGrid} from "../components/list/TouchableGrid";
import images from '../constants/images'
import ProductRow from "../components/element/ProductRow";
import colors from "../constants/colors";


class ListCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listName: null,
            limitDate: null,
            isDateUndefined: false,
            // MOCK
            departments: [
                {
                    id: 1,
                    text: 'Boucherie',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 2,
                    text: 'Volailles',
                    icon: images.logo,
                    favorite: true,
                    enable: false,
                },
                {
                    id: 3,
                    text: 'Poissons & Fruits de mer',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 4,
                    text: 'Fruits',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 5,
                    text: 'Légumes',
                    icon: images.logo,
                    favorite: true,
                    enable: false,
                },
                {
                    id: 6,
                    text: 'Boulangerie',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 7,
                    text: 'Fromages',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 8,
                    text: 'Charcuterie',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 9,
                    text: 'Produits laitiers',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 10,
                    text: 'Produits frais',
                    icon: images.logo,
                    favorite: false,
                    enable: false,
                },
            ],
            // MOCK
            products: [
                {
                    id: 1537,
                    brand: 'Nestlé',
                    name: 'Nesquik',
                    weight: '250g',
                    nutrient_grade: 'B',
                    image: 'https://static.openfoodfacts.org/images/products/303/371/006/5066/front_fr.48.400.jpg',
                    quantity: 2,
                    favorite: false,
                    enable: false,
                },
                {
                    id: 1557,
                    brand: 'Ferrero',
                    name: 'Nutella',
                    weight: '750g',
                    nutrient_grade: 'E',
                    image: 'https://static.openfoodfacts.org/images/products/301/762/042/1006/front_fr.112.100.jpg',
                    quantity: 1,
                    favorite: false,
                    enable: false,
                },
            ],
        }
    }

    switchDateDefined = () => {
        this.setState({
            isDateUndefined: !this.state.isDateUndefined
        })
    };

    switchDepartmentState = (index) => {
        let departments = this.state.departments;

        if (!departments[index]) {
            return;
        }

        departments[index].enable = !departments[index].enable;

        this.setState({departments});
    };

    switchProductState = (index) => {
        let products = this.state.products;

        if (!products[index]) {
            return;
        }

        products[index].enable = !products[index].enable;

        this.setState({products});
    };

    getEnabledDepartmentsIds = () => {
        let departments = [];

        for (let department of this.state.departments) {
            if (department.enable || department.favorite) {
                departments.push(department.id)
            }
        }

        return departments
    };

    getEnabledProducts = () => {
        let products = [];

        for (product of this.state.products) {
            if (product.enable) {
                products.push(product)
            }
        }

        return products;
    };

    create = () => {
        let departments = this.getEnabledDepartmentsIds();
        let products = this.getEnabledProducts();
    };

    render() {

        let now = moment().format('DD MMM YYYY');
        let nextWeek = moment().add(7, 'days');

        return (
            <View style={Styles.form.container}>
                <TextInput
                    style={Styles.form.inputText}
                    placeholder={'Nom de la liste'}
                    onBlur={() => Validator.minLengthValidate(this.state, 255)}
                    onChangeText={(value) => this.setState({listName: value})}
                    value={this.state.listName}
                />

                <Text style={Styles.form.label}>Faire les achats avant le</Text>

                {
                    this.state.isDateUndefined
                        ?   null
                        :   <DatePicker
                                style={Styles.form.inputText}
                                date={this.state.limitDate ? this.state.limitDate : nextWeek}
                                mode={'date'}
                                format={'DD MMM YYYY'}
                                minDate={now}
                                customStyles={{
                                    dateIcon: styles.dateIcon,
                                    dateInput: styles.dateInput
                                }}
                                onDateChange={(date) => this.setState({limitDate: date})}
                            />
                }
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={this.state.isDateUndefined}
                        onChange={this.switchDateDefined.bind(this)}
                    />
                    <Text onPress={this.switchDateDefined.bind(this)}>
                        Dès que possible
                    </Text>
                </View>


                <Text style={Styles.form.label}>Choisir les catégories à ajouter</Text>

                <TouchableGrid
                    data={this.state.departments}
                    action={this.switchDepartmentState.bind(this)}
                />

                <Text style={Styles.form.label}>
                    Voulez-vous ajouter ces produits qui n'ont pu être achetés précédemment ?
                </Text>

                {
                    this.state.products.map((product, i) =>
                        <ProductRow
                            key={product.id}
                            product={product}
                            favorite={false}
                            enableAction={this.switchProductState.bind(this, i)}
                        />
                    )
                }

                <Button
                    title={'Créer'}
                    color={colors.BLUE}
                    onPress={this.create}
                    style={Styles.form.btnSubmit}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateIcon: {
        display: 'none',
    },
    dateInput: {
        borderWidth: 0,
        margin: 0,
        padding: 0,
        textAlign: 'left',
    },
});

export default ListCreateForm;