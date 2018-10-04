import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView, Animated, Dimensions, PixelRatio } from "react-native";
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

  private scrollX = new Animated.Value(0);
  
  public scrollToChat = () => {
    this.scroller.scrollTo({x:width});
  };

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
            this.props.setActiveChat(null)
          }
        }}
      >
        <ScrollView
          style={{ width }}>
          {this.props.chat.chats.map(chat => (
            <ChatListItem
              name={chat.name}
              id={chat._id}
              setActiveChat={() => this.props.setActiveChat(chat._id)}
              getMessages={() => this.props.getMessages(chat._id)}
              scrollToChat={() => this.scrollToChat()}
            />
          ))}
        </ScrollView>
        {this.props.chat.activeChat ? <Chat width={width}></Chat> : null}
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
