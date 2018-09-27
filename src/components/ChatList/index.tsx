import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import { getMessages, setActiveChat } from "../../actions/chat";

interface IProps {
  chat: [];
  getMessages: (_id) => void;
  setActiveChat: (_id) => void;
  activeChat: string;
  _id: string;
}
class ChatList extends React.PureComponent<IProps> {
  public render() {
    return (
      <ScrollView>
        {this.props.chat.chats.map(chat => (
          <ChatListItem
            name={chat.name}
            id={chat._id}
            setActiveChat={() => this.props.setActiveChat(chat._id)}
            getMessages={() => this.props.getMessages(chat._id)}
          />
        ))}
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
