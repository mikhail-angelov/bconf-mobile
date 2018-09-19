import React from "react";
import { TextInput, Text, View } from "react-native";
import styled from "styled-components";

const UIInput = ({ error, ...otherProps }) => {
  if (error.length < 1) {
    return <CustomInput {...otherProps} />;
  } else {
    return (
      <View>
        <DangerCustomInput {...otherProps} />
        <ErrorNotification>{error}</ErrorNotification>
      </View>
    );
  }
};
export default UIInput;

const CustomInput = styled(TextInput)`
  font-size: 24px;
  border: 1px solid #bbb;
  border-radius: 5px;
  margin: 13px 0;
  width: 200px;
  height: 35px;
  text-align: center;
`;
const DangerCustomInput = styled(TextInput)`
  font-size: 24px;
  border: 1px solid red;
  border-radius: 5px;
  margin-top: 12px;
  width: 200px;
  height: 35px;
  text-align: center;
`;
const ErrorNotification = styled(Text)`
  font-size: 12px;
  color: red;
  text-align: center;
`;
