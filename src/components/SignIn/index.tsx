import React from "react";
import { connect } from "react-redux";
import { Text, View, Dimensions, Animated, Easing } from "react-native";
import { goHome } from "../../navigation/navigation";
import { login } from "../../actions/actions";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Link from "../CommonUIElements/Link";
import { validateEmail, validateCommonField } from "../../helpers/validator";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const SIGN_IN = "SIGN_IN";
const SIGN_UP = "SIGN_UP";
const FORGOT_PASSWORD = "FORGOT_PASSWORD";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(-300),
      password: "",
      username: "",
      newPassword: "",
      repeatNewPassword: "",
      email: "",
      subView: SIGN_IN,
      error: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    Animated.timing(this.state.xPosition, {
      toValue: 0,
      easing: Easing.back(0),
      duration: 200
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) {
      goHome();
    }
  }

  handleLogin() {
    const { username, password } = this.state;
    if (!validateCommonField(username) && !validateCommonField(password)) {
      this.setState({
        error: {
          username: "Please, enter username",
          password: "Please, enter password"
        }
      });
    } else if (!validateCommonField(username)) {
      this.setState({ error: { username: "Please, enter username" } });
    } else if (!validateCommonField(password)) {
      this.setState({ error: { password: "Please, enter password" } });
    } else {
      this.setState({ error: {} });
      this.props.login({
        username: this.state.username,
        password: this.state.password
      });
    }
  }

  loginView() {
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
            error={this.state.error.username}
          />
          <Input
            placeholder="Password"
            ref={el => {
              this.password = el;
            }}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            error={this.state.error.password}
          />
          <LoginErrorNotification>
            {this.props.auth.authError}
          </LoginErrorNotification>
          <Button onPress={() => this.handleLogin()}>Sign In</Button>
          <Link
            color="#000"
            onPress={() => this.setState({ subView: SIGN_UP })}
            title="Sign Up"
          />
          <Link
            color="#000"
            onPress={() => this.setState({ subView: FORGOT_PASSWORD })}
            title="Forgot Password"
          />
        </Body>
      </Animated.View>
    );
  }

  signUpView() {
    return (
      <Animated.View
        style={{ width, transform: [{ translateX: this.state.xPosition }] }}
      >
        <Header>
          <Title>SIGN UP</Title>
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
            placeholder="Email"
            ref={el => {
              this.email = el;
            }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
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
              this.props.signUp({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
              })
            }
          >
            Sign Up
          </Button>
          <Link
            color="#000"
            onPress={() => this.setState({ subView: SIGN_IN })}
            title="Back to login"
          />
        </Body>
      </Animated.View>
    );
  }

  forgotPassordView() {
    return (
      <Animated.View
        style={{ width, transform: [{ translateX: this.state.xPosition }] }}
      >
        <Header>
          <Title>FORGOT PASSWORD</Title>
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
            placeholder="Email"
            ref={el => {
              this.email = el;
            }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Button
            onPress={() =>
              this.props.forgotPassword({
                username: this.state.username,
                password: this.state.email
              })
            }
          >
            Send password
          </Button>
          <Link
            color="#000"
            onPress={() => this.setState({ subView: SIGN_IN })}
            title="Back to login"
          />
        </Body>
      </Animated.View>
    );
  }

  changePasswordView() {
    return (
      <Animated.View
        style={{ width, transform: [{ translateX: this.state.xPosition }] }}
      >
        <Header>
          <Title>CHANGE PASSWORD</Title>
          <Annotation>Company name</Annotation>
        </Header>
        <Body>
          <Input
            placeholder="New password"
            ref={el => {
              this.newPassword = el;
            }}
            onChangeText={newPassword => this.setState({ newPassword })}
            value={this.state.newPassword}
          />
          <Input
            placeholder="Repeat new password"
            ref={el => {
              this.repeatNewPassword = el;
            }}
            onChangeText={repeatNewPassword =>
              this.setState({ repeatNewPassword })
            }
            value={this.state.repeatNewPassword}
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
          <Link
            color="#000"
            onPress={() => this.setState({ subView: SIGN_IN })}
            title="Back to login"
          />
        </Body>
      </Animated.View>
    );
  }

  viewSelector(subView) {
    if (subView === SIGN_UP) {
      return this.signUpView();
    } else if (subView === FORGOT_PASSWORD) {
      return this.forgotPassordView();
    } else if (subView === CHANGE_PASSWORD) {
      return this.changePasswordView();
    } else {
      return this.loginView();
    }
  }

  render() {
    return <View>{this.viewSelector(this.state.subView)}</View>;
  }
}

export const mapDispatchToProps = {
  login
};

export const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

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
const LoginErrorNotification = styled(Text)`
  font-size: 12px;
  color: red;
  text-align: left;
`;
