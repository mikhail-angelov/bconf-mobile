import React from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  Animated,
  Easing,
  KeyboardAvoidingView
} from "react-native";
import { goHome } from "../../navigation/navigation";
import { login, loginFacebook } from "../../actions/auth";
import { BLACK_COLOR } from "../../helpers/styleConstants";

import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Link from "../CommonUIElements/Link";
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
  login: ({ email, password }) => void;
  auth: { authError: any };
  componentId: string;
  loginFacebook: () => void;
}

interface IState {
  xPosition: Animated.AnimatedValue;
  password: string;
  email: string;
  error: { email: string; password: string };
}
class SignIn extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(300),
      password: "",
      email: "",
      error: { email: "", password: "" }
    };
  }

  public render() {
    return (
      <Animated.View
        style={{ width, transform: [{ translateX: this.state.xPosition }] }}
      >
        <KeyboardAvoidingView behavior="padding">
          <Header>
            <Title>SIGN IN</Title>
            <Annotation>Secret chat</Annotation>
          </Header>
          <Body>
            <Input
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              error={this.state.error.email}
              textContentType="emailAddress"
              autoCapitalize="none"
            />
            <Input
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              error={this.state.error.password}
              type="password"
              textContentType="password"
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <LoginErrorNotification>
              {this.props.auth.authError}
            </LoginErrorNotification>
            <Button
              onPress={() => this.handleLogin()}
              disabled={!this.allFieldsFilled()}
            >
              Sign In
            </Button>
            <Button
              onPress={() => this.props.loginFacebook()}
            >
              Facebook Login
            </Button>
            <Link
              color={BLACK_COLOR}
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
              color={BLACK_COLOR}
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
        </KeyboardAvoidingView>
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

  public allFieldsFilled() {
    return this.state.email.length > 2 && this.state.password.length > 7;
  }

  private handleLogin() {
    const { email, password } = this.state;
    if (this.allFieldsFilled()) {
      this.setState({ error: { email: "", password: "" } });
      this.props.login({
        email,
        password
      });
    }
  }
}

const mapDispatchToProps = {
  login,
  loginFacebook
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
