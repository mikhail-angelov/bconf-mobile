import React from "react";
import { connect } from "react-redux";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import _ from 'lodash'
import styled from "styled-components";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Header from "../Header";
import { saveProfileSettings } from '../../actions/auth'
import { Avatar } from "../Avatar";
import { Navigation } from "react-native-navigation";
import { goToAuth } from "../../navigation/navigation";

const { width } = Dimensions.get('window')

interface IProps {
  width: number;
  chat: any;
  auth: any;
  activeProfileSettingsId: string;
  activeProfileSettingsName: string;
  chatColor: string;
  saveProfileSettings: ({ name, email, avatarSrc }) => void;
}

interface IState {
  isProfileEdit: boolean
  name: string;
  avatarSrc: string;
  email: string;
  error: object;
}

class ProfileSettings extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.name,
      avatarSrc: props.auth.srcAvatar,
      email: props.auth.email,
      error: { name: "", avatarSrc: "", email: "" },
      isProfileEdit: false
    };
  }

  public saveProfileSettings() {
    const { name, email, avatarSrc } = this.state
    this.props.saveProfileSettings({ name, email, avatarSrc })
    this.setState({ isProfileEdit: false })
  }

  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public render() {
    const { chat, auth } = this.props
    const { isProfileEdit } = this.state
    const profileSettingsItems = [
      { title: "Username", fieldName: 'name' },
      { title: "Email", fieldName: 'email' },
      { title: "Avatar Source", fieldName: 'avatarSrc' },
    ]
    return (
      <ProfileSettingsWrap>
        <Header
          title="Profile Settings"
          width={width}
          leftIconName="arrow-left"
          leftIconFunction={() => Navigation.popToRoot("ChatList")}
          chatColor={chat.activeProfileSettingsColor} />
        <ProfileSettingsView>
          <AvatarSide>
            <Avatar
              srcImg={auth.srcAvatar}
              style={{ width: 100, height: 100, borderRadius: 100 }}
              name={auth.name}
              size="big"
              chatColor="#996699" />
          </AvatarSide>
          {_.map(profileSettingsItems, item => (<ProfileSettingsItem>
            {isProfileEdit ?
              <Input
                placeholder={item.title}
                onChangeText={text => this.setState({ [item.fieldName]: text })}
                value={this.state[item.fieldName]}
                error={this.state.error[item.fieldName]}
                textContentType={item.fieldName}
              /> :
              <Text style={{ fontSize: 24, marginTop: 16, marginBottom: 16 }}>{item.title}: {this.state[item.fieldName] || 'Empty'}</Text>
            }
          </ProfileSettingsItem>))}
          <Button
            onPress={isProfileEdit ? () => this.saveProfileSettings() : () => this.setState({ isProfileEdit: true })}>
            {isProfileEdit ? 'Save' : 'Edit'}
          </Button>
        </ProfileSettingsView>
      </ProfileSettingsWrap>
    );
  }
}

const ProfileSettingsWrap = styled(View)`
        display: flex;
        flexDirection: column;
        height: 100%;
      `;

const ProfileSettingsItem = styled(View)`
        display: flex;
        flexDirection: column;
        alignItems: center;
        justifyContent: center;
      `;

const ProfileSettingsView = styled(View)`
        display: flex;
        flexDirection: column;
        height: 100%;
        alignItems: center;
      `;

const AvatarSide = styled(View)`
        width: 100%;
        display: flex;
        alignItems: center;
        justifyContent: center;
        margin: 15px 0;
      `;

const mapDispatchToProps = {
  saveProfileSettings
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
