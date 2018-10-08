import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import moment from "moment";

import { MESSAGE_TIMESTAMP_FORMAT } from '../../helpers/constants'

export const Message = ({ text, idx, isMyMessage, timestamp }) => {

  return (
    <MessageWrapper isMyMessage={isMyMessage}>
      <MessageText isMyMessage={isMyMessage}>{text}</MessageText>
      <DateText isMyMessage={isMyMessage}>
        {moment(timestamp).format(MESSAGE_TIMESTAMP_FORMAT)}
      </DateText>
    </MessageWrapper>
  );
};

interface IMessageProps {
  isMyMessage: boolean;
}

const MessageWrapper = styled(View).attrs({})`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props: IMessageProps) =>
    props.isMyMessage ? "#dfdfe5" : "rgb(0, 122, 255)"};
  margin-top: 10px;
  flex: none;
  align-self: ${(props: IMessageProps) =>
    props.isMyMessage ? "flex-end" : "flex-start"};
  max-width: 90%;
`;

const MessageText = styled(Text)`
  color: ${(props: IMessageProps) =>
    props.isMyMessage ? "black" : "white"};
  text-align: ${(props: IMessageProps) =>
    props.isMyMessage ? "right" : "left"};
`;

const DateText = styled(Text)`
  font-size: 12px;
  color: ${(props: IMessageProps) =>
    props.isMyMessage ? "grey" : "white"};
`;
