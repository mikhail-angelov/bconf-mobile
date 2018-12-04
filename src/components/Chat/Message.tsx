import React from "react";
import styled from "styled-components";
import { BLACK_COLOR, WHITE_COLOR, SOFT_BLUE_COLOR } from "../../helpers/styleConstants";
import { View, Text, Image, Dimensions } from "react-native";
import _ from "lodash"
import moment from "moment";

import { MESSAGE_TIMESTAMP_FORMAT } from '../../helpers/constants'

const { width } = Dimensions.get('window')

export const Message = ({ text, files, idx, isMyMessage, timestamp, selectedMessage }) => {
  return (
    <View style={{ backgroundColor: selectedMessage ? SOFT_BLUE_COLOR : "transparent", borderRadius: 10 }}>
      <MessageWrapper isMyMessage={isMyMessage}>
        {_.map(files, fileUrl => (
          <MessageImage
            source={{ uri: fileUrl }}
          />))}
        <MessageText isMyMessage={isMyMessage}>{text}</MessageText>
        <DateText isMyMessage={isMyMessage}>
          {moment(timestamp).format(MESSAGE_TIMESTAMP_FORMAT)}
        </DateText>
      </MessageWrapper>
    </View>
  );
};

interface IMessageProps {
  isMyMessage: boolean;
  selectedMessage: any;
}

const MessageWrapper = styled(View).attrs({})`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props: IMessageProps) =>
    props.isMyMessage ? "#d6efef" : "#fef8e5"};
  margin: 5px;
  flex: none;
  align-self: ${(props: IMessageProps) =>
    props.isMyMessage ? "flex-end" : "flex-start"};
  max-width: 90%;
  text-align: ${(props: IMessageProps) =>
    props.isMyMessage ? "right" : "left"};
`;

const MessageText = styled(Text)`
  margin-bottom: 3px;
  color: black;
  letter-spacing: 0.7px;
  text-align: ${(props: IMessageProps) =>
    props.isMyMessage ? "right" : "left"};
`;

const DateText = styled(Text)`
  font-size: 12px;
  color: ${BLACK_COLOR};
  text-align: ${(props: IMessageProps) =>
    props.isMyMessage ? "right" : "left"};
`;

const MessageImage = styled(Image)`
    overflow: hidden;
    width: 280; 
    height: 180; 
    border-width: 0.5; 
    border-radius: 10;
    margin-bottom: 5; 
    background-color: ${WHITE_COLOR};
    border-color: ${SOFT_BLUE_COLOR};
`;
