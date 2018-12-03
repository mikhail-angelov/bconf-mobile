import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "../Avatar";
import { BLACK_COLOR, WHITE_COLOR, GRAY_COLOR, SOFT_BLUE_COLOR } from "../../helpers/styleConstants";
import styled from "styled-components";
import moment from "moment";

import { MESSAGE_TIMESTAMP_FORMAT } from '../../helpers/constants'

interface IProps {
  name: string;
  lastMessageText: string;
  lastMessageAuthor: string;
  chatColor: string;
  chatImage: string;
  id: number;
  lastMessageTimestamp: number;
  setActiveChatAndGetMessages: () => void;
  saveChatlistTimestamp: () => void;
  cleanFindMessagesAndCloseFindBar: () => void;
  navigateToChat: any;
  haveNewMessages: boolean;
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
  chatImage,
  saveChatlistTimestamp,
  haveNewMessages,
  cleanFindMessagesAndCloseFindBar
}: IProps) => {
  return (
    <ChatListItemWrapper
      onPress={() => {
        cleanFindMessagesAndCloseFindBar()
        setActiveChatAndGetMessages()
        navigateToChat()
        saveChatlistTimestamp()
      }}
    >
      <AvatarSide>
        <Avatar name={name} srcImg={chatImage} avatarColor={chatColor} />
      </AvatarSide>
      <LastMessageArea>
        <ChatName>
          <ChatNameText>
            {name}
          </ChatNameText>
          {haveNewMessages && <Indicator />}
        </ChatName>
        <LastMessage>
          {/* <LastMessageAuthor>
            {lastMessageAuthor ? `${lastMessageAuthor}: ` : "Empty chat"}
          </LastMessageAuthor> */}
          <LastMessageText>{lastMessageAuthor ? lastMessageText : "Empty chat"}</LastMessageText>
        </LastMessage>
      </LastMessageArea>
      <Timestamp>
        {lastMessageTimestamp ? moment(lastMessageTimestamp).format(MESSAGE_TIMESTAMP_FORMAT) : ""}
      </Timestamp>
    </ChatListItemWrapper>
  );
};

const ChatListItemWrapper = styled(TouchableOpacity)`
  height: 110px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 10px 10px 0px;
  background-color: ${WHITE_COLOR};
  &:active {
          background-color: ${WHITE_COLOR};
    }
`;

const AvatarSide = styled(View)`
  width: 25%;
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  shadow-radius: 5;
  shadow-opacity: 0.3;
  shadow-offset: {width: 2, height: 2};
  shadow-color: ${BLACK_COLOR};
`;

const LastMessageArea = styled(View)`
  width: 50%;
  height: 100%;
  padding-top: 20px;
  padding-left:5px;
`;

const ChatNameText = styled(Text)`
  font-weight: 500;
  font-size: 18px;
`;

const LastMessageAuthor = styled(Text)`
  font-size: 14px;
`;

const LastMessageText = styled(Text)`
  font-size: 14px;
  color: ${GRAY_COLOR};
`;

const ChatName = styled(View)`
  display: flex;
  flex-direction: row;
`;

const LastMessage = styled(View)`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

const Indicator = styled(View)`
  margin-top: 7px;
  margin-left: 5px;
  width: 7px;
  height: 7px;
  border-radius: 20px;
  background-color: ${SOFT_BLUE_COLOR};
  border-color: ${BLACK_COLOR};
  border-width: 0.3;
`;

const Timestamp = styled(Text)`
  width: 25%;
  height: 100%;
  font-size: 12px;
  color: ${GRAY_COLOR};
  text-align: right;
  padding-top: 20px;
  padding-right: 10px;
  letter-spacing: 1px;
`;

