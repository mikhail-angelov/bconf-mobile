import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";

type Props = {};
class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (true) {
      return (
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            padding: 20
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              justifyContent: "center",
              padding: 20
            }}
          >
            <DemoText>Downloading update...</DemoText>
          </View>
        </View>
      );
    }
  }
}

export default App;

const DemoText = styled(Text)`
  text-align: center;
  margin-bottom: 15px;
  font-size: 15px;
  color: red;
`;
