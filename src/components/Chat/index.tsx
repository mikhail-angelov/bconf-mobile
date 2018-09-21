import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView
} from "react-native";
import styled from "styled-components";
import { MessageInput } from "./MessageInput";
import { MessagesList } from "./MessagesList";
import { socketFire } from "../../actions/helper";
import { sendMessage } from "../../actions/chat";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    socketFire();
  }
  public render() {
    return (
      <ChatView behavior="padding">
        <MessagesList messages={this.props.chat.messages} />
        <MessageInput handleSendMessage={this.props.sendMessage} />
      </ChatView>
    );
  }
}

const ChatView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const mapDispatchToProps = {
  sendMessage
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
