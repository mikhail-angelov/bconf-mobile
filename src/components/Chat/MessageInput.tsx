import React from "react";
import { View, TextInput, Button } from "react-native";
import styled from "styled-components";

interface IProps {
  handleSendMessage: (value) => void;
  chatId: string;
}
interface IState {
  value: string;
}
export class MessageInput extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleSending = this.handleSending.bind(this);
  }
  public handleSending(message) {
    this.props.handleSendMessage(message);
    this.setState({ value: "" });
  }
  public render() {
    const { value } = this.state
    return (
      <MessageInputView>
        <View style={{ flex: 4 }}>
          <TextInput
            onChangeText={text => {
              this.setState({ value: text });
            }}
            value={value}
            style={{ backgroundColor: "transparent", fontSize: 24 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => this.handleSending(value)}
            title="Send"
            color="rgb(0,122,255)"
            accessibilityLabel="Send message"
          />
        </View>
      </MessageInputView>
    );
  }
}

const MessageInputView = styled(View)`
  flex-direction: row;
  width: 100%;
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-width: 1;
  border-color: #888;
  background-color: #fff;
`;
