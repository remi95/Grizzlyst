import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import colors from "../constants/colors";
import { Spinner } from 'native-base';
import images from "../constants/images";

class Loader extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={images.logo}
                    style={styles.logo}
                />
                <Spinner color='#7D7D7D' />
            </View>
        )
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

export default Loader;