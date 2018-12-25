import React from 'react'
import { BLACK_COLOR, WHITE_COLOR, SOFT_BLUE_COLOR } from '../../helpers/styleConstants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text } from 'react-native'
import styled from 'styled-components'

interface IProps {
    fileUrl: string
    playStatus: string
    togglePlayer: () => void
    downloadPlayer: (url) => void
    voiceMessagePlayers: object
    isDownloaded: boolean
}

interface IState {
    isPlayning: boolean
}

export class MessageVoice extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
    }

    public render() {
        const { fileUrl, voiceMessagePlayers } = this.props
        return (
            <MessageVoiceWrap>
                <Icon
                    onPress={() =>
                        !voiceMessagePlayers || !voiceMessagePlayers.isDownloaded
                            ? this.props.downloadPlayer(fileUrl)
                            : this.props.togglePlayer()
                    }
                    size={50}
                    name={
                        !voiceMessagePlayers || !voiceMessagePlayers.isDownloaded
                            ? 'download'
                            : voiceMessagePlayers && voiceMessagePlayers.playStatus !== 'stop'
                            ? 'play'
                            : 'stop'
                    }
                    backgroundColor={WHITE_COLOR}
                    style={{ margin: 8 }}
                    color={WHITE_COLOR}
                />
            </MessageVoiceWrap>
        )
    }
}

const MessageVoiceWrap = styled(View)`
    width: 85;
    height: 85;
    border-width: 0.5;
    border-radius: 10;
    margin-bottom: 5;
    background-color: ${SOFT_BLUE_COLOR};
    border-color: ${SOFT_BLUE_COLOR};
    display: flex;
    justify-content: center;
    align-items: center;
`
