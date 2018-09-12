import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const SignIn = () => {
  return (
    <SignUpView>
      <Text>Sign In</Text>
    </SignUpView>
  );
};

export default SignIn;

const SignUpView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
