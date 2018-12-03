import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, Text, Animated, Modal } from "react-native";
import { Navigation } from "react-native-navigation";
import { BLACK_COLOR, WHITE_COLOR } from "../../helpers/styleConstants";
import styled from "styled-components";
import _ from "lodash";
import { Avatar } from "../Avatar";

interface IProps {
    chat: any;
    size: string;
    chatColor: string;
    name: string;
    width: string;
    isMenuOpen: boolean;
    chatMenuItems: object
    animated: object
    auth: object
    closeMenu: () => void
}

class ChatMenu extends React.Component<IProps> {

    public render() {
        const { auth, chatMenuItems, width, closeMenu, isMenuOpen, animated } = this.props
        return (
            <Modal visible={isMenuOpen ? true : false}>
                <Animated.View
                    style={{
                        width,
                        height: '100%',
                        position: 'absolute',
                        zIndex: 20,
                        bottom: 0,
                        display: isMenuOpen ? 'flex' : 'none',
                    }}
                    elevation={isMenuOpen ? 20 : 0}
                    zIndex={20}>
                    <Overlay
                        onPress={closeMenu} />
                    <ChatMenuView style={{
                        transform: [{
                            translateX: animated.interpolate(
                                {
                                    inputRange: [0, 1],
                                    outputRange: [-width * 0.8, 0],
                                }
                            )
                        }]
                    }}>
                        <ChatMenuHeader
                            onPress={() => {
                                Navigation.push("ChatList", {
                                    component: {
                                        name: 'ProfileSettings',
                                        options: {
                                            topBar: {
                                                visible: false,
                                                drawBehind: true,
                                                animate: false,
                                            },
                                        }
                                    }
                                })
                                closeMenu()
                            }}>
                            <AvatarWrap>
                                <Avatar
                                    srcImg={auth.srcAvatar}
                                    size="middle"
                                    avatarColor="#996699"
                                    name={auth.name} />
                            </AvatarWrap>
                            <AvatarUsername>{auth.name}</AvatarUsername>
                        </ChatMenuHeader>
                        <ChatMenuBody>
                            {_.map(chatMenuItems, item => (
                                <ChatMenuItem onPress={() => item.handler()} key={item.key}>
                                    <ChatMenuTitle>{item.title}</ChatMenuTitle>
                                </ChatMenuItem>
                            ))}
                        </ChatMenuBody>
                    </ChatMenuView >
                </Animated.View>
            </Modal>
        );
    }
}

const Overlay = styled(TouchableOpacity)`
    top: 0;
    right: 0;
    background-color: rgba(0,0,0,0.8);
    width: 100%;
    height: 100%;
    display: flex;
  `;

const ChatMenuView = styled(Animated.View)`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    padding-top: 40px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${WHITE_COLOR};
`;

const ChatMenuHeader = styled(TouchableOpacity)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    border-bottom-width: 3;
    border-color: rgba(0,0,0,0.05);
    height: 70px;
    padding: 0 10px;
    width: 100%;
`;

const AvatarWrap = styled(View)`
    width: 70px;
    padding: 5px;
`;

const AvatarUsername = styled(Text)`
    font-size: 18;
    color: ${BLACK_COLOR};
    font-weight: 500;
`;
const ChatMenuBody = styled(View)`
    background-color: #eee;
    display: flex;
    flex-direction: column;
    border-color: rgba(0,0,0,0.05);
    height: 100%;
`;

const ChatMenuItem = styled(TouchableOpacity)`
    background-color: ${WHITE_COLOR};
    display: flex;
    justify-content: center;
    padding-left: 20px;
    flex-direction: column;
    border-color: rgba(0,0,0,0.05);
    height: 100px;
    border-bottom-width: 3;
`;

const ChatMenuTitle = styled(Text)`
    font-size: 24px;
`;

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
    mapStateToProps,
    null
)(ChatMenu);
