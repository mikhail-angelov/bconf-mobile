import React from "react";
import _ from "lodash";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { Message } from "./Message";

export const MessagesList = ({ messages }) => (
  <MessagesListWrapper>
    {_.map(messages, message => (
      <Message key={message._id} idx={message._id} text={message.text} />
    ))}
  </MessagesListWrapper>
);

const MessagesListWrapper = styled(ScrollView)`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
