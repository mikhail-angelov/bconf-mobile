import React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import Input from "../CommonUIElements/Input";
import { Avatar } from "../Avatar";
import {
  SOFT_BLUE_COLOR,
  BLACK_COLOR,
  WHITE_COLOR
} from "../../helpers/styleConstants";

const { height } = Dimensions.get("window"); // it's for IphoneX

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
  whatSearch: string;
  rightIconName: string | null;
  rightIconFunction: () => void | null;
  inputHandler: (inputValue) => void | null;
  leftIconFunction: () => void;
  headerTitleFunction: () => void;
  isAvatarVisible: boolean;
  isSearchResultEmpty: boolean;
}
class Header extends React.Component<IProps, IState> {
  private timer = Date.now();
  constructor(props) {
    super(props);
    this.state = {
      isSearchBarActive: false,
      inputValue: ""
    };
    this.inputValueChange = this.inputValueChange.bind(this);
  }

  public inputValueChange = inputValue => {
    this.setState({ inputValue });
    if (inputValue && Date.now() - this.timer > 300) {
      this.props.inputHandler(inputValue);
      this.timer = Date.now();
    }
  };

  public render() {
    const {
      title,
      width,
      chatColor,
      leftIconName,
      rightIconFunction,
      leftIconFunction,
      subTitle,
      rightIconName,
      chatImage,
      chat,
      whatSearch,
      isAvatarVisible,
      headerTitleFunction,
      isSearchBarActive,
      isSearchResultEmpty
    } = this.props;
    const { inputValue } = this.state;
    return (
      <HeaderWrapper style={{ width }}>
        <Overlay />
        <Head>
          <LeftSide>
            <Icon.Button
              size={16}
              onPress={() => leftIconFunction()}
              name={leftIconName}
              backgroundColor={WHITE_COLOR}
              color={SOFT_BLUE_COLOR}
            />
          </LeftSide>
          {isSearchBarActive ? (
            <Input
              placeholder={whatSearch}
              onChangeText={value => this.inputValueChange(value)}
              value={inputValue}
              type={whatSearch}
              textContentType={whatSearch}
              autoCapitalize="none"
            />
          ) : (
              <TitleWrap onPress={headerTitleFunction}>
                {isAvatarVisible &&
                  <AvatarWrap>
                    <Avatar
                      srcImg={chatImage}
                      name={title}
                      size="small"
                      avatarColor={chatColor}
                    />
                  </AvatarWrap>}
                <Title>
                  <TitleText>{title}</TitleText>
                  {subTitle && (
                    <SubtitleText>
                      {subTitle}
                    </SubtitleText>
                  )}
                </Title>
              </TitleWrap>
            )}
          <RightSide>
            <IconWrap onPress={rightIconFunction}>
              <Icon.Button
                name={rightIconName}
                backgroundColor='transparent'
                color={SOFT_BLUE_COLOR}
                style={{ marginRight: 0 }}
                size={20}
                onPress={() => {
                  this.setState({ inputValue: "" });
                  rightIconFunction()
                }}
              />
            </IconWrap>
          </RightSide>
        </Head>
        {isSearchBarActive && !!inputValue.length && isSearchResultEmpty && (
          <Text style={{ position: "absolute", top: 30, left: "25%" }}>
            {whatSearch} {inputValue} not found
          </Text>
        )}
      </HeaderWrapper>
    );
  }
}

const TitleText = styled(Text)`
      font-size: 22;
      font-weight: 500;
    `

const SubtitleText = styled(Text)`
    font-size: 12;
    font-weight: 700;
    color: #aab6b7;
    margin-top: 3

`
const IconWrap = styled(TouchableOpacity)`
      display: flex;
      width: 35px;
      height: 35px;
      align-items: flex-end;
    `;

const AvatarWrap = styled(View)`
      width: 35px;
      height: 35px;
      margin-right: 10px;
      shadow-radius: 5;
      shadow-opacity: 0.2;
    shadow-offset: {width: 1, height: 1 };
    shadow-color: ${BLACK_COLOR}
        `;

const HeaderWrapper = styled(View)`
          align-items: center;
          display: flex;
          justify-content: center;
          flex-direction: column;
          border-bottom-width: 3;
          border-color: rgba(0, 0, 0, 0.05);
  height: ${height > 800 ? "100px" : "75px"};
  background-color: ${WHITE_COLOR};
      `;

const Overlay = styled(View)`
  height: ${height > 800 ? "35px" : "20px"};
        width: 100%;
      `;

const TitleWrap = styled(TouchableOpacity)`
        display: flex;
        text-align: center;
        align-items: center;
        flex-direction: row;
      `;

const LeftSide = styled(TouchableOpacity)`
        padding-left: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      `;

const RightSide = styled(View)`
        display: flex;
        flex-direction: row;
      `;

const Head = styled(View)`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
      `;

const Title = styled(View)`
  color: ${BLACK_COLOR};
        display: flex;
        flex-direction: column;
        align-items: center;
      `;

const mapStateToProps = ({ auth, chat, messages }) => ({ auth, chat, messages });

export default connect(mapStateToProps)(Header);
