import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Text, TouchableOpacity, Modal } from 'react-native'
import _ from 'lodash'
import styled from 'styled-components'
import Input from '../CommonUIElements/Input'
import Button from '../CommonUIElements/Button'
import Header from '../Header'
import { updateChatSettings, changeChatPicture } from '../../actions/chat'
import { Avatar } from '../Avatar'
import ImagePicker from 'react-native-image-crop-picker'
import { Navigation } from 'react-native-navigation'
import * as Progress from 'react-native-progress'
import { SOFT_BLUE_COLOR } from '../../helpers/styleConstants'
import { goToAuth } from '../../navigation/navigation'

const { width } = Dimensions.get('window')

interface IProps {
    width: number
    chat: any
    auth: any
    chatColor: string
    chatImage: string
    updateChatSettings: ({ chatId, chatName, chatImage }) => void
    changeChatPicture: (image, activeChat) => void
}

interface IState {
    isChatEdit: boolean
    isUploadPhotoButtonVisible: boolean
    chatName: string
    error: object
    photos: object
}

class ChatSettings extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            chatName: props.chat.activeChat.chatName,
            error: { chatName: '' },
            isChatEdit: false,
            isUploadPhotoButtonVisible: false,
            photos: [],
        }
    }

    public updateChatSettings() {
        const { chat } = this.props
        const { chatName } = this.state
        this.setState({ isChatEdit: false })
        this.props.updateChatSettings({
            chatId: chat.activeChat.chatId,
            chatName,
            chatImage: chat.activeChat.chatImage,
        })
    }

    public componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.authenticated) {
            goToAuth()
        }
    }

    public getPhotos = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.props.changeChatPicture(image, this.props.chat.activeChat)
            this.setState({ isUploadPhotoButtonVisible: false })
        })
    }

    public render() {
        const { chat } = this.props
        const { isChatEdit, isUploadPhotoButtonVisible } = this.state
        const chatSettingsItems = [{ fieldName: 'chatName' }]
        const maxStringLength = 40
        return (
            <ChatSettingsWrap>
                <Header
                    title="Chat Settings"
                    width={width}
                    leftIconName="arrow-left"
                    leftIconFunction={() => Navigation.pop('ChatSettings')}
                    rightIconFunction={isChatEdit ? () => this.updateChatSettings() : () => this.setState({ isChatEdit: true })}
                    rightIconName={isChatEdit ? 'check' : 'pencil'}
                />
                <ChatSettingsView>
                    <AvatarSide onPress={() => this.setState({ isUploadPhotoButtonVisible: true })}>
                        <Avatar
                            srcImg={chat.activeChat.chatImage}
                            style={{
                                width: 100,
                                height: 100,
                                elevation: 3,
                                borderRadius: 100,
                            }}
                            name={chat.activeChat.chatName}
                            size="big"
                            avatarColor={chat.activeChat.chatColor}
                        />
                    </AvatarSide>
                    <ChatSettingsItemsWrap>
                        {_.map(chatSettingsItems, item => (
                            <ChatSettingsItem>
                                {isChatEdit ? (
                                    <Input
                                        placeholder={item.title}
                                        onChangeText={text => this.setState({ [item.fieldName]: text })}
                                        value={this.state[item.fieldName]}
                                        error={this.state.error[item.fieldName]}
                                        textContentType={item.fieldName}
                                    />
                                ) : (
                                    <Text style={{ fontSize: 24, marginTop: 6, marginBottom: 6, maxHeight: 60 }}>
                                        {this.state[item.fieldName] && this.state[item.fieldName].length > maxStringLength
                                            ? this.state[item.fieldName].substring(0, maxStringLength - 3) + '...'
                                            : this.state[item.fieldName] || 'Empty'}
                                    </Text>
                                )}
                            </ChatSettingsItem>
                        ))}
                    </ChatSettingsItemsWrap>
                </ChatSettingsView>
                <View>
                    {/* buttons */}
                    <Modal animationType="slide" transparent={true} visible={isUploadPhotoButtonVisible}>
                        <View style={{ bottom: 0, position: 'absolute', width: '95%', marginRight: 10 }}>
                            <Button
                                onPress={() => {
                                    this.getPhotos()
                                }}
                                style={{ width: '100%' }}
                            >
                                Choose photo
                            </Button>
                            <Button style={{ width: '100%' }} onPress={() => this.setState({ isUploadPhotoButtonVisible: false })}>
                                Cancel
                            </Button>
                        </View>
                    </Modal>
                </View>
                {chat.uploadingChatPhoto && (
                    <UploadSection>
                        {chat.uploadingChatPhoto && chat.uploadingChatPhotoProgress === 0 && <Progress.Circle color={SOFT_BLUE_COLOR} size={100} indeterminate={true} />}
                        {chat.uploadingChatPhotoProgress !== 0 && <Progress.Pie color={SOFT_BLUE_COLOR} progress={chat.uploadingChatPhotoProgress} size={100} />}
                    </UploadSection>
                )}
            </ChatSettingsWrap>
        )
    }
}

const UploadSection = styled(View)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const ChatSettingsWrap = styled(View)`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const ChatSettingsItemsWrap = styled(View)`
    display: flex;
    flex-direction: column;
    width: 70%;
    justify-content: center;
`

const ChatSettingsItem = styled(View)``

const ChatSettingsView = styled(View)`
    display: flex;
    flex-direction: row;
    height: 20%;
    align-items: center;
`

const AvatarSide = styled(TouchableOpacity)`
    display: flex;
    margin: 15px;
`

const mapDispatchToProps = {
    updateChatSettings,
    changeChatPicture,
}

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatSettings)
