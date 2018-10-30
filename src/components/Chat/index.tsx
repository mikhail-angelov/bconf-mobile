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
  chatId: string;
  chatName: string;
  chatImage: string | undefined;
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
          rightIconFunction={() =>
            Navigation.push("ChatList", {
              component: {
                id: 'ChatSettings',
                name: 'ChatSettings',
                options: {
                  topBar: {
                    visible: false
                  },
                }
              }
            })}
          chatImage={chat.activeChat.chatImage}
          title={chat.activeChat.chatName}
          subTitle="Last seen recently"
          width={width}
          isAvatarVisible={true}
          leftIconFunction={() => Navigation.pop("Chat")}
          chatColor={chat.activeChat.chatColor}
          leftIconName="arrow-left" />
        <MessagesList messages={chat.messages} userEmail={auth.email} />
        <MessageInput
          handleSendMessage={(message) => this.props.sendMessage(chat.activeChat.chatId, message)}
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
