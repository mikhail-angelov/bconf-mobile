import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView, Animated, Dimensions, View, StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { getMessages, setActiveChat } from "../../actions/chat";
import Chat from "../Chat";
import Header from "../Header";

const { width } = Dimensions.get('window')
interface IProps {
  chat: [];
  getMessages: (_id) => void;
  setActiveChat: (_id, name) => void;
  scroller: () => void;
  messageListView: boolean;
  _id: string;
  name: string;
}

class ChatList extends React.PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      messageListView: false
    };
  }
  private scrollX = new Animated.Value(0);

  public scrollToChat = () => {
    this.scroller.scrollTo({ x: width });
  };

  public scrollToChatList = () => {
    this.scroller.scrollTo({ x: 0 });
  };

  public setActiveChatAndGetMessages(chatId, chatName) {
    this.setState({ messageListView: true })
    this.props.setActiveChat(chatId, chatName)
    this.props.getMessages(chatId)
    this.scrollToChat()
  }

  public resetActiveChat() {
    this.scrollToChatList()
    if (width === 0) {
      this.props.setActiveChat(null, null)
      this.setState({ messageListView: false })
    }
  }

  public render() {
    const position: any = Animated.divide(this.scrollX, width)
    return (
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
          <TouchableOpacity style={{ width }}>
            <Header title="Chats" width={width} />
            <ScrollView
              style={{ width }}>
              {this.props.chat.chats.map(chat => (
                <ChatListItem
                  name={chat.name}
                  id={chat._id}
                  lastMessageText={chat.lastMessageText}
                  lastMessageAuthor={chat.lastMessageAuthor}
                  lastMessageTimestamp={chat.lastMessageTimestamp}
                  setActiveChatAndGetMessages={() => this.setActiveChatAndGetMessages(chat._id, chat.name)}
                />
              ))}
            </ScrollView>
          </TouchableOpacity>
          {this.state.messageListView ? <Chat width={width} backToChatList={() => this.resetActiveChat()} ></Chat> : null}
        </ScrollView>
      </ChatListWrapper>
    );
  }
}

const ChatListWrapper = styled(View)`
  display: flex;
  flexDirection: column;
`;

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

const mapDispatchToProps = {
  getMessages,
  setActiveChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
