import React from 'react'
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import CreateGroupScreen from '../screens/GroupCreateScreen';
import InvitationScreen from '../screens/user/InvitationScreen';
import BurgerMenu from '../components/BurgerMenu';
import LoginScreen from '../screens/LoginScreen';
import GroupListScreen from "../screens/GroupListScreen";
import ListListScreen from "../screens/ListListScreen";
import ListCreateScreen from "../screens/ListCreateScreen";
import ListEditScreen from "../screens/ListEditScreen";
import AutocompleteScreen from "../screens/AutocompleteScreen";

const ListGroupNavigator = createStackNavigator({
    GroupList: {
        screen: GroupListScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Mes groupes',
            headerRight : <BurgerMenu navigation={navigation} />,
        })
    }
});

const InvitationsNavigator = createStackNavigator({
    Invitations: {
        screen: InvitationScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Mes invitations',
            headerRight : <BurgerMenu navigation={navigation} />,
        }),
    }
});

const DrawerNavigator = createDrawerNavigator({
    GroupList: {
        screen: ListGroupNavigator,
        navigationOptions: {
            drawerLabel: 'Créer un groupe'
        }
    },
    Invitations: {
        screen: InvitationsNavigator,
        navigationOptions: {
            drawerLabel: 'Mes invitations'
        }
    },
    Lists: {
        screen: () => null,
        navigationOptions: {
            drawerLabel: 'Mes listes'
        }
    },
    Params: {
        screen: () => null,
        navigationOptions: {
            drawerLabel: 'Paramètres'
        }
    }
}, {
    drawerPosition: 'right',
});

const AppNavigator = createStackNavigator({
    Drawer: {
        screen: DrawerNavigator,
    },
    Auth: {
        screen: LoginScreen
    },
    CreateGroup: {
        screen: CreateGroupScreen,
        navigationOptions: {
            title: 'Créer un groupe',
        },
    },
    ListList: {
        screen: ListListScreen,
        navigationOptions: {
            title: 'Mes listes',
        },
    },
    CreateList: {
        screen: ListCreateScreen,
        navigationOptions: {
            title: 'Créer une liste',
        },
    },
    EditList: {
        screen: ListEditScreen,
        navigationOptions: {
            title: 'Editer une liste',
        },
    },
    Autocomplete: {
        screen: AutocompleteScreen,
        navigationOptions: {
            title: 'Rechercher un produit'
        }
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Auth'
});

export default createAppContainer(AppNavigator);