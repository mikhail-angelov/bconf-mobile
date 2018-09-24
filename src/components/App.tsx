import React from "react";
import _ from "lodash";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { goToAuth, goHome, goWelcome } from "../navigation/navigation";
import { AUTH } from "../constants/storage";
import styled from "styled-components";

class App extends React.Component {
  public async componentDidMount() {
    try {
      const user = (await AsyncStorage.getItem(AUTH)) || {};
      if (_.isEmpty(user)) {
        goWelcome();
      } else {
        goHome();
      }
    } catch (err) {
      goToAuth();
    }
  }

  public render() {
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
