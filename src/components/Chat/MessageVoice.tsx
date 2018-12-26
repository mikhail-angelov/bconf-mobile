import React from 'react'
import { BLACK_COLOR, WHITE_COLOR, SOFT_BLUE_COLOR } from '../../helpers/styleConstants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text, TouchableOpacity, Slider } from 'react-native'
import styled from 'styled-components'
import _ from 'lodash'

interface IProps {
    fileUrl: string
    playStatus: string
    togglePlayer: () => void
    downloadPlayer: (url) => void
    setCurrentTime: (value) => void
    clearTimeout: () => void
    voiceMessagePlayers: object
    isDownloaded: boolean
}

interface IState {
    currentTime: number
}

export class MessageVoice extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
    }

    public getAudioTimeString(currentTime, duration) {
        const cm = Math.floor((currentTime % (60 * 60)) / 60)
        const cs = Math.floor(currentTime % 60)
        const dm = Math.floor((duration % (60 * 60)) / 60)
        const ds = Math.floor(duration % 60)

        return (
            (cm < 10 ? '0' + cm : cm) +
            ':' +
            (cs < 10 ? '0' + cs : cs) +
            '/' +
            (dm < 10 ? '0' + dm : dm) +
            ':' +
            (ds < 10 ? '0' + ds : ds)
        )
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
                    size={20}
                    name={
                        !voiceMessagePlayers || !voiceMessagePlayers.isDownloaded
                            ? 'download'
                            : voiceMessagePlayers && voiceMessagePlayers.playStatus !== 'pause'
                            ? 'pause'
                            : 'play'
                    }
                    backgroundColor={WHITE_COLOR}
                    style={{ margin: 8 }}
                    color={WHITE_COLOR}
                />
                {voiceMessagePlayers && (
                    <ProgressiveWrap>
                        <Progress
                            onTouchStart={() => this.props.clearTimeout()}
                            style={{ borderRadius: 10 }}
                            value={+voiceMessagePlayers.currentTime}
                            maximumValue={+voiceMessagePlayers.audioDuration}
                            onValueChange={value => this.props.setCurrentTime(Math.floor(value))}
                        />
                        <Time>
                            {this.getAudioTimeString(
                                voiceMessagePlayers.currentTime || 0,
                                voiceMessagePlayers.audioDuration
                            )}
                        </Time>
                    </ProgressiveWrap>
                )}
            </MessageVoiceWrap>
        )
    }
}

const Time = styled(Text)``

const Progress = styled(Slider)`
    background-color: ${WHITE_COLOR};
    border-radius: 10;
    width: 250;
`

const ProgressiveWrap = styled(View)``
const MessageVoiceWrap = styled(View)`
    width: 285;
    height: 55;
    border-width: 0.5;
    border-radius: 10;
    margin-bottom: 5;
    background-color: ${SOFT_BLUE_COLOR};
    border-color: ${SOFT_BLUE_COLOR};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`
