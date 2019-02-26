import {createStackNavigator} from 'react-navigation';
import LoginScreen from "./src/screens/LoginScreen";
import GroupCreateScreen from "./src/screens/GroupCreateScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

const Navigator = createStackNavigator({
    Loading: {
        screen: LoadingScreen,
        navigationOptions: {
            header: null,
        },
    },
    Auth: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Connexion / Inscription',
            headerLeft: null,
        },
    },
    CreateGroup: {
        screen: GroupCreateScreen,
        navigationOptions: {
            title: 'Créer un groupe',
        },
    },
});

export default Navigator;