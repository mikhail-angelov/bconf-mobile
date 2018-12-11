import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import _ from "lodash"
import { ScrollView, Animated, Dimensions, View, RefreshControl, Platform } from "react-native";
import styled from "styled-components";
import { logout } from "../../actions/auth";
import { cleanFindMessagesInputValue } from "../../actions/messages";
import { WHITE_COLOR, SOFT_BLUE_COLOR, BLACK_COLOR } from "../../helpers/styleConstants";
import { getMessages, setActiveChat, getChats, refreshChatList, closeSearchBar } from "../../actions/chat";
import { Navigation } from "react-native-navigation";
import ChatMenu from "../ChatMenu";
import Header from "../Header";
import AppearedButton from "../CommonUIElements/AppearedButton";
import selector from "./selector";
import firebase from "react-native-firebase";

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
  auth: object;
  lastChatsTimestamp: object;
  width: number;
  goHome: () => void;
  logout: () => void;
  getChats: () => void;
  refreshChatList: () => void;
  closeSearchBar: () => void;
  cleanFindMessagesInputValue: () => void;
  refreshingChatList: boolean;
}

interface IState {
  isMenuOpen: boolean;
  isAddChatButtonVisible: boolean;
  refreshing: boolean;
  animated: any;
  currentChatMenuScrollPosition: number;
}

class ChatList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      animated: new Animated.Value(0),
      isAddChatButtonVisible: true,
      currentChatMenuScrollPosition: 0,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      // Process your message as required
      console.log("!!!!!Message received", message)
    });
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log("++++", notification)
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    const channel = new firebase.notifications.Android.Channel('channel', 'Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
    firebase.notifications().android.createChannel(channel);


    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const notificationLocal = notification
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('channelId')
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications().displayNotification(notificationLocal)
    });
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log("FCM token has been changed")
    });
  }
  componentWillUnmount() {
    console.log("Component unmounted!!!!!!")
    this.notificationDisplayedListener();
    this.notificationListener();
    this.onTokenRefreshListener();
    this.messageListener();
  }

  public showChatMenu = () => {
    this.setState({ isMenuOpen: true })
    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  public toggleAddChatButton = (event) => {
    const { currentChatMenuScrollPosition, isAddChatButtonVisible } = this.state
    if (event.nativeEvent.contentOffset.y - currentChatMenuScrollPosition > 10) {
      this.setState({ isAddChatButtonVisible: false })
    } else {
      this.setState({ isAddChatButtonVisible: true })
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
    this.props.setActiveChat(chatProperties);
  }

  public render() {
    return (
      <View>
        <ChatMenu
          width={width}
          closeMenu={this.closeChatMenu}
          isMenuOpen={this.state.isMenuOpen}
          animated={this.state.animated}
          chatMenuItems={[{ title: "Chats", handler: this.closeChatMenu, key: "chats" }, { title: "Logout", handler: this.props.logout, key: "logout" }]}
        />
        <ChatListWrapper width={width} style={{ zIndex: 0 }}>
          <Header
            title="Chats"
            leftIconFunction={this.showChatMenu}
            rightIconFunction={() =>
              Navigation.push("ChatList", {
                component: {
                  name: 'ProfileSettings',
                  options: {
                    topBar: {
                      visible: false,
                      drawBehind: true,
                      animate: false,
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
            {_.map(this.props.sortedChats, chat => (
              <ChatListItem
                navigateToChat={() =>
                  Navigation.push("ChatList", {
                    component: {
                      id: 'Chat',
                      name: 'Chat',
                      options: {
                        topBar: {
                          visible: false,
                          drawBehind: true,
                          animate: false,
                        },
                      }
                    }
                  })}
                cleanFindMessagesAndCloseFindBar={() => {
                  this.props.cleanFindMessagesInputValue()
                  this.props.closeSearchBar()
                }}
                name={chat.chatName}
                id={chat.chatId}
                key={chat.chatId}
                chatImage={chat.chatImage}
                chatColor={chat.chatColor}
                lastMessageText={chat.lastMessageText}
                lastMessageAuthor={chat.lastMessageAuthor}
                lastMessageTimestamp={chat.lastMessageTimestamp}
                haveNewMessages={!!(this.props.chat.lastChatsTimestamp &&
                  chat.lastMessageTimestamp - this.props.chat.lastChatsTimestamp[chat.chatId] > 0 &&
                  chat.lastMessageAuthorId !== this.props.auth.id)}
                setActiveChatAndGetMessages={() =>
                  this.setActiveChatAndGetMessages({ chatId: chat.chatId, chatName: chat.chatName, chatColor: chat.chatColor, chatImage: chat.chatImage })}
              />
            ))}
          </ScrollView>
          <AppearedButton
            isButtonVisible={this.state.isAddChatButtonVisible}
            buttonHandler={() => {
              Navigation.push("ChatList", {
                component: {
                  name: 'AddChat',
                  options: {
                    topBar: {
                      visible: false,
                      drawBehind: true,
                      animate: false,
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
        flex-direction: column;
        background-color: ${WHITE_COLOR};
        border-left-width: 3;
        border-color: rgba(0,0,0,0.05);
        height: 100%;
        position: relative;
      `;

const mapStateToProps = state => selector(state)

const mapDispatchToProps = {
  getMessages,
  setActiveChat,
  logout,
  getChats,
  refreshChatList,
  cleanFindMessagesInputValue,
  closeSearchBar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
