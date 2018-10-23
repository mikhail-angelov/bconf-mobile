import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView, Animated, Dimensions, View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { logout } from "../../actions/auth";
import { WHITE_COLOR, SOFT_BLUE_COLOR, BLACK_COLOR } from "../../helpers/styleConstants";
import { getMessages, setActiveChat } from "../../actions/chat";
import { Navigation } from "react-native-navigation";
import ChatMenu from "../ChatMenu";
import Header from "../Header";

const { width } = Dimensions.get('window')
interface IProps {
  chat: [];
  getMessages: (_id) => void;
  setActiveChat: ({ _id, name, chatColor, chatImage }) => void;
  _id: string;
  name: string;
  chatColor: string;
  chats: object;
  chatMenuItems: object;
  width: number;
  goHome: () => void;
  logout: () => void;
}

interface IState {
  isMenuOpen: boolean;
  isAddChatButtonVisible: boolean;
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
    };
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
            onScrollBeginDrag={(event) => this.toggleAddChatButton(event)}>
            {this.props.chat.chats.map(chat => (
              <ChatListItem
                navigateToChat={() =>
                  Navigation.push("ChatList", {
                    component: {
                      name: 'Chat',
                      options: {
                        topBar: {
                          visible: false
                        },
                      }
                    }
                  })}
                name={chat.name}
                id={chat._id}
                srcImg={chat.chatImage}
                chatColor={chat.chatColor}
                lastMessageText={chat.lastMessageText}
                lastMessageAuthor={chat.lastMessageAuthor}
                lastMessageTimestamp={chat.lastMessageTimestamp}
                setActiveChatAndGetMessages={() =>
                  this.setActiveChatAndGetMessages({ chatId: chat._id, chatName: chat.name, chatColor: chat.chatColor, chatImage: chat.chatImage })}
              />
            ))}
          </ScrollView>
          <AddChatButtonWrap
            onPress={() =>
              Navigation.push("ChatList", {
                component: {
                  name: 'AddChat',
                  options: {
                    topBar: {
                      visible: false
                    },
                  }
                }
              })}>
            <AddChatButton
              style={{
                display: this.state.isAddChatButtonVisible ? "flex" : 'none',
                transform: [{
                  translateY: this.state.addChatButtonAnimate.interpolate(
                    {
                      inputRange: [0, 1],
                      outputRange: [0, 100],
                    }
                  )
                }]
              }}>
              <Icon
                size={22}
                name="pen"
                backgroundColor={WHITE_COLOR}
                color={WHITE_COLOR} />
            </AddChatButton>
          </AddChatButtonWrap>
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

const AddChatButton = styled(Animated.View)`
        padding: 20px;
        position: absolute;
        right: 20;
        bottom: 20;
        backgroundColor: ${SOFT_BLUE_COLOR};
        border-radius: 50;
        shadowRadius: 3; 
        shadowOpacity: 0.2; 
        shadowOffset: {width: 1, height: 1}; 
        shadowColor: ${BLACK_COLOR};
      `;

const AddChatButtonWrap = styled(TouchableOpacity)``;

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

const mapDispatchToProps = {
  getMessages,
  setActiveChat,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
