import React from "react";
import { Text, View } from "react-native";
import Input from "../CommonUIElements/Input/Input";
import Button from "../CommonUIElements/Button/Button";
import styled from "styled-components";

const SignIn = () => {
  return (
    <SignUpView>
      <Header>
        <Title>SIGN IN</Title>
        <Annotation>Company name</Annotation>
      </Header>
      <Body>
        <Input placeholder="Login" />
        <Input placeholder="Password" />
        <Button onPress={() => console.log("Hello!")}>Sign Up</Button>
      </Body>
    </SignUpView>
  );
};

export default SignIn;

const SignUpView = styled(View)`
  flex: 1;
`;
const Title = styled(Text)`
  font-size: 36px;
  text-align: center;
  color: #000;
  font-weight: 700;
`;
const Annotation = styled(Text)`
  font-size: 12px;
  text-align: center;
  color: #000;
`;
const Header = styled(View)`
  height: 30%;
  justify-content: center;
  align-items: center;
`;
const Body = styled(View)`
  height: 70%;
  justify-content: center;
  align-items: center;
`;
