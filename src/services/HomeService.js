import store from "../store";
import {getGroups, getInvitations} from "../actions/userAction";
import {getAllDepartments} from "../actions/listAction";
import NavigationService from "./NavigationService";

class Home {

    getHomeScreen = async () => {
        if (store.getState().userReducer.token === null) {
            return NavigationService.navigate('Auth');
        }

        await store.dispatch(getInvitations());
        await store.dispatch(getGroups());
        await store.dispatch(getAllDepartments());

        if (store.getState().userReducer.groups.length === 0 && store.getState().userReducer.invitations.length > 0) {
            return NavigationService.navigate('Invitations');
        }

        if (store.getState().userReducer.groups.length === 1) {
            return NavigationService.navigate('ListList');
        }

        return NavigationService.navigate('GroupList');
    }
}

const HomeService = new Home();

export default HomeService;
