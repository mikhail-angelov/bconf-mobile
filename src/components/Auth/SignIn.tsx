import React from "react";
import { connect } from "react-redux";
import { Dimensions, Animated, Easing } from "react-native";
import { goHome } from "../../navigation/navigation";
import { login } from "../../actions/auth";
import { socketFire } from "../../actions/helper";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Link from "../CommonUIElements/Link";
import { validateEmail, validateCommonField } from "../../helpers/validator";
import { Navigation } from "react-native-navigation";
import {
  Header,
  Title,
  Annotation,
  Body,
  LoginErrorNotification
} from "./styled";

const { width } = Dimensions.get("window");

interface IProps {
  login: ({ username, password }) => void;
  auth: { authError: any };
  componentId: string;
}

interface IState {
  xPosition: Animated.AnimatedValue;
  password: string;
  username: string;
  newPassword: string;
  repeatNewPassword: string;
  email: string;
  error: { username: string; password: string };
}
class SignIn extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(300),
      password: "",
      username: "",
      newPassword: "",
      repeatNewPassword: "",
      email: "",
      error: { username: "", password: "" }
    };
    socketFire();
  }

  public render() {
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
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            error={this.state.error.username}
          />
          <Input
            placeholder="Password"
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
            onPress={() => {
              Navigation.push("SignIn", {
                component: {
                  name: "SignUp"
                }
              });
            }}
            title="Sign Up"
          />
          <Link
            color="#000"
            onPress={() => {
              Navigation.push("SignIn", {
                component: {
                  name: "ForgotPassword"
                }
              });
            }}
            title="Forgot Password"
          />
        </Body>
      </Animated.View>
    );
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
}

const mapDispatchToProps = {
  login
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
