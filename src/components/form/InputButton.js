import React, {Component} from 'react';
import {Text, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import colors from "../../constants/colors";
import Styles from "../../styles/styles";


class InputButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
        }
    }

    /**
     * Validate input value and set error if necessary.
     */
    validate = () => {
        let {value, validation, params} = this.props;

        if (value.length > 0) {
            let isValid = validation(value, params);

            this.setState({
                error: isValid.success ? null : isValid.message
            });

            return isValid.success;
        }
    };

    action = async () => {
        let isValid = await this.validate();

        if (isValid) {
            this.props.action();
        }
    };

    render() {
        return (
            <View>
                <View style={styles.blockInputBtn}>

                    <TextInput
                        style={styles.input}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        textContentType={this.props.type}
                        onChangeText={this.props.onChange}
                        onBlur={this.validate}
                    />

                    <TouchableOpacity onPress={this.action}>
                        <FontAwesome name={this.props.icon} size={32} color={this.props.color} />
                    </TouchableOpacity>

                </View>

                {
                    this.state.error || this.props.error
                        ?   <Text style={Styles.form.textError}>
                                {this.state.error || this.props.error}
                            </Text>
                        :   null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    blockInputBtn: {
        width: 350,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 5,
        borderColor: colors.GRAY,
        borderBottomWidth: 1,
        margin: 10,
        padding: 10,
    },
    btn: {
        flex: 1
    },
});

export default InputButton;