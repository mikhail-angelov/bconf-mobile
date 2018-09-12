import React from "react";
import { TouchableOpacity, Text } from "react-native";

import styled from "styled-components";

const UIButton = ({ children, ...otherProps }) => {
  return (
    <CustomButton {...otherProps}>
      <CustomButtonText> {children} </CustomButtonText>
    </CustomButton>
  );
};

export default UIButton;

const CustomButton = styled(TouchableOpacity)`
  border: 1px solid #bbb;
  border-radius: 5px;
  margin: 10px;
  width: 200px;
  height: 50px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomButtonText = styled(Text)`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
