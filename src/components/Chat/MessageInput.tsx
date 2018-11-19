import React from "react";
import { connect } from "react-redux";
import { View, TextInput, Image, Dimensions, ScrollView } from "react-native";
import _ from 'lodash'
import { SOFT_BLUE_COLOR, WHITE_COLOR } from "../../helpers/styleConstants";
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import styled from "styled-components";
import * as Progress from 'react-native-progress';
import { uploadPhotoInMessage, deletePhotoInMessage, deleteAllPhotoInMessageLocaly } from '../../actions/chat'

const { height } = Dimensions.get('window') // it's for IphoneX

interface IProps {
  handleSendMessage: (textInput) => void;
  uploadPhotoInMessage: (imageUrl) => void;
  deletePhotoInMessage: (imageUrl) => void;
  deleteAllPhotoInMessageLocaly: () => void;
  chatId: string;
  imagesInCurrentMessage: object
}
interface IState {
  textInput: string;
}
class MessageInput extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ""
    };
    this.handleSending = this.handleSending.bind(this);
  }

  public handleSending(message) {
    this.props.handleSendMessage(message);
    this.props.deleteAllPhotoInMessageLocaly();
    this.setState({ textInput: "" });
  }

  public getPhotos = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.props.uploadPhotoInMessage(image)
    }
    );
  }

  public render() {
    const { textInput } = this.state
    const { chat } = this.props
    return (
      <MessageInputView>
        <Icon
          style={{ marginLeft: 12, marginRight: 12 }}
          size={22}
          name="microphone"
          backgroundColor={WHITE_COLOR}
          color="#f5775f" />
        <View style={{ flex: 4 }}>
          <TextInput
            onSubmitEditing={() => this.handleSending({ text: textInput, links: chat.imagesInCurrentMessage })}
            onChangeText={text => {
              this.setState({ textInput: text });
            }}
            value={textInput}
            returnKeyType="send"
            returnKeyLabel="Send"
            placeholder="Your message"
            style={{ backgroundColor: "transparent", fontSize: 18, margin: 0, }}
          />
        </View>
        <Icon
          size={22}
          name="grin"
          backgroundColor={WHITE_COLOR}
          color={SOFT_BLUE_COLOR} />
        <Icon
          onPress={() => {
            this.getPhotos()
          }}
          style={{ marginLeft: 12, marginRight: 12 }}
          size={22}
          name="paperclip"
          color={SOFT_BLUE_COLOR} />
        <UploadPhotoWrap horizontal={true}>
          {_.map(chat.imagesInCurrentMessage, imageUrl => (
            <MessageImageWrap>
              <MessageImage
                source={{ uri: imageUrl }}
              />
              <CloseIcon
                onPress={() => {
                  this.props.deletePhotoInMessage(imageUrl)
                }}
                solid
                size={22}
                name="times-circle"
                backgroundColor={WHITE_COLOR}
                color={SOFT_BLUE_COLOR} />
            </MessageImageWrap>
          ))
          }
          {chat.uploadingPhoto && <MessageImageProgress>
            {chat.uploadingPhotoProgress === 0 && <Progress.Circle color={SOFT_BLUE_COLOR} size={50} indeterminate={true} />}
            {chat.uploadingPhotoProgress !== 0 && <Progress.Pie color={SOFT_BLUE_COLOR} progress={chat.uploadingPhotoProgress} size={50} />}
          </MessageImageProgress>}
        </UploadPhotoWrap>
      </MessageInputView>
    );
  }
}

const mapDispatchToProps = {
  uploadPhotoInMessage,
  deletePhotoInMessage,
  deleteAllPhotoInMessageLocaly
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);


const MessageInputView = styled(View)`
flex-direction: row
padding: 4px;
margin: 10px;
    marginBottom: ${height > 800 ? "30px" : "10px"}
    align-items: center;
    justify-content: center;
    borderWidth: 1;
    borderColor: #888;
    backgroundColor: #d6efef;
    borderRadius: 5px;
    borderColor: ${WHITE_COLOR};
    min-height: 50px;
    `;

const MessageImage = styled(Image)`
    overflow: hidden; 
    width: 130; 
    height: 80; 
    borderWidth: 0.5; 
    borderRadius: 10;
    marginBottom: 5; 
    marginTop: 10; 
    marginRight: 10; 
    backgroundColor: ${WHITE_COLOR}; 
    borderColor: ${SOFT_BLUE_COLOR};
    `;

const UploadPhotoWrap = styled(ScrollView)`
    flex-direction: row;
    position: absolute; 
    bottom: 50; 
    right: 0;
    width: 100%;
    `;

const MessageImageProgress = styled(View)`
      overflow: hidden; 
      width: 130; 
      height: 80;
      borderWidth: 0.5;
      borderRadius: 10;
      display: "flex";
      alignItems: 'center';
      justifyContent: 'center';
      marginBottom: 5; 
      marginTop: 10;
      marginRight: 10; 
      backgroundColor: ${WHITE_COLOR};
      borderColor: ${SOFT_BLUE_COLOR}
      `;

const MessageImageWrap = styled(View)``;

const CloseIcon = styled(Icon)`
      overflow: hidden;
      backgroundColor: ${WHITE_COLOR};
      borderRadius: 11; 
      top: 0; 
      right: 0; 
      position: absolute
      `;