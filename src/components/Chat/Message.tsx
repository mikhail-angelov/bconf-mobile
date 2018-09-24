import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import moment from "moment";

const MESSAGE_TIMESTAMP_FORMAT = "MM/DD/YYYY, hh:mm";

export const Message = ({ text, idx }) => {
  const isEven = idx % 2 === 0;

  return (
    <MessageWrapper isEvenMessageCount={isEven}>
      <MessageText isEvenMessageCount={isEven}>{text}</MessageText>
      <DateText isEvenMessageCount={isEven}>
        {moment().format(MESSAGE_TIMESTAMP_FORMAT)}
      </DateText>
    </MessageWrapper>
  );
};

interface IMessageProps {
  isEvenMessageCount: boolean;
}

const MessageWrapper = styled(View).attrs({})`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props: IMessageProps) =>
    props.isEvenMessageCount ? "#dfdfe5" : "rgb(0, 122, 255)"};
  margin-top: 10px;
  flex: none;
  align-self: ${(props: IMessageProps) =>
    props.isEvenMessageCount ? "flex-end" : "flex-start"};
  max-width: 90%;
`;

const MessageText = styled(Text)`
  color: ${(props: IMessageProps) =>
    props.isEvenMessageCount ? "black" : "white"};
  text-align: ${(props: IMessageProps) =>
    props.isEvenMessageCount ? "right" : "left"};
`;

const DateText = styled(Text)`
  font-size: 12px;
  color: ${(props: IMessageProps) =>
    props.isEvenMessageCount ? "grey" : "white"};
`;
