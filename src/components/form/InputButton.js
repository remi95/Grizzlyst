import React, {Component} from 'react';
import {Text, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {AppLoading, Font} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import colors from "../../constants/colors";
import Styles from "../../styles/styles";


class InputButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
        }
    }

    clearError = () => {
        this.setState({ error: null })
    };

    onWriting = (value) => {
        this.clearError();
        this.props.onChange(value);
    };

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
            this.props.onChange('');
        }
    };

    render() {
        return(
            <View>
                <View style={styles.blockInputBtn}>

                    <TextInput
                        style={styles.input}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        textContentType={this.props.type}
                        onChangeText={(value) => this.onWriting(value)}
                        onBlur={this.validate}
                    />

                    <TouchableOpacity onPress={this.action}>
                        {
                            this.state.isLoaded
                                ? <FontAwesome name={this.props.icon} size={32} color={this.props.color}/>
                                : <Text>O</Text>
                        }
                    </TouchableOpacity>

                </View>

                    {
                        this.state.error || this.props.error
                            ?   <Text style={Styles.form.textError}>
                                    {this.state.error || this.props.error}
                                </Text>
                            :    null
                    }
            </View>
        )
    }

    async componentDidMount() {
        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isLoaded: true})
        }
        catch {
            console.log('ERROR WHILE LOADING ICONS...')
        }
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