import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import Navigator from "./src/navigation/Navigator";
import NavigationService from "./src/services/NavigationService";
import {Font} from "expo";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            ionicons: require("native-base/Fonts/Ionicons.ttf"),
            FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
        });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
            <Provider store={store}>
                <Navigator ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />
            </Provider>
        )
    }
}
