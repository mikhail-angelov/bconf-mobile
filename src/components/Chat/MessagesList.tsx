import React from 'react'
import _ from 'lodash'
import { FlatList, RefreshControl } from 'react-native'
import Message from './Message'
import { WHITE_COLOR } from '../../helpers/styleConstants'

interface IProps {
    userEmail: string
    isSearchBarActive: boolean
    messages: object
    currentSelectedMessage: object
    filteredMessages: object
    refreshing: boolean
    chatId: string
    getMessages: (chatId: string) => void
}
export class MessagesList extends React.Component<IProps> {
    public componentDidUpdate(prevProps) {
        if (prevProps.messages.length !== this.props.messages.length && this.props.messages.length !== 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 })
        }
        if (prevProps.currentSelectedMessage !== this.props.currentSelectedMessage && this.props.currentSelectedMessage) {
            const indexMessage = _.findIndex(this.props.messages, this.props.currentSelectedMessage)
            this.flatListRef.scrollToIndex({ animated: true, index: indexMessage, viewPosition: 0.5 })
        }
    }

    public MessagesItem = ({ item }) => {
        const { userEmail, currentSelectedMessage, filteredMessages, isSearchBarActive } = this.props
        return (
            <Message
                key={item._id}
                idx={item._id}
                voiceMessagePlayers={this.props.voiceMessagePlayers}
                downloadPlayer={this.props.downloadPlayer}
                togglePlayer={this.props.togglePlayer}
                files={item.links}
                audioFiles={item.audioLinks}
                text={item.text}
                isMyMessage={item.author.email === userEmail}
                timestamp={item.timestamp}
                selectedMessage={isSearchBarActive && filteredMessages.length !== 0 ? _.isEqual(currentSelectedMessage, item) : null}
            />
        )
    }

    public render() {
        const { messages, getMessages, chatId, refreshing } = this.props
        return (
            <FlatList
                inverted
                onScrollToIndexFailed={() => console.log('scroll error')}
                ref={ref => {
                    this.flatListRef = ref
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => getMessages(chatId)} />}
                style={{
                    paddingRight: 20,
                    paddingLeft: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: `${WHITE_COLOR}`,
                }}
                data={messages}
                renderItem={this.MessagesItem}
            />
        )
    }
}
