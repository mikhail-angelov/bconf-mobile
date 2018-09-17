import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { Header, Title, Annotation, Body } from "./styled";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import { changePassword } from "../../actions/actions";
import { connect } from "react-redux";

interface Props {
  changePassword: Function;
}
class ChangePassword extends React.Component<Props> {
  state = {
    newPassword: "",
    repeatNewPassword: ""
  };
  render() {
    return (
      <View>
        <Header>
          <Title>CHANGE PASSWORD</Title>
          <Annotation>Company name</Annotation>
        </Header>
        <Body>
          <Input
            placeholder="New password"
            onChangeText={newPassword => this.setState({ newPassword })}
            value={this.state.newPassword}
            error=""
          />
          <Input
            placeholder="Repeat new password"
            onChangeText={repeatNewPassword =>
              this.setState({ repeatNewPassword })
            }
            value={this.state.repeatNewPassword}
            error=""
          />
          <Button
            onPress={() =>
              this.props.changePassword({
                username: this.state.newPassword,
                password: this.state.repeatNewPassword
              })
            }
          >
            Change Password
          </Button>
        </Body>
      </View>
    );
  }
}

const mapDispatchToProps = {
  changePassword
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
