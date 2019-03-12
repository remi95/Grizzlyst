import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/index';
import LoginScreen from "./src/screens/LoginScreen";
import GroupCreateScreen from "./src/screens/GroupCreateScreen";
import GroupInviteScreen from "./src/screens/GroupInviteScreen";
import ListCreateScreen from "./src/screens/ListCreateScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ListEditScreen from "./src/screens/ListEditScreen";
import AutocompleteScreen from "./src/screens/AutocompleteScreen";
import Navigator from "./Navigator";
import {createAppContainer} from "react-navigation";
import NavigationService from "./src/services/NavigationService";
import Alert from "./src/components/element/Alert";

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer style = {styles.container} ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}>
                    {/*<LoginScreen />*/}
                    {/*<GroupCreateScreen />*/}
                    {/*<GroupInviteScreen />*/}
                    {/*<ListCreateScreen />*/}
                    {/*<ListEditScreen/>*/}
                    {/*<AutocompleteScreen />*/}
                    {/*<ProductScreen code={3017620429484} />*/}
                </AppContainer>
                <Alert />
            </Provider>
        )
        ;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
