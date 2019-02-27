import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import images from "../constants/images";
import colors from "../constants/colors";
import NavigationService from "../services/NavigationService";

class LoadingScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={images.logo}
                    style={styles.logo}
                />
            </View>
        )
    }

    async componentDidMount() {
        try {
            let token = await AsyncStorage.getItem('token');

            if (token) {
                // TODO: getUser
                NavigationService.navigate('CreateGroup');
            }
            else {
                NavigationService.navigate('Auth');
            }
        } catch (error) {

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default LoadingScreen;