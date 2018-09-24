import React from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import { MessageInput } from "./MessageInput";
import { MessagesList } from "./MessagesList";

import { sendMessage } from "../../actions/chat";

interface IProps {
  chat: any;
  sendMessage: () => void;
}
class Chat extends React.PureComponent<IProps> {
  public render() {
    return (
      <ChatView>
        <MessagesList messages={this.props.chat.messages} />
        <MessageInput handleSendMessage={this.props.sendMessage} />
      </ChatView>
    );
  }
}

const ChatView = styled(KeyboardAvoidingView).attrs({
  behavior: "padding"
})`
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
