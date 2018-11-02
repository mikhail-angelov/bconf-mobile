import React from "react";
import { connect } from "react-redux";
import { View, Dimensions, Text, TouchableOpacity, Modal, Alert } from "react-native";
import _ from 'lodash'
import styled from "styled-components";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Header from "../Header";
import { updateChatSettings, changeChatPicture } from '../../actions/chat'
import { Avatar } from "../Avatar";
import ImagePicker from 'react-native-image-crop-picker';
import { Navigation } from "react-native-navigation";
import { goToAuth } from "../../navigation/navigation";

const { width } = Dimensions.get('window')

interface IProps {
  width: number;
  chat: any;
  auth: any;
  chatColor: string;
  updateChatSettings: ({ chatId, chatName, chatImage }) => void;
  changeChatPicture: (image, activeChat) => void;
}

interface IState {
  isChatEdit: boolean;
  isUploadPhotoButtonVisible: boolean;
  isModalUploadPhotoVisible: boolean;
  chatName: string;
  chatImage: string;
  error: object;
  photos: object;
}

class ChatSettings extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      chatName: props.chat.activeChat.chatName,
      chatImage: props.chat.activeChat.chatImage,
      error: { chatName: "", chatImage: "", email: "" },
      isChatEdit: false,
      isUploadPhotoButtonVisible: false,
      isModalUploadPhotoVisible: false,
      photos: [],
    };
  }

  public updateChatSettings() {
    const { chat } = this.props
    const { chatName, chatImage } = this.state
    this.props.updateChatSettings({ chatId: chat.activeChat.chatId, chatName, chatImage })
    this.setState({ isChatEdit: false })
  }

  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public getPhotos = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.props.changeChatPicture(image, this.props.chat.activeChat)
      this.setState({ isUploadPhotoButtonVisible: false })
    }
    );
  }

  public render() {
    const { chat } = this.props
    const { isChatEdit, isUploadPhotoButtonVisible, isModalUploadPhotoVisible } = this.state
    const chatSettingsItems = [
      { fieldName: 'chatName' },
      { fieldName: 'chatImage' },
    ]
    const maxStringLength = 40
    return (
      <ChatSettingsWrap>
        <Header
          title="Chat Settings"
          width={width}
          leftIconName="arrow-left"
          leftIconFunction={() => Navigation.pop("ChatSettings")}
          rightIconFunction={isChatEdit ? () => this.updateChatSettings() : () => this.setState({ isChatEdit: true })}
          rightIconName={isChatEdit ? "check" : "pencil"}
        />
        <ChatSettingsView>
          <AvatarSide
            onPress={() => this.setState({ isUploadPhotoButtonVisible: true })}>
            <Avatar
              srcImg={chat.activeChat.chatImage}
              style={{ width: 100, height: 100, borderRadius: 100 }}
              name={chat.activeChat.chatName}
              size="big"
              avatarColor={chat.activeChat.chatColor} />
          </AvatarSide>
          <ChatSettingsItemsWrap>
            {_.map(chatSettingsItems, item => (<ChatSettingsItem>
              {isChatEdit ?
                <Input
                  placeholder={item.title}
                  onChangeText={text => this.setState({ [item.fieldName]: text })}
                  value={this.state[item.fieldName]}
                  error={this.state.error[item.fieldName]}
                  textContentType={item.fieldName}
                /> :
                <Text style={{ fontSize: 24, marginTop: 6, marginBottom: 6, maxHeight: 60 }}>{(this.state[item.fieldName] &&
                  this.state[item.fieldName].length > maxStringLength) ?
                  (((this.state[item.fieldName]).substring(0, maxStringLength - 3)) + '...') :
                  this.state[item.fieldName] || 'Empty'}</Text>
              }
            </ChatSettingsItem>))}
          </ChatSettingsItemsWrap>
        </ChatSettingsView>
        <View>
          {/* buttons */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isUploadPhotoButtonVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
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
          {/* pictures */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={isModalUploadPhotoVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
          </Modal>
        </View>
      </ChatSettingsWrap>
    );
  }
}

const ChatSettingsWrap = styled(View)`
            display: flex;
            flexDirection: column;
            height: 100%;
          `;

const ChatSettingsItemsWrap = styled(View)`
            display: flex;
            flexDirection: column;
            width: 70%;
            justify-content: center;
          `;

const ChatSettingsItem = styled(View)`
    `;

const ChatSettingsView = styled(View)`
            display: flex;
            flexDirection: row;
            height: 20%;
            alignItems: center;
          `;

const AvatarSide = styled(TouchableOpacity)`
            display: flex;
            margin: 15px;
            shadowRadius: 5;
            shadowOpacity: 0.2;
        shadowOffset: {width: 1, height: 1 };
        shadowColor: #000
      `;

const mapDispatchToProps = {
  updateChatSettings,
  changeChatPicture
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatSettings);
