import React from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, Dimensions, TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components";
import Header from "../Header";
import { Navigation } from "react-native-navigation";
import MessageInput from "./MessageInput";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MessagesList } from "./MessagesList";
import { goToAuth } from "../../navigation/navigation";
import { WHITE_COLOR, SOFT_BLUE_COLOR } from "../../helpers/styleConstants";
import { findMessages, cleanFindMessages } from "../../actions/messages";
import { sendMessage, unsetActiveChat, getChatlistTimestamp, openSearchBar, closeSearchBar } from "../../actions/chat";
import _ from "lodash";

const { height } = Dimensions.get('window') // it's for IphoneX

interface IState {
  currentSelectedMessage: object;
  currentMessageNumber: number;
}
interface IProps {
  chat: any;
  auth: any;
  sendMessage: (chatId, text) => void;
  unsetActiveChat: () => void;
  getChatlistTimestamp: () => void;
  openSearchBar: () => void;
  closeSearchBar: () => void;
  findMessages: () => void;
  cleanFindMessages: () => void;
  chatId: string;
  chatName: string;
  chatImage: string | undefined;
  width: string;
  chatColor: string;
  messages: any;
  messagesByUserId: object;
  isSearchBarActive: boolean;
}
class Chat extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      currentMessageNumber: 0,
      currentSelectedMessage: []
    }
  }
  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.messages.filteredMessages.length !== this.props.messages.filteredMessages.length) {
      this.setState({ currentSelectedMessage: this.props.messages.filteredMessages[0] })
    }
  }

  public nextMessage(filteredMessages, currentMessageNumber) {
    const newNumber = currentMessageNumber === filteredMessages.length - 1 ? 0 : currentMessageNumber + 1
    const nextMessage = filteredMessages[newNumber]
    this.setState({ currentSelectedMessage: nextMessage, currentMessageNumber: newNumber })
  }

  public prevMessage(filteredMessages, currentMessageNumber) {
    const newNumber = currentMessageNumber === 0 ? filteredMessages.length - 1 : currentMessageNumber - 1
    const nextMessage = filteredMessages[newNumber]
    this.setState({ currentSelectedMessage: nextMessage, currentMessageNumber: newNumber })
  }

  public render() {
    const { chat, width, auth, messagesByUserId, messages } = this.props;
    const { currentSelectedMessage, currentMessageNumber } = this.state
    return (
      <ChatView style={{ width: width }}>
        <Header
          whatSearch="Messages"
          inputHandler={this.props.findMessages}
          isSearchBarActive={chat.isSearchBarActive}
          headerTitleFunction={() =>
            Navigation.push("ChatList", {
              component: {
                id: 'ChatSettings',
                name: 'ChatSettings',
                options: {
                  topBar: {
                    visible: false,
                    drawBehind: true,
                    animate: false,
                  },
                }
              }
            })}
          rightIconFunction={chat.isSearchBarActive ? () => {
            this.props.closeSearchBar()
            this.props.cleanFindMessages()
          } : () => this.props.openSearchBar()}
          rightIconName={chat.isSearchBarActive ? "times" : "search"}
          chatImage={chat.activeChat.chatImage}
          title={chat.activeChat.chatName}
          subTitle="Last seen recently"
          width={width}
          isAvatarVisible={true}
          leftIconFunction={() => {
            this.props.cleanFindMessages()
            this.props.getChatlistTimestamp()
            this.props.unsetActiveChat()
            Navigation.popToRoot("ChatList")
            if (chat.isSearchBarActive) { this.props.closeSearchBar() }
          }
          }
          chatColor={chat.activeChat.chatColor}
          leftIconName="arrow-left" />
        <MessagesList filteredMessages={messages.filteredMessages} messages={messagesByUserId} userEmail={auth.email} currentSelectedMessage={currentSelectedMessage} />
        {chat.isSearchBarActive ?
          <SearchMessagesBar>
            <Icon.Button
              size={20}
              onPress={() => this.nextMessage(messages.filteredMessages, currentMessageNumber)}
              backgroundColor='d6efef'
              name='arrow-up'
              color={SOFT_BLUE_COLOR}
            />
            <Text
              style={{ marginRight: 10, marginLeft: 10 }}
            >

              {/* to do: refactor this code */}
              {messages.filteredMessages.length} / {messages.filteredMessages.length ? currentMessageNumber + 1 : 0}
            </Text>
            <Icon.Button
              size={20}
              onPress={() => this.prevMessage(messages.filteredMessages, currentMessageNumber)}
              name='arrow-down'
              backgroundColor='d6efef'
              color={SOFT_BLUE_COLOR}
            />
          </SearchMessagesBar> :
          <MessageInput
            handleSendMessage={(message) => this.props.sendMessage(chat.activeChat.chatId, message)}
          />}
      </ChatView>
    );
  }
}

const SearchMessagesBar = styled(View)`
    flex-direction: row;
    padding: 4px;
    margin: 10px;
    margin-bottom: ${height > 800 ? "30px" : "10px"};
    align-items: center;
    justify-content: center;
    border-width: 1;
    border-color: #888;
    background-color: #d6efef;
    border-radius: 5px;
    border-color: ${WHITE_COLOR};
    min-height: 50px;
    `;

const ChatView = styled(KeyboardAvoidingView).attrs({
  behavior: "padding"
})`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const mapDispatchToProps = {
  sendMessage,
  unsetActiveChat,
  getChatlistTimestamp,
  openSearchBar,
  closeSearchBar,
  findMessages,
  cleanFindMessages
};

const selector = (state) => {
  const messagesByUserId = _.get(state, `messages.allMessages[${state.chat.activeChat.chatId}]`, []);
  return ({ auth: state.auth, chat: state.chat, messagesByUserId, messages: state.messages });
}

const mapStateToProps = state => selector(state);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
