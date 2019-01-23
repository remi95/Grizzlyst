import React, {Component} from 'react';
import {View, TextInput, CheckBox, StyleSheet, Text} from 'react-native';
import Styles from "../styles/styles";
import Validator from "../helpers/FormValidator";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import TouchableGrid from "../components/list/TouchableGrid";
import images from '../constants/images'


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
                    brand: 'Nestlé',
                    name: 'Nesquik',
                    weight: '400g',
                    nutrient_grade: 'B',

                }
            ]
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

    getEnabledDepartmentsIds = () => {
        let departments = [];

        for (let department of this.state.departments) {
            if (department.enable || department.favorite) {
                departments.push(department.id)
            }
        }

        return departments
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
                                    dateIcon: {
                                        display: 'none',
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        margin: 0,
                                        padding: 0,
                                        textAlign: 'left',
                                    },
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
   checkboxContainer: {
       flexDirection: 'row',
       alignItems: 'center',
   }
});

export default ListCreateForm;