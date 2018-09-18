import React from "react";
import { View } from "react-native";
import { Header, Title, Annotation, Body } from "./styled";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import { changePassword } from "../../actions/auth";
import { connect } from "react-redux";

interface IProps {
  changePassword: (newPassword: string) => void;
}
class ChangePassword extends React.Component<IProps> {
  public state = {
    newPassword: "",
    repeatNewPassword: ""
  };
  public render() {
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
            onPress={() => this.props.changePassword(this.state.newPassword)}
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
