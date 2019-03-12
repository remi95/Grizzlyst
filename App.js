import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import Navigator from "./src/navigation/Navigator";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        )
    }
}