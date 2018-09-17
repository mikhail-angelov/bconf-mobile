import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import { Header, Title, Annotation, Body } from "./styled";
import { signUp } from "../../actions/auth";
import { connect } from "react-redux";

interface IProps {
  login: Function;
  signUp: Function;
  forgotPassword: Function;
  changePassword: Function;
  auth: { authError: any };
  componentId: string;
}

interface IState {
  password: string;
  username: string;
  email: string;
  error: { username: string; password: string };
}
class SignUp extends React.Component<IProps, IState> {
  state = {
    username: "",
    password: "",
    email: "",
    error: { username: "", password: "" }
  };

  public render() {
    return (
      <SignUpView>
        <Header>
          <Title>SIGN UP</Title>
          <Annotation>Company name</Annotation>
        </Header>
        <Body>
          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            error=""
          />
          <Input
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            error=""
          />
          <Button
            onPress={() =>
              this.props.signUp({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
              })
            }
          >
            Sign Up
          </Button>
        </Body>
      </SignUpView>
    );
  }
}

const SignUpView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const mapDispatchToProps = {
  signUp
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
