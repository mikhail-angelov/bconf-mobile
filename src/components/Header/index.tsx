import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";

import { Avatar } from "../Avatar";
import { GRAY_COLOR } from "../../helpers/styleConstants";
import { SOFT_BLUE_COLOR } from "../../helpers/styleConstants";

interface IProps {
    title: string;
    width: string;
    chatColor: string;
    backButton: () => void
    toggleMenu: () => void
}
export default class Header extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }
    public render() {
        const { title, width, backButton, chatColor, toggleMenu } = this.props
        return (
            <HeaderWrapper style={{ width }}>
                <Overlay />
                <Head>
                    <TouchableOpacity style={{ width: '15%' }}>
                        <Icon.Button
                            onPress={title === 'Chats' ? toggleMenu : backButton}
                            name={title === 'Chats' ? "align-left" : "arrow-left"}
                            backgroundColor="#fff"
                            color={SOFT_BLUE_COLOR} />
                    </TouchableOpacity>
                    <Title>
                        <Text style={{ fontSize: 22, fontWeight: "500", }}>{title}</Text>
                        {title !== 'Chats' ? <Text style={{ fontSize: 12, fontWeight: "300", }}>Last seen recently</Text> : null}
                    </Title>
                    <TouchableOpacity style={{ width: "15%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {title === 'Chats' ? <Icon.Button name="user" backgroundColor="transparent" color={SOFT_BLUE_COLOR} style={{ marginRight: 0 }} /> :
                            <Avatar name={title} size="small" chatColor={chatColor}/>}
                    </TouchableOpacity>
                </Head>
            </HeaderWrapper>
        );
    };
}

const HeaderWrapper = styled(View)`
  display: flex;
  justifyContent: center;
  flexDirection: column;
  borderBottomWidth: 3;
  borderColor: rgba(0,0,0,0.05);
  height: 90px;
  backgroundColor: #fff;
`;

const Overlay = styled(View)`
  height: 20px;
  width: 100%;
`;

const Head = styled(View)`
  width: 100%;
  display: flex;
  flexDirection: row;
  textAlign: center;
  alignItems: center;
  justifyContent: space-between;
`;

const Title = styled(View)`
  color: #000;
  width: 70%;
  display: flex;
  flexDirection: column;
  alignItems: center;
`;
