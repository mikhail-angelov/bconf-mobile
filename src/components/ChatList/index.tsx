import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { View } from "react-native";

interface IProps {
  chat: [];
}
class ChatList extends React.PureComponent<IProps> {
  public render() {
    return (
      <View>
        {this.props.chat.chats.map(chat => (
          <ChatListItem name={chat.name} id={chat._id} />
        ))}
        <ChatListItem name={"My third chat"} id={3} />
      </View>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  null
)(ChatList);
