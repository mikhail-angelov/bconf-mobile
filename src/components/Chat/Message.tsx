import React from 'react'
import styled from 'styled-components'
import { BLACK_COLOR, WHITE_COLOR, SOFT_BLUE_COLOR } from '../../helpers/styleConstants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text, Image, Dimensions } from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import { MessageVoice } from './MessageVoice'
import { MESSAGE_TIMESTAMP_FORMAT } from '../../helpers/constants'

const { width } = Dimensions.get('window')

interface IProps {
    text: string
    files: object
    audioFiles: object
    idx: string
    isMyMessage: boolean
    timestamp: number
    selectedMessage: object
    voiceMessagePlayers: object | null
    downloadPlayer: (url) => void
    togglePlayer: () => void
    setCurrentTime: () => void
    clearTimeout: () => void
}

export default class Message extends React.Component<IProps> {
    constructor(props) {
        super(props)
        this.state = {
            duration: {},
            stateAudioFiles: {},
            isPlayning: false,
        }
    }

    public render() {
        const { text, files, audioFiles, isMyMessage, timestamp, selectedMessage, voiceMessagePlayers } = this.props
        return (
            <View style={{ backgroundColor: selectedMessage ? SOFT_BLUE_COLOR : 'transparent', borderRadius: 10 }}>
                <MessageWrapper isMyMessage={isMyMessage}>
                    {_.map(files, fileUrl => (
                        <MessageImage source={{ uri: fileUrl }} />
                    ))}
                    {_.map(audioFiles, fileUrl => (
                        <MessageVoice
                            setCurrentTime={this.props.setCurrentTime}
                            clearTimeout={this.props.clearTimeout}
                            fileUrl={fileUrl}
                            togglePlayer={this.props.togglePlayer}
                            downloadPlayer={this.props.downloadPlayer}
                            voiceMessagePlayers={voiceMessagePlayers ? voiceMessagePlayers[fileUrl] : null}
                        />
                    ))}
                    <MessageText isMyMessage={isMyMessage}>{text}</MessageText>
                    <DateText isMyMessage={isMyMessage}>{moment(timestamp).format(MESSAGE_TIMESTAMP_FORMAT)}</DateText>
                </MessageWrapper>
            </View>
        )
    }
}

interface IMessageProps {
    isMyMessage: boolean
    selectedMessage: boolean
}

const MessageWrapper = styled(View).attrs({})`
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props: IMessageProps) => (props.isMyMessage ? '#d6efef' : '#fef8e5')};
    margin: 5px;
    flex: none;
    align-self: ${(props: IMessageProps) => (props.isMyMessage ? 'flex-end' : 'flex-start')};
    justify-content: ${(props: IMessageProps) => (props.isMyMessage ? 'flex-end' : 'flex-start')};
    align-items: ${(props: IMessageProps) => (props.isMyMessage ? 'flex-end' : 'flex-start')};
    max-width: 90%;
    text-align: ${(props: IMessageProps) => (props.isMyMessage ? 'right' : 'left')};
`

const MessageText = styled(Text)`
    margin-bottom: 3px;
    color: black;
    letter-spacing: 0.7px;
    text-align: ${(props: IMessageProps) => (props.isMyMessage ? 'right' : 'left')};
`

const DateText = styled(Text)`
    font-size: 12px;
    color: ${BLACK_COLOR};
    text-align: ${(props: IMessageProps) => (props.isMyMessage ? 'right' : 'left')};
`

const MessageImage = styled(Image)`
    overflow: hidden;
    width: 280;
    height: 180;
    border-width: 0.5;
    border-radius: 10;
    margin-bottom: 5;
    background-color: ${WHITE_COLOR};
    border-color: ${SOFT_BLUE_COLOR};
`
