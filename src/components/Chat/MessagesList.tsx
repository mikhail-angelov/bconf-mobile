import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from "styled-components";

export const MessagesList = ({ messages }) => (
  <MessagesListWrapper>
    {messages.map((message, idx) => (
      <Text key={idx}>{message}</Text>
    ))}
  </MessagesListWrapper>
);

const MessagesListWrapper = styled(View)`
  flex: 1;
`;
