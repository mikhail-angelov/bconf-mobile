import React from "react";
import { Button, Text } from "react-native";
import styled from "styled-components";

const CustomButton = styled(Button)`
  border: 1px solid #bbb;
  border-radius: 5px;
  margin: 10px;
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UILink = (otherProps) => (<CustomButton {...otherProps} />);

export default UILink;