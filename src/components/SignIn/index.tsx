import React from "react";
import { Text, View, Dimensions, Animated, Easing } from "react-native";
import Input from "../CommonUIElements/Input/Input";
import Button from "../CommonUIElements/Button/Button";
import styled from "styled-components";

const { width } = Dimensions.get("window");

class SignIn extends React.Component {
  state = {
    xPosition: new Animated.Value(300)
  };

  componentDidMount() {
    Animated.timing(this.state.xPosition, {
      toValue: 0,
      easing: Easing.back(0),
      duration: 200
    }).start();
  }
  render() {
    return (
      <Animated.View
        style={{ width, transform: [{ translateX: this.state.xPosition }] }}
      >
        <Header>
          <Title>SIGN IN</Title>
          <Annotation>Company name</Annotation>
        </Header>
        <Body>
          <Input placeholder="Login" />
          <Input placeholder="Password" />
          <Button onPress={() => console.log("Hello!")}>Sign Up</Button>
        </Body>
      </Animated.View>
    );
  }
}

export default SignIn;

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
