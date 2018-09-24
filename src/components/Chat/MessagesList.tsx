import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Message } from "./Message";

export const MessagesList = ({ messages }) => (
  <MessagesListWrapper>
    {messages.map((message, idx) => (
      <Message key={idx} idx={idx} text={message} />
    ))}
  </MessagesListWrapper>
);

const MessagesListWrapper = styled(View)`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
