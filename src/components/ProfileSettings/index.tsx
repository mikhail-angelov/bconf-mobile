import React from "react";
import { connect } from "react-redux";
import { View, Dimensions, Text, Modal, TouchableOpacity } from "react-native";
import _ from 'lodash'
import styled from "styled-components";
import ImagePicker from 'react-native-image-crop-picker';
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Header from "../Header";
import { saveProfileSettings, changeUserPicture } from '../../actions/auth'
import * as Progress from 'react-native-progress';
import { Avatar } from "../Avatar";
import { Navigation } from "react-native-navigation";
import { SOFT_BLUE_COLOR } from '../../helpers/styleConstants';
import { goToAuth } from "../../navigation/navigation";

const { width } = Dimensions.get('window')

interface IProps {
  width: number;
  chat: any;
  auth: any;
  activeProfileSettingsId: string;
  activeProfileSettingsName: string;
  chatColor: string;
  saveProfileSettings: ({ name, email, srcAvatar }) => void;
  changeUserPicture: (image, user) => void;
  srcAvatar: string;
}

interface IState {
  isProfileEdit: boolean
  name: string;
  email: string;
  error: object;
  isUploadPhotoButtonVisible: boolean;
}

class ProfileSettings extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.name,
      email: props.auth.email,
      error: { name: "", email: "" },
      isProfileEdit: false,
      isUploadPhotoButtonVisible: false,
    };
  }

  public saveProfileSettings() {
    const { name, email } = this.state
    this.props.saveProfileSettings({ name, email, srcAvatar: this.props.auth.srcAvatar })
    this.setState({ isProfileEdit: false })
  }

  public getPhotos() {
    const { name, email } = this.state
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.props.changeUserPicture(image, { name, email })
      this.setState({ isUploadPhotoButtonVisible: false })
    })
  }

  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public render() {
    const { chat, auth } = this.props
    const { isProfileEdit, isUploadPhotoButtonVisible } = this.state
    const profileSettingsItems = [
      { title: "Username", fieldName: 'name' },
      { title: "Email", fieldName: 'email' },
    ]
    return (
      <ProfileSettingsWrap>
        <Header
          title="Profile Settings"
          width={width}
          leftIconName="arrow-left"
          leftIconFunction={() => Navigation.popToRoot("ChatList")}
          rightIconFunction={isProfileEdit ? () => this.saveProfileSettings() : () => this.setState({ isProfileEdit: true })}
          rightIconName={isProfileEdit ? "check" : "pencil"}
        />
        <ProfileSettingsView>
          <AvatarSide
            onPress={() => this.setState({ isUploadPhotoButtonVisible: true })}>
            <Avatar
              srcImg={auth.srcAvatar}
              style={{ width: 100, height: 100, borderRadius: 100 }}
              name={auth.name}
              size="big"
              avatarColor="#996699" />
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
        </ProfileSettingsView>
        <View>
          {/* buttons */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isUploadPhotoButtonVisible}>
            <View
              style={{ bottom: 0, position: "absolute", width: '95%', marginRight: 10 }}>
              <Button
                onPress={() => {
                  this.getPhotos()
                }}
                style={{ width: '100%' }}>
                Choose photo
              </Button>
              <Button style={{ width: '100%' }} onPress={() => this.setState({ isUploadPhotoButtonVisible: false })}>Cancel</Button>
            </View>
          </Modal>
        </View>
        {auth.uploadingUserPhoto && <UploadSection>
          {auth.uploadingUserPhoto && auth.uploadingUserPhotoProgress === 0 && <Progress.Circle color={SOFT_BLUE_COLOR} size={100} indeterminate={true} />}
          {auth.uploadingUserPhotoProgress !== 0 && <Progress.Pie color={SOFT_BLUE_COLOR} progress={auth.uploadingUserPhotoProgress} size={100} />}
        </UploadSection>}
      </ProfileSettingsWrap >
    );
  }
}

const UploadSection = styled(View)`
          display: flex; 
          justifyContent: center;
          alignItems: center; 
          backgroundColor: rgba(255, 255, 255, 0.7); 
          position: absolute; 
          top: 0; 
          left: 0; 
          right: 0;
          bottom: 0;
          `;

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

const AvatarSide = styled(TouchableOpacity)`
        width: 100%;
        display: flex;
        alignItems: center;
        justifyContent: center;
        margin: 15px 0;
      `;

const mapDispatchToProps = {
  saveProfileSettings,
  changeUserPicture
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
