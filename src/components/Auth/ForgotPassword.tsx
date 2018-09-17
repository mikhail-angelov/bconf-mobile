import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Header, Title, Annotation, Body } from "./styled";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import { remindPassword } from "../../actions/actions";
import { connect } from "react-redux";

interface Props {
  remindPassword: Function;
}
class ForgotPassword extends React.Component<Props> {
  state = {
    email: "",
    username: ""
  };
  render() {
    return (
      <ForgotPasswordView>
        <Header>
          <Title>FORGOT PASSWORD</Title>
          <Annotation>Company name</Annotation>
        </Header>
        <Body>
          <Input
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            error=""
          />
          <Button
            onPress={() =>
              this.props.remindPassword({
                username: this.state.username,
                password: this.state.email
              })
            }
          >
            Send password
          </Button>
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

const ForgotPasswordView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
