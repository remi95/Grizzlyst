import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/index';
import Navigator from "./src/navigation/DrawerNavigator";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        )
    }
}