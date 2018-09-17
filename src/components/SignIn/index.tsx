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

interface IProps {
  login: Function;
  signUp: Function;
  forgotPassword: Function;
  changePassword: Function;
  auth: { authError: any };
}

interface IState {
  xPosition: Animated.AnimatedValue;
  password: string;
  username: string;
  newPassword: string;
  repeatNewPassword: string;
  email: string;
  subView: string;
  error: { username: string; password: string };
}
class SignIn extends React.Component<IProps, IState> {
  private username: string = "";
  private password: string = "";
  private newPassword: string = "";
  private repeatNewPassword: string = "";
  private email: string = "";

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
      error: { username: "", password: "" }
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  public render() {
    return <View>{this.viewSelector(this.state.subView)}</View>;
  }

  public componentDidMount() {
    Animated.timing(this.state.xPosition, {
      toValue: 0,
      easing: Easing.back(0),
      duration: 200
    }).start();
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) {
      goHome();
    }
  }

  private handleLogin() {
    const { username, password } = this.state;
    if (!validateCommonField(username) && !validateCommonField(password)) {
      this.setState({
        error: {
          username: "Please, enter username",
          password: "Please, enter password"
        }
      });
    } else if (!validateCommonField(username)) {
      this.setState({
        error: { username: "Please, enter username", password: "" }
      });
    } else if (!validateCommonField(password)) {
      this.setState({
        error: { username: "", password: "Please, enter password" }
      });
    } else {
      this.setState({ error: { username: "", password: "" } });
      this.props.login({
        username: this.state.username,
        password: this.state.password
      });
    }
  }

  private loginView() {
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

  private signUpView() {
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
            error=""
          />
          <Input
            placeholder="Email"
            ref={el => {
              this.email = el;
            }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            error=""
          />
          <Input
            placeholder="Password"
            ref={el => {
              this.password = el;
            }}
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
          <Link
            color="#000"
            onPress={() => this.setState({ subView: SIGN_IN })}
            title="Back to login"
          />
        </Body>
      </Animated.View>
    );
  }

  private forgotPassordView() {
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
            error=""
          />
          <Input
            placeholder="Email"
            ref={el => {
              this.email = el;
            }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            error=""
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

  private changePasswordView() {
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
            error=""
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
          <Link
            color="#000"
            onPress={() => this.setState({ subView: SIGN_IN })}
            title="Back to login"
          />
        </Body>
      </Animated.View>
    );
  }

  private viewSelector(subView) {
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
}

const mapDispatchToProps = {
  login
};

const mapStateToProps = state => ({ auth: state.auth });

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
