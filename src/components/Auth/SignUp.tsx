import React from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import Button from "../CommonUIElements/Button";
import ValidatedInput from "./ValidatedInput";
import { Header, Title, Annotation, Body, ErrorText } from "./styled";
import { signUp } from "../../actions/auth";
import { connect } from "react-redux";
import { validate } from "../../helpers/validator";

interface ISignUpData {
  username: string;
  email: string;
  password: string;
}
interface IProps {
  signUp: (data: ISignUpData) => void;
  auth: any;
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
    if (this.isFormValid()) {
      this.props.signUp({
        name: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
    }
  }

  public isFormValid = () =>
    validate.username(this.state.username).result &&
    validate.email(this.state.email).result &&
    validate.password(this.state.password).result;

  public render() {
    return (
      <SignUpView behavior="padding">
        <Header>
          <Title>SIGN UP</Title>
          <Annotation>Secret chat</Annotation>
        </Header>
        <Body>
          <ValidatedInput
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            rule={validate.username}
          />
          <ValidatedInput
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            rule={validate.email}
          />
          <ValidatedInput
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            rule={validate.password}
          />
          <Button disabled={!this.isFormValid()} onPress={this.handleSignUp}>
            Sign Up
          </Button>
          {this.props.auth.signUpError.length > 1 && (
            <ErrorText> {this.props.auth.signUpError}</ErrorText>
          )}
        </Body>
      </SignUpView>
    );
  }
}

const SignUpView = styled(KeyboardAvoidingView)`
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
