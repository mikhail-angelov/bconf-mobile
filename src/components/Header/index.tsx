import React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";
import Input from "../CommonUIElements/Input"
import { Avatar } from "../Avatar";
import { SOFT_BLUE_COLOR, BLACK_COLOR, WHITE_COLOR } from "../../helpers/styleConstants";

const { height } = Dimensions.get('window') // it's for IphoneX

interface IState {
    isSearchBarActive: boolean;
    inputValue: string;
}
interface IProps {
    chat: object;
    title: string;
    subTitle: string | null;
    width: string;
    chatColor: string;
    chatImage: string;
    leftIconName: string;
    rightIconName: string | null;
    isAvatarVisible: boolean | null;
    rightIconFunction: () => void | null;
    inputHandler: (inputValue) => void | null;
    leftIconFunction: () => void;
}
class Header extends React.Component<IProps, IState> {
    private timer = Date.now()
    constructor(props) {
        super(props);
        this.state = {
            isSearchBarActive: false,
            inputValue: '',
        }
        this.inputValueChange = this.inputValueChange.bind(this)
        this.openSearchBar = this.openSearchBar.bind(this)
        this.closeSearchBarAndCleanInput = this.closeSearchBarAndCleanInput.bind(this)
    }

    public inputValueChange = (inputValue) => {
        this.setState({ inputValue })
        if (inputValue && Date.now() - this.timer > 300) {
            this.props.inputHandler(inputValue)
            this.timer = Date.now()
        }
    }

    public closeSearchBarAndCleanInput() {
        this.setState({ isSearchBarActive: false, inputValue: '' })
    }

    public openSearchBar() {
        this.setState({ isSearchBarActive: true })
    }

    public render() {
        const { title, width, chatColor, leftIconName,
            rightIconFunction, leftIconFunction, subTitle,
            rightIconName, isAvatarVisible, chatImage, chat } = this.props
        const { inputValue, isSearchBarActive } = this.state
        return (
            <HeaderWrapper style={{ width }}>
                <Overlay />
                <Head>
                    <LeftSide style={{ width: '15%', paddingLeft: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Icon.Button
                            size={16}
                            onPress={() => leftIconFunction()}
                            name={leftIconName}
                            backgroundColor={WHITE_COLOR}
                            color={SOFT_BLUE_COLOR} />
                    </LeftSide>
                    {isSearchBarActive ?
                        <Input
                            placeholder="User name"
                            onChangeText={(value) => this.inputValueChange(value)}
                            value={inputValue}
                            type="username"
                            textContentType="username"
                        /> : <Title>
                            <Text style={{ fontSize: 22, fontWeight: "500", }}>{title}</Text>
                            {subTitle && <Text style={{ fontSize: 12, fontWeight: "700", color: "#aab6b7", marginTop: 3 }}>{subTitle}</Text>}
                        </Title>}
                    <TouchableOpacity
                        onPress={isAvatarVisible ? rightIconFunction : null}
                        style={isAvatarVisible ? {
                            width: "15%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowRadius: 5,
                            shadowOpacity: 0.2,
                            shadowOffset: { width: 1, height: 1 },
                            shadowColor: { BLACK_COLOR }
                        } : {
                                width: "15%",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }
                        }>
                        {isAvatarVisible ? <Avatar srcImg={chatImage} name={title} size="small" avatarColor={chatColor} /> :
                            <Icon.Button name={isSearchBarActive ? 'times' : rightIconName} backgroundColor="transparent"
                                color={SOFT_BLUE_COLOR} style={{ marginRight: 0 }} size={20}
                                onPress={isSearchBarActive ? this.closeSearchBarAndCleanInput : rightIconFunction ? rightIconFunction : this.openSearchBar} />}
                    </TouchableOpacity>
                </Head>
                {isSearchBarActive && !!inputValue.length && chat.users.length < 1 &&
                    <Text style={{ position: "absolute", top: 20, left: '25%' }}>User {inputValue} not found</Text>}
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
  height: ${height > 800 ? "100px" : "90px"};
  backgroundColor: ${WHITE_COLOR};
`;

const Overlay = styled(View)`
  height: ${height > 800 ? "35px" : "20px"};
  width: 100%;
`;

const LeftSide = styled(TouchableOpacity)`
    width: 15%;
    paddingLeft: 5;
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
  color: ${BLACK_COLOR};
  width: 70%;
  display: flex;
  flexDirection: column;
  alignItems: center;
`;

const mapStateToProps = ({ auth, chat }) => ({ auth, chat });

export default connect(
    mapStateToProps
)(Header);