import React from "react";
import _ from "lodash";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { Message } from "./Message";
import { WHITE_COLOR } from "../../helpers/styleConstants";

interface IProps {
  userEmail: string;
  messages: object;
}
export class MessagesList extends React.Component<IProps> {
  public scrollToEnd = () => {
    this.scrollView.scrollToEnd();
  }
  public render() {
    const { messages, userEmail } = this.props
    return (
      <ScrollView
        style={{
          flex: 1,
          padding: 20,
          paddingTop: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: `${WHITE_COLOR}`
        }}
        ref={(scrollView) => { this.scrollView = scrollView }}
        onContentSizeChange={() => {
          this.scrollToEnd()
        }}>
        {_.map(messages, message => (
          <Message key={message._id} idx={message._id}
            files={message.links}
            text={message.text} isMyMessage={message.author.email === userEmail}
            timestamp={message.timestamp} />
        ))
        }
      </ScrollView >)
  }
}
