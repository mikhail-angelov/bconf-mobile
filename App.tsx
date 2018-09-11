import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

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
            <Text
              style={{
                textAlign: "center",
                marginBottom: 15,
                fontSize: 15
              }}
            >
              Downloading update...
            </Text>
          </View>
        </View>
      );
    }
  }
}

export default App;
