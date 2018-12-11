import React from "react";
import { BLACK_COLOR, WHITE_COLOR, SOFT_BLUE_COLOR } from "../../helpers/styleConstants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text } from "react-native";
import Sound from 'react-native-sound';
import styled from "styled-components";


interface IProps {
    fileUrl: string;
}

interface IState {
    isPlayning: boolean;
}

export class MessageVoice extends React.Component<IProps, IState>{
    constructor(props) {
        super(props)
        this.state = {
            duration: {},
            stateAudioFiles: {},
            isPlayning: false,
        }
        this.sound = new Sound(this.props.fileUrl, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            }
        });
    }

    public render() {
        const { fileUrl } = this.props
        console.log(this.state)
        return (
            <MessageVoiceWrap>
                <Icon
                    onPress={() => {
                        this.state.isPlayning
                            ? this.setState({ isPlayning: false })
                            : console.log(this.sound)
                        this.sound.play((success) => {
                            this.setState({ [fileUrl]: { duration: this.sound.getDuration(), isPlayning: true } });
                            if (success) {
                                console.log('successfully finished playing');
                            } else {
                                console.log('playback failed due to audio decoding errors');
                            }
                            this.setState({ [fileUrl]: { isPlayning: false } });
                        });
                    }
                    }
                    size={32}
                    name={this.state[fileUrl] && this.state[fileUrl].isPlayning ? "stop" : "play"}
                    backgroundColor={WHITE_COLOR}
                    style={{ margin: 8 }}
                    color={WHITE_COLOR} />
                {/* <Text>{this.state.duration[fileUrl]}</Text> */}
            </MessageVoiceWrap>
        );
    };
}

const MessageVoiceWrap = styled(View)`
        width: 280;
        height: 50;
        border-width: 0.5;
        border-radius: 10;
        margin-bottom: 5;
    background-color: ${SOFT_BLUE_COLOR};
    border-color: ${SOFT_BLUE_COLOR};
    `;
