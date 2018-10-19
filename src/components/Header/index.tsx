import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";
import { Avatar } from "../Avatar";
import { SOFT_BLUE_COLOR, BLACK_COLOR, WHITE_COLOR } from "../../helpers/styleConstants";

interface IProps {
    title: string;
    subTitle: string | null;
    width: string;
    chatColor: string;
    chatImage: string;
    leftIconName: string;
    rightIconName: string | null;
    isAvatarVisible: boolean | null;
    rightIconFunction: () => void | null;
    leftIconFunction: () => void;
}
export default class Header extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }
    public render() {
        const { title, width, chatColor, leftIconName,
            rightIconFunction, leftIconFunction, subTitle,
            rightIconName, isAvatarVisible, chatImage } = this.props
        return (
            <HeaderWrapper style={{ width }}>
                <Overlay />
                <Head>
                    <TouchableOpacity style={{ width: '15%', paddingLeft: 5 }}>
                        <Icon.Button
                            size={16}
                            onPress={() => leftIconFunction()}
                            name={leftIconName}
                            backgroundColor={WHITE_COLOR}
                            color={SOFT_BLUE_COLOR} />
                    </TouchableOpacity>
                    <Title>
                        <Text style={{ fontSize: 22, fontWeight: "500", }}>{title}</Text>
                        {subTitle && <Text style={{ fontSize: 12, fontWeight: "700", color: "#aab6b7", marginTop: 3 }}>{subTitle}</Text>}
                    </Title>
                    <TouchableOpacity style={isAvatarVisible ? {
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
                        {isAvatarVisible ? <Avatar srcImg={chatImage} name={title} size="small" chatColor={chatColor} /> :
                            <Icon.Button name={rightIconName} backgroundColor="transparent" color={SOFT_BLUE_COLOR} style={{ marginRight: 0 }}
                                size={20} onPress={rightIconFunction} />}
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
  backgroundColor: ${WHITE_COLOR};
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
  color: ${BLACK_COLOR};
  width: 70%;
  display: flex;
  flexDirection: column;
  alignItems: center;
`;
