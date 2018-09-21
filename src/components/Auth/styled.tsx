import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";

export const Title = styled(Text)`
  font-size: 36px;
  text-align: center;
  color: #000;
  font-weight: 700;
`;
export const Annotation = styled(Text)`
  font-size: 12px;
  text-align: center;
  color: #000;
`;
export const Header = styled(View)`
  height: 30%;
  justify-content: center;
  align-items: center;
`;
export const Body = styled(View)`
  height: 70%;
  justify-content: center;
  align-items: center;
`;
export const LoginErrorNotification = styled(Text)`
  font-size: 12px;
  color: red;
  text-align: left;
`;

export const ErrorText = styled(Text)`
  color: red;
  font-size: 12px;
`;
