import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import { Header, Title, Annotation, Body } from "./styled";
import { signUp } from "../../actions/auth";
import { connect } from "react-redux";
import {
  validateEmail,
  validateCommonField,
  validatePassword
} from "../../helpers/validator";

interface IProps {
  signUp: (
    {
      username,
      email,
      password
    }: { username: string; email: string; password: string }
  ) => void;
  auth: { authError: any };
  componentId: string;
}

interface IState {
  password: string;
  username: string;
  email: string;
  error: { username: string; password: string; email: string };
}
class SignUp extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: { username: "", email: "", password: "" }
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  public handleSignUp() {
    console.log(this.state);
    if (
      validateEmail(this.state.email) &&
      validateCommonField(this.state.username) &&
      validatePassword(this.state.password)
    ) {
      this.props.signUp({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
    } else if (!validateEmail(this.state.email)) {
      this.setState({
        error: { ...this.state.error, email: "Please, enter a valid email" }
      });
    } else if (!validateCommonField(this.state.username)) {
      this.setState({
        error: {
          ...this.state.error,
          username: "Please, enter a valid username"
        }
      });
    } else if (!validatePassword(this.state.password)) {
      this.setState({
        error: {
          ...this.state.error,
          password:
            "Please, enter a valid password: Minimum 8 characters, at least one letter and one number "
        }
      });
    }
  }

  public render() {
    return (
      <SignUpView>
        <Header>
          <Title>SIGN UP</Title>
          <Annotation>Company name</Annotation>
        </Header>
        <Body>
          <Input
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            error={this.state.error.username}
          />
          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            error={this.state.error.email}
          />
          <Input
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            error={this.state.error.password}
          />
          {this.state.error && <Text>{this.state.error.username}</Text>}
          <Button onPress={this.handleSignUp}>Sign Up</Button>
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
