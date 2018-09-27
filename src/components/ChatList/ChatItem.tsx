import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import styled from "styled-components";
interface IProps {
  name: string;
  id: number;
  setActiveChat: () => void;
  getMessages: () => void;
}
export const ChatListItem = ({
  name,
  id,
  setActiveChat,
  getMessages
}: IProps) => {
  return (
    <ChatListItemWrapper
      onPress={() => {
        setActiveChat();
        getMessages();
        Navigation.push("ChatList", {
          component: {
            name: "Chat",
            passProps: {
              chatId: id
            }
          }
        });
      }}
    >
      <Text>{name}</Text>
    </ChatListItemWrapper>
  );
};

const ChatListItemWrapper = styled(TouchableOpacity)`
  height: 70px;
  width: 100%;
  border: 1px solid grey;
`;
