import React from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  Animated,
  Easing,
  View,
  TouchableOpacity,
  Text,
  WebView,
  StyleSheet,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { goHome } from "../../navigation/navigation";
import { login, loginGithub, loginFacebook } from "../../actions/auth";
import { BLACK_COLOR } from "../../helpers/styleConstants";

import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Link from "../CommonUIElements/Link";
import { Navigation } from "react-native-navigation";
import Config from "react-native-config";

import {
  Header,
  Title,
  Annotation,
  Body,
  LoginErrorNotification
} from "./styled";

interface IProps {
  login: ({ email, password }) => void;
  auth: { authError: any };
  componentId: string;
  loginFacebook: () => void;
  loginGithub: (code) => void;
}

interface IState {
  xPosition: Animated.AnimatedValue;
  password: string;
  email: string;
  error: { email: string; password: string };
  showGithubWebview: boolean;
}
class SignIn extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(Platform.OS === "ios" ? 300 : 0),
      password: "",
      email: "",
      error: { email: "", password: "" },
      showGithubWebview: false
    };
  }
  public onLoad = async state => {
    if (state.url.indexOf("code") >= 0) {
      const githubCode = state.url.split("=")[1];
      await this.props.loginGithub(githubCode);
      this.setState({ showGithubWebview: false });
    }
  };

  public hide = () => {
    this.setState({ showGithubWebview: false });
  };

  public render() {
    return this.state.showGithubWebview ? (
      <View style={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={this.hide.bind(this)}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
        <WebView
          originWhitelist={["*"]}
          onNavigationStateChange={this.onLoad.bind(this)}
          source={{
            uri: `https://github.com/login/oauth/authorize?client_id=${
              Config.GITHUB_CLIENT_ID
              }&scope=user`
          }}
        />
      </View>
    ) : (
        <Animated.View
          style={{ transform: [{ translateX: this.state.xPosition }], flex: 1 }}
        >
          <KeyboardAwareScrollView>
            <View style={{ flex: 1 }}>
              <Header style={{ height: 50 }}>
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
                <Button onPress={() => this.props.loginFacebook()}>
                  Facebook Login
              </Button>
                <Button
                  onPress={() => this.setState({ showGithubWebview: true })}
                >
                  Github Login
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
            </View>
          </KeyboardAwareScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#F5FCFF"
  },
  topbar: {
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  topbarTextDisabled: {
    color: "gray"
  }
});

const mapDispatchToProps = {
  login,
  loginGithub,
  loginFacebook
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
