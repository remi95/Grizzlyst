import React, {Component} from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class BurgerMenu extends Component {

    render() {
        return (
            <Button title='Menu' onPress={ () => this.props.navigation.toggleDrawer() }/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    buttonSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 250,
        margin: 15,
    },
});

export default BurgerMenu;