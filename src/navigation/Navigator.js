import React from 'react'
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import GroupListScreen from "../screens/GroupListScreen";
import HomeScreen from "../screens/HomeScreen";
import Sidebar from "../components/Sidebar";
import Params from "../screens/Params";
import InvitationScreen from "../screens/user/InvitationScreen";
import GroupCreateScreen from "../screens/GroupCreateScreen";

const DrawerNavigator = createDrawerNavigator({
    Home: { screen: HomeScreen },
    GroupList: { screen: GroupListScreen },
    GroupCreate: { screen: GroupCreateScreen },
    Invitations: { screen: InvitationScreen },
    Params: { screen: Params },
}, {
    drawerPosition: 'right',
    contentComponent: props => <Sidebar {...props} />,
    initialRouteName: 'Home',
});

export default createAppContainer(DrawerNavigator);