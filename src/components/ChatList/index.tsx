import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView, Animated, Dimensions } from "react-native";
import { getMessages, setActiveChat } from "../../actions/chat";
import Chat from "../Chat";

const { width } = Dimensions.get('window')
interface IProps {
  chat: [];
  getMessages: (_id) => void;
  setActiveChat: (_id) => void;
  scroller: () => void;
  activeChat: string;
  _id: string;
}

class ChatList extends React.PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      activeChat: ""
    };
  }
  private scrollX = new Animated.Value(0);

  public scrollToChat = () => {
    this.scroller.scrollTo({ x: width });
  };

  public setActiveChatAndGetMessages(chatId) {
    this.setState({ activeChat: chatId })
    this.props.getMessages(chatId)
    this.scrollToChat()
  }

  public render() {
    const position: any = Animated.divide(this.scrollX, width)
    return (
      <ScrollView
        ref={scroller => this.scroller = scroller}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: this.scrollX } } }
        ])}
        scrollEventThrottle={16}
        onMomentumScrollEnd={() => {
          if (position.__getValue() === 0) {
            this.setState({ activeChat: "" })
          }
        }}
      >
        <ScrollView
          style={{ width }}>
          {this.props.chat.chats.map(chat => (
            <ChatListItem
              name={chat.name}
              id={chat._id}
              setActiveChatAndGetMessages={() => this.setActiveChatAndGetMessages(chat._id)}
            />
          ))}
        </ScrollView>
        {this.state.activeChat ? <Chat width={width}></Chat> : null}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

const mapDispatchToProps = {
  getMessages,
  setActiveChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
