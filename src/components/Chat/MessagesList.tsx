import React from "react";
import _ from "lodash";
import { FlatList } from 'react-native';
import styled from "styled-components";
import { Message } from "./Message";
import { WHITE_COLOR } from "../../helpers/styleConstants";

interface IProps {
  userEmail: string;
  messages: object;
  currentSelectedMessage: object;
  filteredMessages: object;
}
export class MessagesList extends React.Component<IProps> {

  public componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToEnd()
    }
    if (prevProps.currentSelectedMessage !== this.props.currentSelectedMessage && this.props.currentSelectedMessage) {
      const indexMessage = _.findIndex(this.props.messages, this.props.currentSelectedMessage)
      console.log(indexMessage)
      this.flatListRef.scrollToIndex({ animated: true, index: indexMessage, viewPosition: 0.5 });
    }
  }

  public componentDidMount() {
    this.scrollToEnd()
  }

  public scrollToEnd = () => {
    this.flatListRef.scrollToEnd();
  }

  public MessagesItem = ({ item }) => {
    const { userEmail, currentSelectedMessage, filteredMessages } = this.props
    return (<Message key={item._id} idx={item._id}
      files={item.links}
      text={item.text} isMyMessage={item.author.email === userEmail}
      timestamp={item.timestamp}
      selectedMessage={filteredMessages.length !== 0 ? _.isEqual(currentSelectedMessage, item) : null} />
    )
  }

  public render() {
    const { messages } = this.props
    return (
      <FlatList
        onScrollToIndexFailed={() => console.log('scroll error')}
        ref={(ref) => { this.flatListRef = ref; }}
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          display: "flex",
          flexDirection: "column",
          backgroundColor: `${WHITE_COLOR}`
        }}
        data={messages}
        renderItem={this.MessagesItem}
      />
    )
  }
}
