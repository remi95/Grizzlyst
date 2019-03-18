import store from "../store";
import LoginScreen from "../screens/LoginScreen";
import {getGroups, getInvitations} from "../actions/userAction";
import {getAllDepartments} from "../actions/listAction";
import NavigationService from "./NavigationService";

class Home {

    getHomeScreen = async () => {
        if (store.getState().userReducer.token === null) {
            return LoginScreen;
        }

        await store.dispatch(getInvitations());
        await store.dispatch(getGroups());
        await store.dispatch(getAllDepartments());

        if (store.getState().userReducer.groups.length === 0 && store.getState().userReducer.invitations.length > 0) {
            NavigationService.navigate('Invitations');
        }

        if (store.getState().userReducer.groups.length === 1) {
            NavigationService.navigate('ListList');
        }

        NavigationService.navigate('GroupList');
    }
}

const HomeService = new Home();

export default HomeService;
