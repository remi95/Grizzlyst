import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from "../screens/LoginScreen";
import React from 'react';

const StackNavigator = createStackNavigator({
    Auth: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Connexion / Inscription',
            // headerRight: (
            //     <Button
            //         onPress={() => navigation.navigate('DrawerNav')}
            //         title="Menu"
            //         color="blue"
            //     />
            // ),
        },
    },
});

export default StackNavigator;