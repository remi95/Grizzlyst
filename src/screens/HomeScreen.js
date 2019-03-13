import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import HomeService from "../services/HomeService";
import images from "../constants/images";
import {loginByTokenAction} from "../actions/userAction";
import {connect} from "react-redux";
import colors from "../constants/colors";

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            homeComponent: null,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.homeComponent === null
                    ?   <Image
                            source={images.logo}
                            style={styles.logo}
                        />
                    :   <this.state.homeComponent />
                }
            </View>
        )
    }

    async componentDidMount() {
        if (this.props.userReducer.token === null) {
            await this.props.loginByToken();
        }

        // await AsyncStorage.removeItem('token');
        // await this.props.loginByToken();

        const homeComponent = await HomeService.getHomeScreen();

        // this.setState({ homeComponent })
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