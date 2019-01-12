import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from "./src/screens/LoginScreen";
import CreateGroupScreen from "./src/screens/CreateGroupScreen";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<LoginScreen />*/}
        <CreateGroupScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});