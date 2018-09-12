import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const SignUp = () => {
  return (
    <SignUpView>
      <Text>Sign UP</Text>
    </SignUpView>
  );
};

export default SignUp;

const SignUpView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
