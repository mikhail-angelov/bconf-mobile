import React from "react";
import { View, TextInput, Button, Dimensions } from "react-native";
import { SOFT_BLUE_COLOR, WHITE_COLOR } from "../../helpers/styleConstants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from "styled-components";

const { height } = Dimensions.get('window') // it's for IphoneX

interface IProps {
  handleSendMessage: (textInput) => void;
  chatId: string;
}
interface IState {
  textInput: string;
}
export class MessageInput extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ""
    };
    this.handleSending = this.handleSending.bind(this);
  }
  public handleSending(message) {
    this.props.handleSendMessage(message);
    this.setState({ textInput: "" });
  }
  public render() {
    const { textInput } = this.state
    return (
      <MessageInputView>
        <Icon
          style={{ marginLeft: 12, marginRight: 12 }}
          size={22}
          name="microphone"
          backgroundColor={WHITE_COLOR}
          color="#f5775f" />
        <View style={{ flex: 4 }}>
          <TextInput
            onSubmitEditing={() => this.handleSending(textInput)}
            onChangeText={text => {
              this.setState({ textInput: text });
            }}
            value={textInput}
            returnKeyType="send"
            returnKeyLabel="Send"
            placeholder="Your message"
            style={{ backgroundColor: "transparent", fontSize: 18, margin: 0, }}
          />
        </View>
        <Icon
          size={22}
          name="grin"
          backgroundColor={WHITE_COLOR}
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
  marginBottom: ${height > 800 ? "30px" : "10px"}
  align-items: center;
  justify-content: center;
  border-width: 1;
  border-color: #888;
  background-color: #d6efef;
  borderRadius: 5px;
  borderColor: ${WHITE_COLOR};
  min-height: 50px;
`;
