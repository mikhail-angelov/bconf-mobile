import React from "react";
import styled from "styled-components";
import { BLACK_COLOR, WHITE_COLOR, SOFT_BLUE_COLOR } from "../../helpers/styleConstants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, Image, Dimensions } from "react-native";
import _ from "lodash"
import moment from "moment";
import Sound from 'react-native-sound';

import { MESSAGE_TIMESTAMP_FORMAT } from '../../helpers/constants'

const { width } = Dimensions.get('window')

interface IProps {
  text: string;
  files: object;
  audioFiles: object;
  idx: string;
  isMyMessage: boolean;
  timestamp: number;
  selectedMessage: object;
}

export default class Message extends React.Component<IProps>{
  constructor(props) {
    super(props)
    this.state = {
      duration: {},
      stateAudioFiles: {}
    }
  }


  public render() {
    const { text, files, audioFiles, idx, isMyMessage, timestamp, selectedMessage } = this.props
    return (
      <View style={{ backgroundColor: selectedMessage ? SOFT_BLUE_COLOR : "transparent", borderRadius: 10 }}>
        <MessageWrapper isMyMessage={isMyMessage}>
          {_.map(files, fileUrl => (
            <MessageImage
              source={{ uri: fileUrl }}
            />))}
          {_.map(audioFiles, fileUrl => (
            <MessageVoice>
              <Icon
                onPress={
                  () => {
                    const sound = new Sound(fileUrl, '', (error) => {
                      if (error) {
                        console.log('failed to load the sound', error);
                      }
                    });
                    this.setState({ [fileUrl]: { duration: sound.getDuration(), currentTime: sound.getCurrentTime(), isDownloaded: true } });
                    sound.play((success) => {
                      if (success) {
                        console.log('successfully finished playing');
                      } else {
                        console.log('playback failed due to audio decoding errors');
                      }
                    })
                  }}
                size={32}
                name="play"
                backgroundColor={WHITE_COLOR}
                style={{ margin: 8 }}
                color={WHITE_COLOR} />
              <Text>{this.state.duration[fileUrl]}</Text>
            </MessageVoice>))}
          <MessageText isMyMessage={isMyMessage}>{text}</MessageText>
          <DateText isMyMessage={isMyMessage}>
            {moment(timestamp).format(MESSAGE_TIMESTAMP_FORMAT)}
          </DateText>
        </MessageWrapper>
      </View>
    );
  };
}

interface IMessageProps {
  isMyMessage: boolean;
  selectedMessage: boolean;
}

const MessageWrapper = styled(View).attrs({})`
          padding: 10px;
          border-radius: 10px;
  background-color: ${(props: IMessageProps) =>
    props.isMyMessage ? "#d6efef" : "#fef8e5"};
      margin: 5px;
      flex: none;
  align-self: ${(props: IMessageProps) =>
    props.isMyMessage ? "flex-end" : "flex-start"};
      max-width: 90%;
  text-align: ${(props: IMessageProps) =>
    props.isMyMessage ? "right" : "left"};
    `;

const MessageText = styled(Text)`
      margin-bottom: 3px;
      color: black;
      letter-spacing: 0.7px;
  text-align: ${(props: IMessageProps) =>
    props.isMyMessage ? "right" : "left"};
    `;

const DateText = styled(Text)`
      font-size: 12px;
  color: ${BLACK_COLOR};
  text-align: ${(props: IMessageProps) =>
    props.isMyMessage ? "right" : "left"};
    `;

const MessageImage = styled(Image)`
        overflow: hidden;
        width: 280;
        height: 180;
        border-width: 0.5;
        border-radius: 10;
        margin-bottom: 5;
    background-color: ${WHITE_COLOR};
    border-color: ${SOFT_BLUE_COLOR};
    `;
const MessageVoice = styled(View)`
        width: 280;
        height: 50;
        border-width: 0.5;
        border-radius: 10;
        margin-bottom: 5;
    border-color: ${SOFT_BLUE_COLOR};
    `;
