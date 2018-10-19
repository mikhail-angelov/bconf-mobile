import React from "react";
import { View, TextInput, Button } from "react-native";
import { SOFT_BLUE_COLOR } from "../../helpers/styleConstants";
import Icon from 'react-native-vector-icons/FontAwesome5';
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
        <Icon
          style={{ marginLeft: 12, marginRight: 12 }}
          size={22}
          name="microphone"
          backgroundColor="#fff"
          color="#f5775f" />
        <View style={{ flex: 4 }}>
          <TextInput
            onSubmitEditing={() => this.handleSending(value)}
            onChangeText={text => {
              this.setState({ value: text });
            }}
            value={value}
            returnKeyType="send"
            returnKeyLabel="Send"
            placeholder="Your message"
            style={{ backgroundColor: "transparent", fontSize: 18, margin: 0, }}
          />
        </View>
        <Icon
          size={22}
          name="grin"
          backgroundColor="#fff"
          color={SOFT_BLUE_COLOR} />
        <Icon
          style={{ marginLeft: 12, marginRight: 12 }}
          size={22}
          name="paperclip"
          color={SOFT_BLUE_COLOR} />
      </MessageInputView>
    );
  }
}

const MessageInputView = styled(View)`
  flex-direction: row
  padding: 4px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  border-width: 1;
  border-color: #888;
  background-color: #d6efef;
  borderRadius: 5px;
  borderColor: #fff;
  min-height: 50px;
`;
