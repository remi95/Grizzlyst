import React from 'react'
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import CreateGroupScreen from '../screens/GroupCreateScreen';
import InvitationScreen from '../screens/user/InvitationScreen';
import BurgerMenu from '../components/BurgerMenu';

const CreateGroupNavigator = createStackNavigator({
    CreateGroup: {
        screen: CreateGroupScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Création de groupe',
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
    CreateGroup: {
        screen: CreateGroupNavigator,
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
    }
}, {
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
        headerRight : <BurgerMenu navigation={navigation} />,
    }),
});

export default createAppContainer(AppNavigator);