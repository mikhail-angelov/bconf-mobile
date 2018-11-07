import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import _ from "lodash"
import { ScrollView, Animated, Dimensions, View, RefreshControl, Text } from "react-native";
import styled from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { logout } from "../../actions/auth";
import { WHITE_COLOR, SOFT_BLUE_COLOR, BLACK_COLOR } from "../../helpers/styleConstants";
import { getMessages, setActiveChat, getChats, refreshChatList } from "../../actions/chat";
import { Navigation } from "react-native-navigation";
import ChatMenu from "../ChatMenu";
import Header from "../Header";
import AppearedButton from "../CommonUIElements/AppearedButton";

const { width } = Dimensions.get('window')
interface IProps {
  chat: [];
  getMessages: (_id) => void;
  setActiveChat: ({ chatId, name, chatColor, chatImage }) => void;
  _id: string;
  name: string;
  chatColor: string;
  chats: object;
  chatMenuItems: object;
  width: number;
  goHome: () => void;
  logout: () => void;
  getChats: () => void;
  refreshChatList: () => void;
  refreshingChatList: boolean;
}

interface IState {
  isMenuOpen: boolean;
  isAddChatButtonVisible: boolean;
  refreshing: boolean;
  animated: any;
  addChatButtonAnimate: any;
  currentChatMenuScrollPosition: number;
}

class ChatList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      animated: new Animated.Value(0),
      isAddChatButtonVisible: true,
      addChatButtonAnimate: new Animated.Value(0),
      currentChatMenuScrollPosition: 0,
      refreshing: false,
    };
  }

  public componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.chat.activeChat, this.props.chat.activeChat)) {
      this.props.getChats()
    }
  }

  public showChatMenu = () => {
    this.setState({ isMenuOpen: true })
    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  public showAddChatButton = () => {
    this.setState({ isAddChatButtonVisible: true })
    Animated.timing(this.state.addChatButtonAnimate, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  public closeAddChatButton = () => {
    Animated.timing(this.state.addChatButtonAnimate, {
      toValue: 1,
      duration: 500,
    }).start(() => this.setState({ isAddChatButtonVisible: false }));
  };

  public toggleAddChatButton = (event) => {
    const { currentChatMenuScrollPosition } = this.state
    if (currentChatMenuScrollPosition < event.nativeEvent.contentOffset.y) {
      this.closeAddChatButton()
    } else {
      this.showAddChatButton()
    }
    this.setState({ currentChatMenuScrollPosition: event.nativeEvent.contentOffset.y })
  }

  public closeChatMenu = () => {
    Animated.timing(this.state.animated, {
      toValue: 0,
      duration: 500,
    }).start(() => this.setState({ isMenuOpen: false }));
  };

  public setActiveChatAndGetMessages(chatProperties) {
    this.props.setActiveChat(chatProperties)
    this.props.getMessages(chatProperties.chatId)
  }

  // public resetActiveChat = () => {
  //   this.props.setActiveChat(null, null, null)
  // }

  public render() {
    return (
      <View>
        <ChatMenu
          width={width}
          closeMenu={this.closeChatMenu}
          isMenuOpen={this.state.isMenuOpen}
          animated={this.state.animated}
          chatMenuItems={[{ title: "Chats", handler: this.closeChatMenu }, { title: "Logout", handler: this.props.logout }]}
        />
        <ChatListWrapper width={width}>
          <Header
            title="Chats"
            leftIconFunction={this.showChatMenu}
            rightIconFunction={() =>
              Navigation.push("ChatList", {
                component: {
                  name: 'ProfileSettings',
                  options: {
                    topBar: {
                      visible: false
                    },
                  }
                }
              })}
            leftIconName="align-left"
            rightIconName="user" />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.props.chat.refreshingChatList}
                onRefresh={() => this.props.refreshChatList()}
              />
            }
            onScrollBeginDrag={(event) => this.toggleAddChatButton(event)}>
            {this.props.chat.chats.map(chat => (
              <ChatListItem
                navigateToChat={() =>
                  Navigation.push("ChatList", {
                    component: {
                      id: 'Chat',
                      name: 'Chat',
                      options: {
                        topBar: {
                          visible: false
                        },
                      }
                    }
                  })}
                name={chat.chatName}
                id={chat.chatId}
                chatImage={chat.chatImage}
                chatColor={chat.chatColor}
                lastMessageText={chat.lastMessageText}
                lastMessageAuthor={chat.lastMessageAuthor}
                lastMessageTimestamp={chat.lastMessageTimestamp}
                setActiveChatAndGetMessages={() =>
                  this.setActiveChatAndGetMessages({ chatId: chat.chatId, chatName: chat.chatName, chatColor: chat.chatColor, chatImage: chat.chatImage })}
              />
            ))}
          </ScrollView>
          <AppearedButton
            isButtonVisible={this.state.isAddChatButtonVisible}
            buttonAnimate={this.state.addChatButtonAnimate}
            buttonHandler={() => {
              Navigation.push("ChatList", {
                component: {
                  name: 'AddChat',
                  options: {
                    topBar: {
                      visible: false
                    },
                  }
                }
              })
            }}
            iconName="pen"
            iconSize={22}
            reverseAppear={true}
          />
        </ChatListWrapper>
      </View >
    );
  }
}

const ChatListWrapper = styled(View)`
        display: flex;
        flexDirection: column;
        backgroundColor: ${WHITE_COLOR};
        borderLeftWidth: 3;
        borderColor: rgba(0,0,0,0.05);
        height: 100%;
        position: relative;
      `;

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

const mapDispatchToProps = {
  getMessages,
  setActiveChat,
  logout,
  getChats,
  refreshChatList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
