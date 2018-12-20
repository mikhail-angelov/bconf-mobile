import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Text, TouchableOpacity, ScrollView, Animated } from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components'
import { WHITE_COLOR, SOFT_BLUE_COLOR, BLACK_COLOR, GRAY_COLOR } from '../../helpers/styleConstants'
import { addUserToChatLocaly, deleteUserFromChatLocaly, findUsers, deleteAllUsersFromChatLocaly, createNewChat, openSearchBar, closeSearchBar } from '../../actions/chat'
import { Avatar } from '../Avatar'
import Header from '../Header'
import AppearedButton from '../CommonUIElements/AppearedButton'
import { Navigation } from 'react-native-navigation'
import { goToAuth } from '../../navigation/navigation'

const { width } = Dimensions.get('window')

interface IProps {
    findUsers: (username) => void
    addUserToChatLocaly: (user) => void
    deleteUserFromChatLocaly: (user) => void
    createNewChat: (users) => void
    auth: any
    chat: any
    users: object
    deleteAllUsersFromChatLocaly: () => void
    openSearchBar: () => void
    closeSearchBar: () => void
}
class AddChat extends React.Component<IProps> {
    constructor(props) {
        super(props)
    }

    public createNewChatAndSetActiveChat() {
        const { chat } = this.props
        this.props.createNewChat(chat.usersInNewChat)
        this.props.deleteAllUsersFromChatLocaly()
    }

    public componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.authenticated) {
            goToAuth()
        }
    }

    public render() {
        const { chat } = this.props
        return (
            <AddChatWrap>
                <Header
                    isSearchResultEmpty={chat.usersInNewChat.length > 0}
                    isSearchBarActive={chat.isSearchBarActive}
                    whatSearch="Username"
                    rightIconFunction={chat.isSearchBarActive ? () => this.props.closeSearchBar() : () => this.props.openSearchBar()}
                    rightIconName={chat.isSearchBarActive ? 'times' : 'search'}
                    inputHandler={this.props.findUsers}
                    title="Add Chat"
                    width={width}
                    leftIconName="arrow-left"
                    leftIconFunction={() => {
                        this.props.deleteAllUsersFromChatLocaly()
                        Navigation.popToRoot('ChatList')
                        if (chat.isSearchBarActive) {
                            this.props.closeSearchBar()
                        }
                    }}
                />
                <AddChatView>
                    <UserList>
                        {chat.usersInNewChat.length > 0 && (
                            <Text
                                style={{
                                    width: '100%',
                                    backgroundColor: SOFT_BLUE_COLOR,
                                    color: WHITE_COLOR,
                                    textAlign: 'center',
                                }}
                            >
                                Users in new conversation
                            </Text>
                        )}
                        {_.map(chat.usersInNewChat, item => (
                            <UserItem onPress={() => this.props.deleteUserFromChatLocaly(item)}>
                                <AvatarSide>
                                    <Avatar name={item.name} srcImg={item.srcAvatar} avatarColor={item.userColor} />
                                </AvatarSide>
                                <UserName>{item.name}</UserName>
                                <Icon size={18} name="check-circle" backgroundColor={WHITE_COLOR} color={SOFT_BLUE_COLOR} />
                            </UserItem>
                        ))}
                        {chat.users.length > 0 && (
                            <Text
                                style={{
                                    width: '100%',
                                    backgroundColor: SOFT_BLUE_COLOR,
                                    color: WHITE_COLOR,
                                    textAlign: 'center',
                                }}
                            >
                                Search
                            </Text>
                        )}
                        {_.map(chat.users, item => (
                            <UserItem onPress={() => this.props.addUserToChatLocaly(item)}>
                                <AvatarSide>
                                    <Avatar name={item.name} srcImg={item.srcAvatar} avatarColor={item.userColor} size={''} />
                                </AvatarSide>
                                <UserName>{item.name}</UserName>
                            </UserItem>
                        ))}
                    </UserList>
                </AddChatView>
                <AppearedButton
                    isButtonVisible={this.props.chat.usersInNewChat.length > 0}
                    buttonHandler={() => {
                        this.createNewChatAndSetActiveChat()
                        Navigation.push('ChatList', {
                            component: {
                                id: 'Chat',
                                name: 'Chat',
                                options: {
                                    topBar: {
                                        visible: false,
                                        drawBehind: true,
                                        animate: false,
                                    },
                                },
                            },
                        })
                    }}
                    iconName="plus"
                    iconSize={20}
                    buttonText="Create chat  "
                />
            </AddChatWrap>
        )
    }
}

const mapDispatchToProps = {
    findUsers,
    addUserToChatLocaly,
    deleteUserFromChatLocaly,
    createNewChat,
    deleteAllUsersFromChatLocaly,
    openSearchBar,
    closeSearchBar,
}

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddChat)

const AddChatWrap = styled(View)`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const AddChatView = styled(View)`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    width: ${width};
`

const UserName = styled(Text)`
    font-size: 18px;
    color: ${BLACK_COLOR};
    margin-left: 10px;
    width: 65%;
`

const UserList = styled(ScrollView)`
    width: 100%;
`

const AvatarSide = styled(View)`
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const UserItem = styled(TouchableOpacity)`
    width: ${width};
    height: 70px;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
