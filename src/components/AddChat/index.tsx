import React from "react";
import { connect } from "react-redux";
import { View, Dimensions, Text, TouchableOpacity, ScrollView } from "react-native";
import _ from 'lodash'
import styled from "styled-components";
import { findUsers } from "../../actions/auth";
import { Avatar } from "../Avatar";
import Header from "../Header";
import { BLACK_COLOR } from "../../helpers/styleConstants"
import { Navigation } from "react-native-navigation";
import { goToAuth } from "../../navigation/navigation";

const { width } = Dimensions.get('window')

interface IProps {
    findUsers: (username) => void;
    auth: object;
}

class AddChat extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }

    public componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.authenticated) {
            goToAuth();
        }
    }

    public render() {
        const { auth } = this.props
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
                        {_.map(auth.users, item => (<UserItem>
                            <AvatarSide>
                                <Avatar name={item.name} srcImg={item.srcAvatar} avatarColor={item.userColor} />
                            </AvatarSide>
                            <UserName>{item.name}</UserName>
                        </UserItem>))}
                    </UserList>
                </AddChatView>
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
        `;

const UserList = styled(ScrollView)``;

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

const UserItem = styled(View)`
        width: ${width}
        height: 70px;
        flexDirection: row;
        display: flex;
        alignItems: center;
        justifyContent: flex-start;
      `;

const mapDispatchToProps = {
    findUsers
};

const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddChat);
