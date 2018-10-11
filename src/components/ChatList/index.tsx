import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView, Animated, Dimensions, View, StatusBar, TouchableOpacity } from "react-native";
import SideMenu from 'react-native-side-menu';
import styled from "styled-components";
import { goHome } from "../../navigation/navigation";
import { logout } from "../../actions/auth";
import { getMessages, setActiveChat } from "../../actions/chat";
import ChatMenu from "../ChatMenu";
import Chat from "../Chat";
import Header from "../Header";

const { width } = Dimensions.get('window')
interface IProps {
  chat: [];
  getMessages: (_id) => void;
  setActiveChat: (_id, name, chatColor) => void;
  messageListView: boolean;
  _id: string;
  name: string;
  chatColor: string;
  scroller: object;
  chats: object;
  width: number;
  goHome: () => void;
  logout: () => void;
}

interface IState {
  isMenuOpen: boolean;
  messageListView: boolean;
}

class ChatList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      messageListView: false,
      isMenuOpen: false
    };
  }
  public scrollX = new Animated.Value(0);

  public scrollToChat = () => {
    this.scroller.scrollTo({ x: width });
  };

  public scrollToChatList = () => {
    this.scroller.scrollTo({ x: 0 });
  };

  public setActiveChatAndGetMessages(chatId, chatName, chatColor) {
    this.setState({ messageListView: true })
    this.props.setActiveChat(chatId, chatName, chatColor)
    this.props.getMessages(chatId)
    this.scrollToChat()
  }

  public resetActiveChat = () => {
    this.scrollToChatList()
    this.props.setActiveChat(null, null, null)
    this.setState({ messageListView: false })
  }

  public toggleMenu = (bool) => {
    this.setState({ isMenuOpen: bool || !this.state.isMenuOpen })
  }

  public render() {
    const position: any = Animated.divide(this.scrollX, width)
    return (
      <SideMenu
        menu={<ChatMenu
          chatMenuItems={[{ title: "Chats", handler: goHome }, { title: "Logout", handler: this.props.logout }]} />}
        isOpen={this.state.isMenuOpen}
        onChange={this.toggleMenu}
      >
        <ChatListWrapper>
          <ScrollView
            style={{
              height: '100%'
            }}
            ref={scroller => this.scroller = scroller}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.scrollX } } }
            ])}
            scrollEventThrottle={16}
            onMomentumScrollEnd={() => {
              if (position.__getValue() === 0) {
                this.resetActiveChat()
              }
            }}
          >
            <View style={{ width }}>
              <Header title="Chats" width={width} toggleMenu={() => this.toggleMenu(true)} />
              <ScrollView
                style={{ width }}>
                {this.props.chat.chats.map(chat => (
                  <ChatListItem
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
            </View>
            {this.state.messageListView ? <Chat width={width} backToChatList={() => this.scrollToChatList()} ></Chat> : null}
          </ScrollView>
        </ChatListWrapper>
      </SideMenu >
    );
  }
}

const ChatListWrapper = styled(View)`
  display: flex;
  flexDirection: column;
  backgroundColor: #fff;
  borderLeftWidth: 3;
  borderColor: rgba(0,0,0,0.05);
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
