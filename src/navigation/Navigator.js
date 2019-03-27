import React from 'react'
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import GroupListScreen from "../screens/GroupListScreen";
import ListListScreen from "../screens/ListListScreen";
import ListCreateScreen from "../screens/ListCreateScreen";
import ListEditScreen from "../screens/ListEditScreen";
import AutocompleteScreen from "../screens/AutocompleteScreen";
import HomeScreen from "../screens/HomeScreen";
import Sidebar from "../components/Sidebar";
import Params from "../screens/Params";
import InvitationScreen from "../screens/user/InvitationScreen";
import GroupCreateScreen from "../screens/GroupCreateScreen";
import LoginScreen from "../screens/LoginScreen";
import ListInProgressScreen from "../screens/ListInProgressScreen";

const DrawerNavigator = createDrawerNavigator({
    GroupList: { screen: GroupListScreen },
    GroupCreate: { screen: GroupCreateScreen },
    Invitations: { screen: InvitationScreen },
    Params: { screen: Params },
    ListInProgress: { screen: ListInProgressScreen },
    ListList: { screen: ListListScreen },
    CreateGroup: { screen: GroupCreateScreen },
    CreateList: { screen: ListCreateScreen },
    EditList: { screen: ListEditScreen },
    Autocomplete: { screen: AutocompleteScreen }
}, {
    drawerPosition: 'right',
    contentComponent: props => <Sidebar {...props} />,
});

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Drawer: {
        screen: DrawerNavigator,
    },
    Auth: {
        screen: LoginScreen
    },
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator);
