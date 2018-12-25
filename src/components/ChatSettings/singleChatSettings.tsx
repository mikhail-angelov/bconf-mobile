import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import styled from 'styled-components'
import Header from '../Header'
import { updateChatSettings, changeChatPicture } from '../../actions/chat'
import { Avatar } from '../Avatar'
import { Navigation } from 'react-native-navigation'
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

class SingleChatSettings extends React.Component<IProps, IState> {
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

    public componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.authenticated) {
            goToAuth()
        }
    }

    public render() {
        const { chat } = this.props
        const activeChat = chat.activeChat
        const chatSettingsItems = [{ fieldName: 'chatName' }]
        const maxStringLength = 40
        return (
            <ChatSettingsWrap>
                <Header title="Chat Settings" width={width} leftIconName="arrow-left" leftIconFunction={() => Navigation.pop('ChatSettings')} />
                <ChatSettingsView>
                    <AvatarSide>
                        <Avatar
                            srcImg={activeChat.chatImage}
                            style={{
                                width: 100,
                                height: 100,
                                elevation: 3,
                                borderRadius: 100,
                            }}
                            name={activeChat.chatName}
                            size="big"
                            avatarColor={activeChat.chatColor}
                        />
                    </AvatarSide>
                    <ChatSettingsItemsWrap>
                        {_.map(chatSettingsItems, (item, idx) => (
                            <ChatSettingsItem key={idx}>
                                <Text style={{ fontSize: 24, marginTop: 6, marginBottom: 6, maxHeight: 60 }}>
                                    {this.state[item.fieldName] && this.state[item.fieldName].length > maxStringLength
                                        ? this.state[item.fieldName].substring(0, maxStringLength - 3) + '...'
                                        : this.state[item.fieldName] || 'Empty'}
                                </Text>
                            </ChatSettingsItem>
                        ))}
                    </ChatSettingsItemsWrap>
                </ChatSettingsView>
            </ChatSettingsWrap>
        )
    }
}

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
)(SingleChatSettings)
