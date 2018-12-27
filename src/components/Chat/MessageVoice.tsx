import React from 'react'
import { BLACK_COLOR, WHITE_COLOR, SOFT_BLUE_COLOR } from '../../helpers/styleConstants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text, TouchableOpacity, Slider } from 'react-native'
import styled from 'styled-components'
import _ from 'lodash'

interface IProps {
    fileUrl: string
    playStatus: string
    togglePlayer: (fileUrl) => void
    setCurrentTime: (value) => void
    clearTimeout: () => void
    voiceMessagePlayer: object
}

export class MessageVoice extends React.Component<IProps> {
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
        const { fileUrl, voiceMessagePlayer } = this.props
        return (
            <MessageVoiceWrap>
                <Icon
                    onPress={() => this.props.togglePlayer(fileUrl)}
                    size={20}
                    name={
                        _.isEmpty(voiceMessagePlayer)
                            ? 'download'
                            : voiceMessagePlayer && voiceMessagePlayer.playStatus !== 'pause'
                            ? 'pause'
                            : 'play'
                    }
                    backgroundColor={WHITE_COLOR}
                    style={{ margin: 8 }}
                    color={WHITE_COLOR}
                />
                {!_.isEmpty(voiceMessagePlayer) && (
                    <ProgressiveWrap>
                        <Progress
                            onTouchStart={() => this.props.clearTimeout()}
                            style={{ borderRadius: 10 }}
                            value={voiceMessagePlayer.currentTime}
                            maximumValue={voiceMessagePlayer.audioDuration}
                            onValueChange={value => {
                                this.props.setCurrentTime(value)
                            }}
                        />
                        <Time>
                            {this.getAudioTimeString(
                                voiceMessagePlayer.currentTime || 0,
                                voiceMessagePlayer.audioDuration
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
