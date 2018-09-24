import React from "react";
import { ChatListItem } from "./ChatItem";
import { connect } from "react-redux";
import { View } from "react-native";

interface IProps {
  chats: [];
}
class ChatList extends React.PureComponent<IProps> {
  public render() {
    return (
      <View>
        <ChatListItem name={"My first chat"} id={1} />
        <ChatListItem name={"My second chat"} id={2} />
        <ChatListItem name={"My third chat"} id={3} />
      </View>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth, chat: state.chats });

export default connect(
  mapStateToProps,
  null
)(ChatList);
