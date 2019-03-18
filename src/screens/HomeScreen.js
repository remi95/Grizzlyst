import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import { Spinner } from 'native-base';
import HomeService from "../services/HomeService";
import images from "../constants/images";
import {loginByTokenAction} from "../actions/userAction";
import {connect} from "react-redux";
import colors from "../constants/colors";

class HomeScreen extends Component {

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

    async componentDidMount() {
        if (this.props.userReducer.token === null) {
            await this.props.loginByToken();
        }

        await HomeService.getHomeScreen();
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


const mapStateToProps = ({ userReducer }) => {
    return { userReducer }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginByToken: () => dispatch(loginByTokenAction()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);