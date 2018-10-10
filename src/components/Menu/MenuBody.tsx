import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { goHome } from "../../navigation/navigation";
import Button from "../CommonUIElements/Button";
import styled from "styled-components";

interface IProps {
}


class Menu extends React.PureComponent<IProps> {

    public goToChat() {
        goHome()
    }

    public render() {
        return (
            <MenuBody>
                <MenuItem>
                    <MenuTitle onPress={() => this.goToChat()}>Chats</MenuTitle>
                </MenuItem>
                <MenuItem>
                    <MenuTitle>Item 2</MenuTitle>
                </MenuItem>
                <MenuItem>
                    <MenuTitle>Item 3</MenuTitle>
                </MenuItem>
                <MenuItem onPress={() => this.props.logout()}>
                    <MenuTitle>Logout</MenuTitle>
                </MenuItem>
            </MenuBody >
        );
    }
}

const MenuBody = styled(View)`
  backgroundColor: #eee;
  display: flex;
  flexDirection: column;
  borderColor: rgba(0,0,0,0.05);
  height: 100%;
`;

const MenuItem = styled(TouchableOpacity)`
  backgroundColor: #fff;
  display: flex;
  justifyContent: center;
  paddingLeft: 20px;
  flexDirection: column;
  borderColor: rgba(0,0,0,0.05);
  height: 100px;
  borderBottomWidth: 3;
`;

const MenuTitle = styled(Text)`
    fontSize: 24px;
`;

const mapDispatchToProps = {
    logout
};

export default connect(
    null,
    mapDispatchToProps
)(Menu);
