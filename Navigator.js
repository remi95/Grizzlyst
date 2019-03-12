import {createStackNavigator} from 'react-navigation';
import LoginScreen from "./src/screens/LoginScreen";
import GroupCreateScreen from "./src/screens/GroupCreateScreen";
import InvitationScreen from './src/screens/user/InvitationScreen';
import HomeScreen from "./src/screens/HomeScreen";
import GroupListScreen from "./src/screens/GroupListScreen";
import ListCreateScreen from "./src/screens/ListCreateScreen";
import ListListScreen from "./src/screens/ListListScreen";
import ListEditScreen from "./src/screens/ListEditScreen";
import AutocompleteScreen from "./src/screens/AutocompleteScreen";

const Navigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Auth: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Connexion / Inscription',
            headerLeft: null,
        },
    },
    GroupList: {
        screen: GroupListScreen,
        navigationOptions: {
            title: 'Mes groupes',
        },
    },
    CreateGroup: {
        screen: GroupCreateScreen,
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
    Invitations: {
        screen: InvitationScreen,
        navigationOptions: {
            title: 'Mes invitations',
        },
    },
    Autocomplete: {
        screen: AutocompleteScreen,
        navigationOptions: {
            title: 'Rechercher un produit'
        }
    }
});

export default Navigator;
