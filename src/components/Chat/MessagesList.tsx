import React from "react";
import _ from "lodash";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { Message } from "./Message";

export const MessagesList = ({ messages, userEmail }) => (
  <MessagesListWrapper>
    {_.map(messages, message => (
      <Message key={message._id} idx={message._id} 
      text={message.text} isMyMessage={message.author.email === userEmail}
      timestamp={message.timestamp} />
    ))}
  </MessagesListWrapper>
);

const MessagesListWrapper = styled(ScrollView)`
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  backgroundColor: #FFF;
`;
