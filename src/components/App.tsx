import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { ActivityIndicator, View, AsyncStorage } from "react-native";
import { checkAuth } from "../actions/auth";
import { BLACK_COLOR } from "../helpers/styleConstants";
import styled from "styled-components";
import firebase from "react-native-firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    props.checkAuth();
  }
  public async componentDidMount() {
    this.checkPermission();
  }

  //1
  public async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  public async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log("FSM token:", fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  public async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }
  public render() {
    return (
      <Wrap>
        <ActivityIndicator size="large" color={BLACK_COLOR} />
      </Wrap>
    );
  }
}

const mapDispatchToProps = {
  checkAuth
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const Wrap = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
