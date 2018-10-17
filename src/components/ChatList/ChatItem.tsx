import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "../Avatar";
import styled from "styled-components";
import moment from "moment";

import { MESSAGE_TIMESTAMP_FORMAT } from '../../helpers/constants'
import { GRAY_COLOR } from "../../helpers/styleConstants";

interface IProps {
  name: string;
  lastMessageText: string;
  lastMessageAuthor: string;
  chatColor: string;
  srcImg: string;
  id: number;
  lastMessageTimestamp: number;
  setActiveChatAndGetMessages: () => void;
  navigateToChat: any;
}
export const ChatListItem = ({
  name,
  id,
  setActiveChatAndGetMessages,
  lastMessageText,
  lastMessageAuthor,
  lastMessageTimestamp,
  chatColor,
  navigateToChat,
  srcImg
}: IProps) => {
  return (
    <ChatListItemWrapper
      onPress={() => {
        setActiveChatAndGetMessages()
        navigateToChat()
      }}
    >
      <AvatarSide>
        <Avatar name={name} srcImg={srcImg} chatColor={chatColor} />
      </AvatarSide>
      <LastMessageArea>
        <ChatName>{name}</ChatName>
        <LastMessage>
          <LastMessageAuthor>
            {lastMessageAuthor ? `${lastMessageAuthor}: ` : "Empty chat"}
          </LastMessageAuthor>
          <LastMessageText>{lastMessageText}</LastMessageText>
        </LastMessage>
      </LastMessageArea>
      <Timestamp>
        {lastMessageTimestamp ? moment(lastMessageTimestamp).format(MESSAGE_TIMESTAMP_FORMAT) : ""}
      </Timestamp>
    </ChatListItemWrapper>
  );
};

const ChatListItemWrapper = styled(TouchableOpacity)`
  height: 100px;
  width: 100%;
  display: flex;
  flexDirection: row;
  padding: 0 10px 10px 0px;
  backgroundColor: #fff;
  &:active {
    backgroundColor: #fff;
  }
`;

const AvatarSide = styled(View)`
  width: 25%;
  height: 100%;
  display: flex;
  alignItems: center;
  justifyContent: center;
`;

const LastMessageArea = styled(View)`
  width: 55%;
  height: 100%;
  paddingTop: 20px;
  paddingLeft:5px;
`;

const ChatName = styled(Text)`
  fontWeight: 500;
  fontSize: 18px;
`;

const LastMessageAuthor = styled(Text)`
  fontSize: 14px;
`;

const LastMessageText = styled(Text)`
  fontSize: 14px;
  color: ${GRAY_COLOR};
`;

const LastMessage = styled(View)`
  fontSize: 14px;
  display: flex;
  flexDirection: row;
  marginTop: 2px;
`;

const Timestamp = styled(Text)`
  width: 20%;
  height: 100%;
  fontSize: 12px;
  color: ${GRAY_COLOR};
  textAlign: right;
  paddingTop: 20px;
  paddingRight: 10px;
`;

