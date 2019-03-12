import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Font} from "expo";
import {FontAwesome} from "@expo/vector-icons";

class BurgerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        }
    }

    async componentDidMount() {
        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isLoaded: true});
            console.log(this.state)
        }
        catch {
            console.log('ERROR WHILE LOADING ICONS...')
        }
    }

    renderBtn() {
        return (
            <TouchableOpacity style={ styles.container } onPress={()=> { this.props.navigation.toggleDrawer() }}>
                <View>
                    <FontAwesome name="bars" size={32}/>
                </View>
            </TouchableOpacity>)
    }

    render() {
        return (
            <View>
                {
                    this.state.isLoaded
                        ? this.renderBtn()
                        : null
                }
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