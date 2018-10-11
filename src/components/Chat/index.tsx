import React from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { logout } from "../../actions/auth";
import Button from "../CommonUIElements/Button";
import styled from "styled-components";
import Header from "../Header";
import { MessageInput } from "./MessageInput";
import { MessagesList } from "./MessagesList";
import { goToAuth, goHome } from "../../navigation/navigation";
import { sendMessage } from "../../actions/chat";

interface IProps {
  chat: any;
  auth: any;
  sendMessage: (chatId, text) => void;
  logout: () => void;
  backToChatList: () => void;
  backButton: () => void;
  activeChatId: string;
  activeChatName: string;
  width: string;
  chatColor: string;
}
class Chat extends React.PureComponent<IProps> {
  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public render() {
    const { chat, width, backToChatList, auth } = this.props
    return (
      <ChatView style={{ width: width }}>
        <Header title={chat.activeChatName} width={width} backButton={backToChatList} chatColor={chat.activeChatColor} />
        <MessagesList messages={chat.messages} userEmail={auth.email} />
        <MessageInput
          handleSendMessage={(message) => this.props.sendMessage(chat.activeChatId, message)}
        />
      </ChatView>
    );
  }
}

const ChatView = styled(KeyboardAvoidingView).attrs({
  behavior: "padding"
})`
  display: flex;
  flexDirection: column;
  height: 100%;
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
