import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from "styled-components";
import { Message } from "./Message";

export const MessagesList = ({ messages }) => (
  <MessagesListWrapper>
    {messages.map((message, idx) => {
      console.log(idx);
      return <Message key={idx} idx={idx} text={message} />;
    })}
  </MessagesListWrapper>
);

const MessagesListWrapper = styled(View)`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
