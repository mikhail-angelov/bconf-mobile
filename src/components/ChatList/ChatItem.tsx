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
      <AvatarSide>
        <Avatar>
          <Text>Avatar</Text>
        </Avatar>
      </AvatarSide>
      <Center>
        <ChatName>{name}</ChatName>
        <Text>Last Message</Text>
      </Center>
      <RightSide>
        <Text>30 sep</Text>
      </RightSide>
    </ChatListItemWrapper>
  );
};

const ChatListItemWrapper = styled(TouchableOpacity)`
  height: 100px;
  width: 100%;
  border: 1px solid black;
  display: flex;
  flexDirection: row;
`;

const AvatarSide = styled(View)`
  width: 25%;
  height: 100%;
  display: flex;
  alignItems: center;
  justifyContent: center;
`;

const Avatar = styled(View)`
  height: 80%;
  width: 80%;
  backgroundColor: #fff;
  borderRadius: 50;
  borderWidth: 2;
  display: flex;
  alignItems: center;
  shadowColor: #000;
  justifyContent: center;
  shadowOpacity: 0.8;
  shadowRadius: 2;
`;

const Center = styled(View)`
  width: 60%;
  height: 100%;
  padding: 10px;
`;

const ChatName = styled(Text)`
  fontWeight: 700;
`;

const RightSide = styled(View)`
  width: 20%;
  height: 100%;
`;
