import { NavigationActions } from 'react-navigation';

class Navigation {

    constructor() {
        this._navigator = null;
    }

    setTopLevelNavigator = (navigatorRef) => {
        this._navigator = navigatorRef;
    };

    navigate = (routeName, params) => {
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }
}

const NavigationService = new Navigation();

export default NavigationService;