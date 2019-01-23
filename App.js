import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from "./src/screens/LoginScreen";
import GroupCreateScreen from "./src/screens/GroupCreateScreen";
import GroupInviteScreen from "./src/screens/GroupInviteScreen";
import ListCreateScreen from "./src/screens/ListCreateScreen";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<LoginScreen />*/}
        {/*<GroupCreateScreen />*/}
        {/*<GroupInviteScreen />*/}
        <ListCreateScreen />
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