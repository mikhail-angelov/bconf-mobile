import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, Dimensions, TouchableOpacity, Text, View } from 'react-native'
import styled from 'styled-components'
import Header from '../Header'
import { Navigation } from 'react-native-navigation'
import MessageInput from './MessageInput'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { MessagesList } from './MessagesList'
import { goToAuth } from '../../navigation/navigation'
import { WHITE_COLOR, SOFT_BLUE_COLOR } from '../../helpers/styleConstants'
import {
    setFindMessagesInputValue,
    cleanFindMessagesInputValue,
    togglePlayer,
    downloadPlayer,
} from '../../actions/messages'
import { sendMessage, unsetActiveChat, getChatlistTimestamp, openSearchBar, closeSearchBar } from '../../actions/chat'
import _ from 'lodash'

const { height } = Dimensions.get('window') // it's for IphoneX

interface IState {
    currentSelectedMessage: object
    currentMessageNumber: number
}
interface IProps {
    chat: any
    auth: any
    sendMessage: (chatId, text) => void
    unsetActiveChat: () => void
    getChatlistTimestamp: () => void
    openSearchBar: () => void
    closeSearchBar: () => void
    setFindMessagesInputValue: () => void
    cleanFindMessagesInputValue: () => void
    togglePlayer: () => void
    downloadPlayer: (url) => void
    chatId: string
    chatName: string
    chatImage: string | undefined
    width: string
    chatColor: string
    messages: any
    messagesByUserId: object
    filteredMessages: object
    voiceMessagePlayers: object
    isSearchBarActive: boolean
}
class Chat extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            currentMessageNumber: 0,
            currentSelectedMessage: [],
        }
    }
    public componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.authenticated) {
            goToAuth()
        }
    }

    public componentDidUpdate(prevProps) {
        if (prevProps.filteredMessages.length !== this.props.filteredMessages.length) {
            this.setState({ currentSelectedMessage: this.props.filteredMessages[0] })
        }
    }

    public nextMessage(currentMessageNumber) {
        const { filteredMessages } = this.props
        const newNumber = currentMessageNumber === filteredMessages.length - 1 ? 0 : currentMessageNumber + 1
        const nextMessage = filteredMessages[newNumber]
        this.setState({ currentSelectedMessage: nextMessage, currentMessageNumber: newNumber })
    }

    public prevMessage(currentMessageNumber) {
        const { filteredMessages } = this.props
        const newNumber = currentMessageNumber === 0 ? filteredMessages.length - 1 : currentMessageNumber - 1
        const nextMessage = filteredMessages[newNumber]
        this.setState({ currentSelectedMessage: nextMessage, currentMessageNumber: newNumber })
    }

    public render() {
        const { chat, width, auth, messagesByUserId, filteredMessages, voiceMessagePlayers } = this.props
        const { currentSelectedMessage, currentMessageNumber } = this.state
        return (
            <ChatView style={{ width }}>
                <Header
                    whatSearch="Messages"
                    isSearchResultEmpty={filteredMessages.length > 0}
                    inputHandler={this.props.setFindMessagesInputValue}
                    isSearchBarActive={chat.isSearchBarActive}
                    headerTitleFunction={() =>
                        Navigation.push('ChatList', {
                            component: {
                                id: 'ChatSettings',
                                name: 'ChatSettings',
                                options: {
                                    topBar: {
                                        visible: false,
                                        drawBehind: true,
                                        animate: false,
                                    },
                                },
                            },
                        })
                    }
                    rightIconFunction={
                        chat.isSearchBarActive
                            ? () => {
                                  this.props.closeSearchBar()
                                  this.props.cleanFindMessagesInputValue()
                              }
                            : () => this.props.openSearchBar()
                    }
                    rightIconName={chat.isSearchBarActive ? 'times' : 'search'}
                    chatImage={chat.activeChat.chatImage}
                    title={chat.activeChat.chatName}
                    subTitle="Last seen recently"
                    width={width}
                    isAvatarVisible={true}
                    leftIconFunction={() => {
                        this.props.cleanFindMessagesInputValue()
                        this.props.getChatlistTimestamp()
                        this.props.unsetActiveChat()
                        Navigation.popToRoot('ChatList')
                        if (chat.isSearchBarActive) {
                            this.props.closeSearchBar()
                        }
                    }}
                    chatColor={chat.activeChat.chatColor}
                    leftIconName="arrow-left"
                />
                <MessagesList
                    voiceMessagePlayers={voiceMessagePlayers}
                    downloadPlayer={this.props.downloadPlayer}
                    togglePlayer={this.props.togglePlayer}
                    isSearchBarActive={chat.isSearchBarActive}
                    filteredMessages={filteredMessages}
                    messages={messagesByUserId}
                    userEmail={auth.email}
                    currentSelectedMessage={currentSelectedMessage}
                />
                {chat.isSearchBarActive ? (
                    <SearchMessagesBar>
                        <Icon.Button
                            size={20}
                            onPress={() => this.nextMessage(currentMessageNumber)}
                            backgroundColor="d6efef"
                            name="arrow-up"
                            color={SOFT_BLUE_COLOR}
                        />
                        <Text style={{ marginRight: 10, marginLeft: 10 }}>
                            {filteredMessages.length} / {filteredMessages.length ? currentMessageNumber + 1 : 0}
                        </Text>
                        <Icon.Button
                            size={20}
                            onPress={() => this.prevMessage(currentMessageNumber)}
                            name="arrow-down"
                            backgroundColor="d6efef"
                            color={SOFT_BLUE_COLOR}
                        />
                    </SearchMessagesBar>
                ) : (
                    <MessageInput
                        handleSendMessage={message => this.props.sendMessage(chat.activeChat.chatId, message)}
                    />
                )}
            </ChatView>
        )
    }
}

const SearchMessagesBar = styled(View)`
    flex-direction: row;
    padding: 4px;
    margin: 10px;
    margin-bottom: ${height > 800 ? '30px' : '10px'};
    align-items: center;
    justify-content: center;
    border-width: 1;
    border-color: #888;
    background-color: #d6efef;
    border-radius: 5px;
    border-color: ${WHITE_COLOR};
    min-height: 50px;
`

const ChatView = styled(KeyboardAvoidingView).attrs({
    behavior: 'padding',
})`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const mapDispatchToProps = {
    sendMessage,
    unsetActiveChat,
    getChatlistTimestamp,
    openSearchBar,
    closeSearchBar,
    setFindMessagesInputValue,
    cleanFindMessagesInputValue,
    togglePlayer,
    downloadPlayer,
}

const selector = state => {
    const filteredMessages = _.filter(state.messages.allMessages[state.chat.activeChat.chatId], message => {
        return message.text.indexOf(state.messages.findMessagesInputValue) !== -1
    })
    const messagesByUserId = _.get(state, `messages.allMessages[${state.chat.activeChat.chatId}]`, [])
    return {
        auth: state.auth,
        chat: state.chat,
        messagesByUserId,
        filteredMessages,
        voiceMessagePlayers: state.messages.voiceMessagePlayers,
    }
}

const mapStateToProps = state => selector(state)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)
