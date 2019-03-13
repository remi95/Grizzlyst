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
import HomeScreen from "../screens/HomeScreen";

const headerConf = {
    // headerMode: 'none',
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        headerRight : <BurgerMenu navigation={navigation} />
    })
};

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Auth: {
        screen: LoginScreen
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
    },
    GroupList: {
        screen: GroupListScreen,
        navigationOptions: {
            title: 'Mes groupes'
        }
    },
    CreateGroup: {
        screen: CreateGroupScreen,
        navigationOptions: {
            title: 'Créer un groupe'
        }
    }
}, headerConf);

const DrawerNavigator = createDrawerNavigator({
    Home: AppNavigator,
    GroupList: {
        screen: GroupListScreen,
        navigationOptions: {
            drawerLabel: 'Mes groupes'
        }
    },
    Invitations: {
        screen: () => null,
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

export default createAppContainer(DrawerNavigator);