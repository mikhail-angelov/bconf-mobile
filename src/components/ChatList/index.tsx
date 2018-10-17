import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView, Animated, Dimensions, View } from "react-native";
import styled from "styled-components";
import { logout } from "../../actions/auth";
import { getMessages, setActiveChat } from "../../actions/chat";
import { Navigation } from "react-native-navigation";
import ChatMenu from "../ChatMenu";
import Header from "../Header";

const { width } = Dimensions.get('window')
interface IProps {
  chat: [];
  getMessages: (_id) => void;
  setActiveChat: (_id, name, chatColor) => void;
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
  animated: any;
}

class ChatList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      animated: new Animated.Value(0),
    };
  }

  public showChatMenu = () => {
    this.setState({ isMenuOpen: true })
    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  public closeChatMenu = () => {
    Animated.timing(this.state.animated, {
      toValue: 0,
      duration: 500,
    }).start(() => this.setState({ isMenuOpen: false }));
  };

  public setActiveChatAndGetMessages(chatId, chatName, chatColor) {
    this.props.setActiveChat(chatId, chatName, chatColor)
    this.props.getMessages(chatId)
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
          <ScrollView>
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
                srcImg={"https://www.stickees.com/files/avatars/male-avatars/1697-andrew-sticker.png"}
                chatColor={chat.chatColor}
                lastMessageText={chat.lastMessageText}
                lastMessageAuthor={chat.lastMessageAuthor}
                lastMessageTimestamp={chat.lastMessageTimestamp}
                setActiveChatAndGetMessages={() => this.setActiveChatAndGetMessages(chat._id, chat.name, chat.chatColor)}
              />
            ))}
          </ScrollView>
        </ChatListWrapper>
      </View>
    );
  }
}

const ChatListWrapper = styled(View)`
        display: flex;
        flexDirection: column;
        backgroundColor: #fff;
        borderLeftWidth: 3;
        borderColor: rgba(0,0,0,0.05);
        height: 100%;
      `;

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
