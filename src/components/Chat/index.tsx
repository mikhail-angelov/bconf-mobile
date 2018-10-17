import React from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import Header from "../Header";
import { Navigation } from "react-native-navigation";
import { MessageInput } from "./MessageInput";
import { MessagesList } from "./MessagesList";
import { goToAuth, goHome } from "../../navigation/navigation";
import { sendMessage } from "../../actions/chat";

interface IProps {
  chat: any;
  auth: any;
  sendMessage: (chatId, text) => void;
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
    const { chat, width, auth } = this.props
    return (
      <ChatView style={{ width: width }}>
        <Header
          title={chat.activeChatName}
          subTitle="last seen recently"
          width={width}
          isAvatarVisible={true}
          leftIconFunction={() => Navigation.popToRoot("ChatList")}
          chatColor={chat.activeChatColor}
          leftIconName="arrow-left" />
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
  sendMessage
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
