import React from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { logout } from "../../actions/auth";
import Button from "../CommonUIElements/Button";
import styled from "styled-components";
import { MessageInput } from "./MessageInput";
import { MessagesList } from "./MessagesList";
import { goToAuth, goHome } from "../../navigation/navigation";
import { sendMessage } from "../../actions/chat";

interface IProps {
  chat: any;
  auth: any;
  sendMessage: () => void;
  logout: () => void;
  activeChat: string;
}
class Chat extends React.PureComponent<IProps> {
  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public render() {
    return (
      <ChatView style={{ width: this.props.width }}>
        <MessagesList messages={this.props.chat.messages} userEmail={this.props.auth.email} />
        <MessageInput
          chatId={this.props.chat.activeChat}
          handleSendMessage={this.props.sendMessage}
        />
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
  sendMessage,
  logout
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
