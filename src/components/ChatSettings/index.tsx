import React from 'react'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native'
import SingleChatSettings from './singleChatSettings'
import GroupChatSettings from './groupChatSettings'

interface IProps {
    chat: any
}

class ChatSettings extends React.Component<IProps> {
    public render() {
        const { chat } = this.props
        const activeChat = chat.activeChat
        console.log(activeChat.users.length)
        return activeChat.users.length <= 2 ? <SingleChatSettings /> : <GroupChatSettings />
    }
}

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat })

export default connect(
    mapStateToProps,
    null
)(ChatSettings)
