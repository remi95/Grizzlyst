import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import Navigator from "./src/navigation/Navigator";
import NavigationService from "./src/services/NavigationService";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />
            </Provider>
        )
    }
}
