import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import {Font} from "expo";


class TextButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[this.props.style, styles.text]}>
                    {this.props.text}
                </Text>

                <TouchableOpacity
                    onPress={this.props.action}
                    style={styles.btn}
                >
                    {
                        this.state.isLoaded
                            ? <FontAwesome name={this.props.icon} size={16} color={this.props.color}/>
                            : <Text>X</Text>
                    }
                </TouchableOpacity>
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
    container: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        flex: 5,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default TextButton;