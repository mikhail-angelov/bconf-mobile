import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { AUTH } from "../constants/storage";
import { initialViev } from "../actions/auth";
import styled from "styled-components";

interface IpropsUser {
  userId: string;
  token: string;
}
interface IProps {
  user: IpropsUser;
  auth: string;
  initialViev: (user) => void;
}

class App extends React.Component<IProps> {
  public async componentDidMount() {
    const auth = await AsyncStorage.getItem(AUTH);
    const user = JSON.parse(auth);
    this.props.initialViev(user);
  }

  public render() {
    return (
      <Wrap>
        <ActivityIndicator size="large" color="#000" />
      </Wrap>
    );
  }
}

const mapDispatchToProps = {
  initialViev
};

const mapStateToProps = state => ({ auth: state.auth });

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
