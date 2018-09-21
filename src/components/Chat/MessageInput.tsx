import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from "styled-components";

export class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  public render() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",

          padding: 4,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#888",
          backgroundColor: "#fff"
        }}
      >
        <View style={{ flex: 4 }}>
          <TextInput
            onChangeText={text => {
              this.setState({ value: text });
            }}
            value={this.state.value}
            style={{ backgroundColor: "transparent", fontSize: 24 }}
            // onSubmitEditing={() => {
            //   console.log("xxx");
            // }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => {
              this.props.handleSendMessage(this.state.value);
              this.setState({ value: "" });
            }}
            title="Send"
            color="rgb(0,122,255)"
            accessibilityLabel="Send message"
          />
        </View>
      </View>
    );
  }
}
