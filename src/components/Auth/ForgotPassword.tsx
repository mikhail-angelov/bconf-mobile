import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import { Header, Title, Annotation, Body, ErrorText } from "./styled";
import ValidatedInput from "./ValidatedInput";
import Button from "../CommonUIElements/Button";
import { remindPassword } from "../../actions/auth";
import { validate } from "../../helpers/validator";

interface IProps {
  remindPassword: ({ username, password }) => void;
}
interface IState {
  email: string;
}
class ForgotPassword extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.handleRemindPassword = this.handleRemindPassword.bind(this);
  }

  public handleRemindPassword() {
    if (validate.email(this.state.email).result) {
      this.props.remindPassword(this.state.email);
    }
  }
  public render() {
    const { auth } = this.props;
    return (
      <ForgotPasswordView behavior="padding">
        <Header>
          <Title>FORGOT PASSWORD</Title>
          <Annotation>Company name</Annotation>
        </Header>
        <Body>
          <ValidatedInput
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            rule={validate.email}
          />
          <Button
            disabled={!validate.email(this.state.email).result}
            onPress={this.handleRemindPassword}
          >
            Send password
          </Button>
          {auth.remindPasswordError.length > 0 && (
            <ErrorText>{auth.remindPasswordError}</ErrorText>
          )}
        </Body>
      </ForgotPasswordView>
    );
  }
}

const mapDispatchToProps = {
  remindPassword
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

const ForgotPasswordView = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
