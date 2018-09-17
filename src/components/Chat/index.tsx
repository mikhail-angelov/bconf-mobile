import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

export const Chat = () => {
  return (
    <ChatView>
      <Text>Here is the chat</Text>
    </ChatView>
  );
};

const ChatView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
