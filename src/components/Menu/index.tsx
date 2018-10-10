import React from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, View, Text } from "react-native";
import { logout } from "../../actions/auth";
import Button from "../CommonUIElements/Button";
import styled from "styled-components";
import { goToAuth, goHome } from "../../navigation/navigation";
import { sendMessage } from "../../actions/chat";
import MenuHeader from "./MenuHeader";
import MenuBody from "./MenuBody";

interface IProps {
    chat: any;
    activeChatColor: string;
}
class Menu extends React.Component<IProps> {

    public render() {
        return (
            <MenuView>
                <MenuHeader />
                <MenuBody />
            </MenuView>
        );
    }
}

const MenuView = styled(View)`
  display: flex;
  flexDirection: column;
  height: 100%;
  paddingTop: 20px;
`;


const mapStateToProps = state => ({ auth: state.auth, chat: state.chat });

export default connect(
    mapStateToProps,
    null
)(Menu);
