import React from "react";
import _ from "lodash";
import { FlatList } from 'react-native';
import styled from "styled-components";
import Message from "./Message";
import { WHITE_COLOR } from "../../helpers/styleConstants";

interface IProps {
  userEmail: string;
  isSearchBarActive: boolean;
  messages: object;
  currentSelectedMessage: object;
  filteredMessages: object;
  voiceMessagePlayers: object;
  togglePlayer: () => void;
  clearTimeout: () => void;
  setCurrentTime: () => void;
  downloadPlayer: (url) => void;
}
export class MessagesList extends React.Component<IProps> {
    public componentDidUpdate(prevProps) {
        if (prevProps.messages.length !== this.props.messages.length && this.props.messages.length !== 0) {
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 })
        }
        if (
            prevProps.currentSelectedMessage !== this.props.currentSelectedMessage &&
            this.props.currentSelectedMessage
        ) {
            const indexMessage = _.findIndex(this.props.messages, this.props.currentSelectedMessage)
            this.flatListRef.scrollToIndex({ animated: true, index: indexMessage, viewPosition: 0.5 })
        }
    }

  public MessagesItem = ({ item }) => {
    const { userEmail, currentSelectedMessage, filteredMessages, isSearchBarActive } = this.props
    return (<Message key={item._id} idx={item._id}
      voiceMessagePlayers={this.props.voiceMessagePlayers}
      downloadPlayer={this.props.downloadPlayer}
      togglePlayer={this.props.togglePlayer}
      setCurrentTime={this.props.setCurrentTime}
      clearTimeout={this.props.clearTimeout}
      files={item.links}
      audioFiles={item.audioLinks}
      text={item.text} isMyMessage={item.author.email === userEmail}
      timestamp={item.timestamp}
      selectedMessage={isSearchBarActive && filteredMessages.length !== 0 ? _.isEqual(currentSelectedMessage, item) : null} />
    )
  }

    public render() {
        const { messages } = this.props
        return (
            <FlatList
                inverted
                onScrollToIndexFailed={() => console.log('scroll error')}
                ref={ref => {
                    this.flatListRef = ref
                }}
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
