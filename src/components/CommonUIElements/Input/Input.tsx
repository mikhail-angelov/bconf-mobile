import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components";

const UIInput = props => {
  return <CustomInput {...props} />;
};

export default UIInput;

const CustomInput = styled(TextInput)`
  font-size: 24px;
  border: 1px solid #bbb;
  border-radius: 5px;
  margin: 10px;
  width: 200px;
  height: 35px;
  text-align: center;
`;
