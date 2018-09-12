import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet } from "react-native";
import { goToAuth, goHome, goWelcome } from "../navigation/navigation";
import { USER_KEY } from "../utils/config";

export default class App extends React.Component {
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      console.log("user: ", user);
      if (user) {
        goHome();
      } else {
        goToAuth();
      }
    } catch (err) {
      console.log("error: ", err);
      goToAuth();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
