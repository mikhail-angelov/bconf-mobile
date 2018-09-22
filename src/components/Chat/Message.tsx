import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import moment from "moment";

export const Message = ({ text, idx }) => {
  const calulatedCount = idx % 2 === 0 ? "even" : "odd";

  return (
    <MessageWrapper count={calulatedCount}>
      <MessageText count={calulatedCount}>{text}</MessageText>
      <DateText count={calulatedCount}>
        {moment().format("MM/DD/YYYY, hh:mm:ss")}
      </DateText>
    </MessageWrapper>
  );
};

const MessageWrapper = styled(View).attrs({})`
  padding: 10px;
  border-radius: 10px;
  background-color: ${props =>
    props.count === "odd" ? "#dfdfe5" : "rgb(0, 122, 255)"};
  margin-top: 10px;
  flex: none;
  align-self: ${props => (props.count === "odd" ? "flex-end" : "flex-start")};
  max-width: 90%;
`;

const MessageText = styled(Text)`
  color: ${props => (props.count === "odd" ? "black" : "white")};
  text-align: ${props => (props.count === "even" ? "right" : "left")};
`;

const DateText = styled(Text)`
  font-size: 12px;
  color: ${props => (props.count === "odd" ? "grey" : "white")};
`;
