import React from 'react'
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import CreateGroup from '../screens/GroupCreateScreen';
import InvitationScreen from '../screens/user/InvitationScreen';
import BurgerMenu from "../components/BurgerMenu";

const DrawerConfig = {
    contentComponent: ({ navigation }) => (<BurgerMenu navigation={navigation} />)
};


const DrawerNavigator = createDrawerNavigator({
    CreateGroup: {
        screen: CreateGroup,
        navigationOptions: {
            drawerLabel: 'Créer un groupe',
            drawerIcon: null,
        }
    },
    Invitations: {
        screen: InvitationScreen,
        navigationOptions: {
            drawerLabel: 'Mes invitations',
            drawerIcon: null,
        }
    },
},
    DrawerConfig);

export default createAppContainer(DrawerNavigator);