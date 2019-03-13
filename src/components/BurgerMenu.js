import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";

class BurgerMenu extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity style={ styles.container } onPress={()=> { this.props.navigation.toggleDrawer() }}>
                    <View>
                        <FontAwesome name="bars" size={32}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    }
});

export default BurgerMenu;