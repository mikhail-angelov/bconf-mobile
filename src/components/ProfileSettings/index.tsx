import React from "react";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import styled from "styled-components";
import Header from "../Header";
import { Navigation } from "react-native-navigation";
import { goToAuth } from "../../navigation/navigation";

const { width } = Dimensions.get('window')

interface IProps {
  width: number;
  chat: any;
  auth: any;
  backToProfileSettingsList: () => void;
  backButton: () => void;
  activeProfileSettingsId: string;
  activeProfileSettingsName: string;
  chatColor: string;
}
class ProfileSettings extends React.PureComponent<IProps> {
  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public render() {
    const { chat, auth } = this.props
    return (
      <ProfileSettingsView>
        <Header
          title="Profile Settings"
          width={width}
          leftIconName="arrow-left" 
          leftIconFunction={() => Navigation.popToRoot("ChatList")}
          chatColor={chat.activeProfileSettingsColor} />
      </ProfileSettingsView>
    );
  }
}

const ProfileSettingsView = styled(View)`
  display: flex;
  flexDirection: column;
  height: 100%;
`;

const mapDispatchToProps = {
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
