import React from "react";
import { connect } from "react-redux";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import _ from 'lodash'
import styled from "styled-components";
import Input from "../CommonUIElements/Input";
import Button from "../CommonUIElements/Button";
import Header from "../Header";
import { saveChatSettings } from '../../actions/chat'
import { Avatar } from "../Avatar";
import { Navigation } from "react-native-navigation";
import { goToAuth } from "../../navigation/navigation";

const { width } = Dimensions.get('window')

interface IProps {
  width: number;
  chat: any;
  auth: any;
  chatColor: string;
  saveChatSettings: ({ chatId, chatName, chatImage }) => void;
}

interface IState {
  isChatEdit: boolean
  chatName: string;
  chatImage: string;
  error: object;
}

class ChatSettings extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      chatName: props.chat.activeChat.chatName,
      chatImage: props.chat.activeChat.chatImage,
      error: { chatName: "", chatImage: "", email: "" },
      isChatEdit: false
    };
  }

  public saveChatSettings() {
    const { chat } = this.props
    const { chatName, chatImage } = this.state
    this.props.saveChatSettings({ chatId: chat.activeChat.chatId, chatName, chatImage })
    this.setState({ isChatEdit: false })
  }

  public componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.authenticated) {
      goToAuth();
    }
  }

  public render() {
    const { chat } = this.props
    const { isChatEdit } = this.state
    const chatSettingsItems = [
      { title: "Chatname", fieldName: 'chatName' },
      { title: "Avatar Source", fieldName: 'chatImage' },
    ]
    return (
      <ChatSettingsWrap>
        <Header
          title="Chat Settings"
          width={width}
          leftIconName="arrow-left"
          leftIconFunction={() => Navigation.pop("ChatSettings")}
        />
        <ChatSettingsView>
          <AvatarSide>
            <Avatar
              srcImg={chat.activeChat.chatImage}
              style={{ width: 100, height: 100, borderRadius: 100 }}
              chatName={chat.activeChat.chatName}
              size="big"
              avatarColor="#996699" />
          </AvatarSide>
          {_.map(chatSettingsItems, item => (<ChatSettingsItem>
            {isChatEdit ?
              <Input
                placeholder={item.title}
                onChangeText={text => this.setState({ [item.fieldName]: text })}
                value={this.state[item.fieldName]}
                error={this.state.error[item.fieldName]}
                textContentType={item.fieldName}
              /> :
              <Text style={{ fontSize: 24, marginTop: 16, marginBottom: 16 }}>{item.title}: {this.state[item.fieldName] || 'Empty'}</Text>
            }
          </ChatSettingsItem>))}
          <Button
            onPress={isChatEdit ? () => this.saveChatSettings() : () => this.setState({ isChatEdit: true })}>
            {isChatEdit ? 'Save' : 'Edit'}
          </Button>
        </ChatSettingsView>
      </ChatSettingsWrap>
    );
  }
}

const ChatSettingsWrap = styled(View)`
        display: flex;
        flexDirection: column;
        height: 100%;
      `;

const ChatSettingsItem = styled(View)`
        display: flex;
        flexDirection: column;
        alignItems: center;
        justifyContent: center;
      `;

const ChatSettingsView = styled(View)`
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
  saveChatSettings
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatSettings);
