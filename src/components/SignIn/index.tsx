import React from "react";
import { connect } from "react-redux";
import { Text, View, Dimensions, Animated, Easing } from "react-native";
import * as appActions from "../../actions/actions";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Link from "../CommonUIElements/Link";
import styled from "styled-components";

const { width } = Dimensions.get("window");

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(-300),
      password: "",
      username: ""
    };
  }
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
          <Input
            placeholder="Login"
            ref={el => {
              this.username = el;
            }}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
          <Input
            placeholder="Password"
            ref={el => {
              this.password = el;
            }}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button
            onPress={() =>
              this.props.dispatch(
                appActions.login({
                  username: this.state.username,
                  password: this.state.password
                })
              )
            }
          >
            Sign Up
          </Button>
          <Link
            color="#000"
            onPress={() => console.log(this.state)}
            title="Sign Up"
          />
        </Body>
      </Animated.View>
    );
  }
}

export default connect()(SignIn);

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
