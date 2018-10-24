import React from "react";
import { connect } from "react-redux";
import { View, Dimensions, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from "styled-components";
import { WHITE_COLOR, SOFT_BLUE_COLOR, BLACK_COLOR, GRAY_COLOR } from "../../helpers/styleConstants";
import { addUserToChatLocaly, deleteUserToChatLocaly, findUsers } from "../../actions/chat";
import { Avatar } from "../Avatar";
import Header from "../Header";
import { Navigation } from "react-native-navigation";
import { goToAuth } from "../../navigation/navigation";

const { width } = Dimensions.get('window')

interface IProps {
    findUsers: (username) => void;
    addUserToChatLocaly: (user) => void;
    deleteUserToChatLocaly: (user) => void;
    auth: any;
    chat: any;
    users: object;
}

interface IState {
    isCreateChatButtonVisible: boolean;
    createChatButtonAnimate: any;
}

class AddChat extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            isCreateChatButtonVisible: true,
            createChatButtonAnimate: new Animated.Value(0),
        }
    }

    public showAddChatButton = () => {
        this.setState({ isCreateChatButtonVisible: true })
        Animated.timing(this.state.createChatButtonAnimate, {
            toValue: 0,
            duration: 500,
        }).start();
    };

    public closeAddChatButton = () => {
        Animated.timing(this.state.createChatButtonAnimate, {
            toValue: 1,
            duration: 500,
        }).start(() => this.setState({ isCreateChatButtonVisible: false }));
    };

    public componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.authenticated) {
            goToAuth();
        }
    }

    public render() {
        const { chat } = this.props
        return (
            <AddChatWrap>
                <Header
                    rightIconName="search"
                    inputHandler={this.props.findUsers}
                    title="Add Chat"
                    width={width}
                    leftIconName="arrow-left"
                    leftIconFunction={() => Navigation.popToRoot("ChatList")} />
                <AddChatView>
                    <UserList>
                        {chat.usersInNewChat.length > 0 && <Text style={{ width: '100%', backgroundColor: SOFT_BLUE_COLOR, color: WHITE_COLOR, textAlign: 'center' }}>
                            Users in new conversation
                        </Text>}
                        {_.map(chat.usersInNewChat, item => (<UserItem onPress={() => this.props.deleteUserToChatLocaly(item)}>
                            <AvatarSide>
                                <Avatar name={item.name} srcImg={item.srcAvatar} avatarColor={item.userColor} />
                            </AvatarSide>
                            <UserName>{item.name}</UserName>
                            <Icon
                                size={18}
                                name="check-circle"
                                backgroundColor={WHITE_COLOR}
                                color={SOFT_BLUE_COLOR} />
                        </UserItem>))}
                        {chat.users.length > 0 && <Text style={{ width: '100%', backgroundColor: SOFT_BLUE_COLOR, color: WHITE_COLOR, textAlign: 'center' }}>
                            Search
                        </Text>}
                        {_.map(chat.users, item => (<UserItem onPress={() => this.props.addUserToChatLocaly(item)}>
                            <AvatarSide>
                                <Avatar name={item.name} srcImg={item.srcAvatar} avatarColor={item.userColor} />
                            </AvatarSide>
                            <UserName>{item.name}</UserName>
                        </UserItem>))}
                    </UserList>
                </AddChatView>
                <CreateChatButtonWrap
                    onPress={() =>
                        Navigation.push("AddChat", {
                            component: {
                                name: 'Chat',
                                options: {
                                    topBar: {
                                        visible: false
                                    },
                                }
                            }
                        })}>
                    <CreateChatButton
                        style={{
                            display: this.state.isCreateChatButtonVisible ? "flex" : 'none',
                            transform: [{
                                translateY: this.state.createChatButtonAnimate.interpolate(
                                    {
                                        inputRange: [0, 1],
                                        outputRange: [0, 100],
                                    }
                                )
                            }]
                        }}>
                        <Icon
                            size={22}
                            name="pen"
                            backgroundColor={WHITE_COLOR}
                            color={WHITE_COLOR} />
                    </CreateChatButton>
                </CreateChatButtonWrap>
            </AddChatWrap >
        );
    }
}

const AddChatWrap = styled(View)`
        display: flex;
        flexDirection: column;
        height: 100%;
        `;

const AddChatView = styled(View)`
        display: flex;
        flexDirection: column;
        height: 100%;
        alignItems: center;
        width: ${width}
        `;

const UserName = styled(Text)`
        fontSize: 18px;
        color: ${BLACK_COLOR};
        marginLeft: 10px;
        width: 65%
    `;

const UserList = styled(ScrollView)`
    width: 100%
    `;

const CreateChatButtonWrap = styled(TouchableOpacity)``;

const CreateChatButton = styled(Animated.View)`
    padding: 20px;
    position: absolute;
    right: 20;
    bottom: 20;
    backgroundColor: ${SOFT_BLUE_COLOR};
    border-radius: 50;
    shadowRadius: 3; 
    shadowOpacity: 0.2; 
    shadowOffset: {width: 1, height: 1}; 
    shadowColor: ${BLACK_COLOR};
      `;

const AvatarSide = styled(View)`
    width: 20%;
    height: 100%;
    display: flex;
    alignItems: center;
    justifyContent: center;
    shadowRadius: 5;
    shadowOpacity: 0.3;
    shadowOffset: {width: 2, height: 2};
    shadowColor: ${BLACK_COLOR};
`;

const UserItem = styled(TouchableOpacity)`
        width: ${width}
        height: 70px;
        flexDirection: row;
        display: flex;
        alignItems: center;
        justifyContent: flex-start;
              `;

const mapDispatchToProps = {
    findUsers,
    addUserToChatLocaly,
    deleteUserToChatLocaly
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddChat);
