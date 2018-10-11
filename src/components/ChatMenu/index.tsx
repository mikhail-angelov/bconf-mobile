import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components";
import _ from "lodash";
import { Avatar } from "../Avatar";

interface IProps {
    chat: any;
    activeChatColor: string;
    size: string;
    chatColor: string;
    name: string;
    chatMenuItems: object
}
class ChatMenu extends React.Component<IProps> {
    public render() {
        const { chatMenuItems } = this.props
        return (
            <ChatMenuView>
                <ChatMenuHeader>
                    <AvatarWrap>
                        <Avatar size="middle" chatColor="#996699" name='Anton' />
                    </AvatarWrap>
                    <AvatarUsername>Anton</AvatarUsername>
                </ChatMenuHeader>
                <ChatMenuBody>
                    {_.map(chatMenuItems, item => (
                        <ChatMenuItem>
                            <ChatMenuTitle onPress={() => item.handler()}>{item.title}</ChatMenuTitle>
                        </ChatMenuItem>
                    ))}
                </ChatMenuBody>
            </ChatMenuView>
        );
    }
}

const ChatMenuView = styled(View)`
  display: flex;
  flexDirection: column;
  height: 100%;
  paddingTop: 20px;
`;

const ChatMenuHeader = styled(View)`
  display: flex;
  justifyContent: flex-start;
  alignItems: center;
  flexDirection: row;
  borderBottomWidth: 3;
  borderColor: rgba(0,0,0,0.05);
  height: 70px;
  padding: 0 10px;
`;

const AvatarWrap = styled(View)`
    width: 70px;
`;

const AvatarUsername = styled(Text)`
    fontSize: 18;
    color: #000;
    fontWeight: 500
`;
const ChatMenuBody = styled(View)`
  backgroundColor: #eee;
  display: flex;
  flexDirection: column;
  borderColor: rgba(0,0,0,0.05);
  height: 100%;
`;

const ChatMenuItem = styled(TouchableOpacity)`
  backgroundColor: #fff;
  display: flex;
  justifyContent: center;
  paddingLeft: 20px;
  flexDirection: column;
  borderColor: rgba(0,0,0,0.05);
  height: 100px;
  borderBottomWidth: 3;
`;

const ChatMenuTitle = styled(Text)`
    fontSize: 24px;
`;

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
    mapStateToProps,
    null
)(ChatMenu);
