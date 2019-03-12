import React, {Component} from 'react';
import {View, TextInput, CheckBox, StyleSheet, Text, Button} from 'react-native';
import Styles from "../styles/styles";
import Validator from "../helpers/FormValidator";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {TouchableGrid} from "../components/list/TouchableGrid";
import ProductRow from "../components/element/ProductRow";
import colors from "../constants/colors";
import GrizzlystClient from "../clients/GrizzlystClient";
import {connect} from "react-redux";
import NavigationService from "../services/NavigationService";
import {setCurrentFullList} from "../actions/listAction";

class ListCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listName: null,
            limitDate: null,
            isDateUndefined: false,
            departments: [],
            products: [],
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

    getEnabledProducts = () => {
        let products = [];

        for (let product of this.state.products) {
            if (product.enable) {
                products.push(product)
            }
        }

        return products;
    };

    create = async () => {
        let departments = this.getEnabledDepartmentsIds();
        let products = this.getEnabledProducts();

        let response = await GrizzlystClient.post('lists', {
            name: this.state.listName,
            date: this.state.isDateUndefined ? Date.now() : this.state.limitDate,
            groupId: this.props.groupReducer.group.id,
            departments,
        });

        if (response.status) {
            response.data.departments = departments;
            await this.props.setCurrentFullList(response.data);
            NavigationService.navigate('EditList');
        }
        else {
            // TODO: Throw alert.
        }
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

                {
                    this.state.products.length > 0
                        ?   <View>
                                <Text style={Styles.form.label}>
                                    Voulez-vous ajouter ces produits qui n'ont pu être achetés précédemment ?
                                </Text>

                                {
                                    this.state.products.map(product =>
                                        <ProductRow
                                            key={product.id}
                                            product={product}
                                            favorite={false}
                                            selectable={true}
                                        />
                                    )
                                }
                            </View>
                        :   null
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

    async componentDidMount() {
        const departments = await GrizzlystClient.get('departments');
        const products = await GrizzlystClient.get(`groups/${this.props.groupReducer.group.id}/no-buy-products`);

        if (departments.status) {
            this.setState({departments: departments.data})
        }
        if (products.status) {
            this.setState({ products: products.data })
        }
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

const mapStateToProps = ({ groupReducer }) => {
    return { groupReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentFullList: (data) => dispatch(setCurrentFullList(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCreateForm);