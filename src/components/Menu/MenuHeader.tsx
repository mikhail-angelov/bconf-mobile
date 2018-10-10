import React from "react";
import { connect } from "react-redux";
import { ScrollView, View, Text } from "react-native";
import { logout } from "../../actions/auth";
import Button from "../CommonUIElements/Button";
import { Avatar } from "../Avatar";
import styled from "styled-components";

interface IProps {
    size: string;
    chatColor: string;
    name: string;
}

export default class MenuHeader extends React.PureComponent<IProps> {

    public render() {
        return (
            <MenuHeaderWrapper>
                <AvatarWrap>
                    <Avatar size="middle" chatColor="#996699" name='Anton' />
                </AvatarWrap>
                <AvatarUsername>Anton</AvatarUsername>
            </MenuHeaderWrapper>
        );
    }
}

const MenuHeaderWrapper = styled(View)`
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