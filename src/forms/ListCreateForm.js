import React, {Component} from 'react';
import {View, TextInput, CheckBox, StyleSheet, Text} from 'react-native';
import Styles from "../styles/styles";
import Validator from "../helpers/FormValidator";
import DatePicker from "react-native-datepicker";
import moment from "moment";

class ListCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listName: null,
            limitDate: null,
            isDateUndefined: false,
        }
    }

    updateInputValue = (value, input) => {
        this.setState({
            [input]: value,
        })
    };

    switchDateDefined = () => {
        this.setState({
            isDateUndefined: !this.state.isDateUndefined
        })
    };

    render() {

        let now = moment().format('DD MMM YYYY');
        let nextWeek = moment().add(7, 'days');

        return (
            <View>
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