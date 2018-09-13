import React, { Component } from "react";
import { View, AsyncStorage, ActivityIndicator } from "react-native";
import { goToAuth, goHome, goWelcome } from "../navigation/navigation";
import { USER_KEY } from "../utils/config";
import styled from "styled-components";

class App extends React.Component {
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      console.log("user: ", user);
      if (user) {
        goHome();
      } else {
        goWelcome();
      }
    } catch (err) {
      console.log("error: ", err);
      goToAuth();
    }
  }

  render() {
    return (
      <Wrap>
        <ActivityIndicator size="large" color="#000" />
      </Wrap>
    );
  }
}

export default App;

const Wrap = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
