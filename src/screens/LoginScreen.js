import React, {Component} from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import images from "../constants/images";
import colors from "../constants/colors";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            needRegistration: true,
        }
    }

    switchForm = () => {
        this.setState(prevState => ({
            needRegistration: !prevState.needRegistration
        }))
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={images.logo}
                    style={styles.logo}
                />
                <View style={styles.buttonSwitch}>
                    <Button
                        title={'Connexion'}
                        onPress={this.switchForm}
                        color={this.state.needRegistration ? colors.GRAY : colors.GREEN}
                    />
                    <Button
                        title={'Inscription'}
                        onPress={this.switchForm}
                        color={this.state.needRegistration ? colors.BLUE : colors.GRAY}
                    />
                </View>

                {
                    this.state.needRegistration ? <RegisterForm /> : <LoginForm />
                }
                <Button title='click' onPress={() => this.props.navigation.openDrawer()}/>
            </View>
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

export default LoginScreen;