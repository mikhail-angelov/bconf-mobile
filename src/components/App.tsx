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

  componentDidMount() {
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log("++++", notification)
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((message) => {
      // Process your notification as required
      console.log("!!!!++++", message);
      const showNotif = new firebase.notifications.Notification()
        .setNotificationId('notificationId')
        .setTitle("XXXXX")
        .setBody("XXXXX")
      firebase.notifications().displayNotification(showNotif)

    })
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
  }

  public render() {
    return (
      <Wrap>
        <ActivityIndicator size="large" color={BLACK_COLOR} />
      </Wrap >
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
