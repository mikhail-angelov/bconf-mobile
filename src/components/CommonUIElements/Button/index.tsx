import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { BLACK_COLOR } from "../../../helpers/styleConstants";

import styled from "styled-components";

const UIButton = ({ children, ...otherProps }) => {
  return (
    <CustomButton {...otherProps}>
      <CustomButtonText {...otherProps}> {children} </CustomButtonText>
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
  background-color: ${BLACK_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const CustomButtonText = styled(Text)`
  color: ${props => (props.disabled ? "lightgrey" : "white")};
  font-size: 24px;
  text-align: center;
`;
