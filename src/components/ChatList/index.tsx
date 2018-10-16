import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView, Animated, Dimensions, View, StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { goHome } from "../../navigation/navigation";
import { logout } from "../../actions/auth";
import { getMessages, setActiveChat } from "../../actions/chat";
import { Navigation } from "react-native-navigation";
import ChatMenu from "../ChatMenu";
import Chat from "../Chat";
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
}

class ChatList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  public showChatMenu = () => {
    this.setState({ isMenuOpen: true })
  };

  public closeChatMenu = () => {
    this.setState({ isMenuOpen: false })
  };

  public setActiveChatAndGetMessages(chatId, chatName, chatColor) {
    this.props.setActiveChat(chatId, chatName, chatColor)
    this.props.getMessages(chatId)
  }

  public resetActiveChat = () => {
    this.props.setActiveChat(null, null, null)
  }

  public render() {
    return (
      <View>
        {this.state.isMenuOpen &&
          <ChatMenu width={width} closeMenu={this.closeChatMenu}
            chatMenuItems={[{ title: "Chats", handler: this.closeChatMenu }, { title: "Logout", handler: this.props.logout }]}
          />}
        <ChatListWrapper width={width}>
          <Header title="Chats" showMenu={this.showChatMenu} />
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
