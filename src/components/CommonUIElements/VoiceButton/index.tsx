import React, { Component } from 'react'

import { Platform } from 'react-native'
import { WHITE_COLOR } from '../../../helpers/styleConstants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AudioRecorder, AudioUtils } from 'react-native-audio'

interface IProps {
    changePassword: (newPassword: string) => void
    uploadAudio: (filePath: string) => void
}
interface IState {
    currentTime: number
    recording: boolean
    paused: boolean
    stoppedRecording: boolean
    finished: boolean
    audioPath: string
    hasPermission: undefined | boolean
}

class AudioExample extends Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            currentTime: 0.0,
            recording: false,
            paused: false,
            stoppedRecording: false,
            finished: false,
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
            hasPermission: undefined,
        }
    }

    public prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: 'Low',
            AudioEncoding: 'aac',
            AudioEncodingBitRate: 32000,
        })
    }

    public componentDidMount() {
        AudioRecorder.requestAuthorization().then(isAuthorised => {
            this.setState({ hasPermission: isAuthorised })

            if (!isAuthorised) return

            this.prepareRecordingPath(this.state.audioPath)

            AudioRecorder.onProgress = data => {
                this.setState({ currentTime: data.currentTime })
            }

            AudioRecorder.onFinished = data => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this.finishRecording(data.status === 'OK', data.audioFileURL, data.audioFileSize)
                }
            }
        })
    }

    async stop() {
        if (!this.state.recording) {
            console.warn("Can't stop, not recording!")
            return
        }

        this.setState({ stoppedRecording: true, recording: false, paused: false })

        try {
            const filePath = await AudioRecorder.stopRecording()

            if (Platform.OS === 'android') {
                this.finishRecording(true, filePath)
            }
            return filePath
        } catch (error) {
            console.error(error)
        }
    }

    async record() {
        if (this.state.recording) {
            console.warn('Already recording!')
            return
        }

        if (!this.state.hasPermission) {
            console.warn("Can't record, no permission granted!")
            return
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath)
        }

        this.setState({ recording: true, paused: false })

        try {
            const filePath = await AudioRecorder.startRecording()
        } catch (error) {
            console.error(error)
        }
    }

    public finishRecording(didSucceed, filePath, fileSize) {
        this.setState({ finished: didSucceed })
        this.props.uploadAudio(filePath)
        console.log('filepath', filePath)
    }

    public render() {
        return (
            <Icon
                onPress={this.state.recording ? () => this.stop() : () => this.record()}
                style={{ marginLeft: 12, marginRight: 12 }}
                size={22}
                name={this.state.recording ? 'stop' : 'microphone'}
                backgroundColor={WHITE_COLOR}
                color="#f5775f"
            />
        )
    }
}

export default AudioExample
