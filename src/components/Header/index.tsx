import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";

import { GRAY_COLOR } from "../../helpers/styleConstants";
import { SOFT_BLUE_COLOR } from "../../helpers/styleConstants";

interface IProps {
    title: string;
    width: string;
    backButton: () => void
}
export default class Header extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }
    public render() {
        const { title, width, backButton } = this.props
        return (
            <HeaderWrapper style={{ width }}>
                <Overlay />
                <Head>
                    <TouchableOpacity>
                        <Icon.Button
                            onPress={backButton}
                            name={title === 'Chats' ? "align-left" : "arrow-left"}
                            backgroundColor="#fff"
                            color={SOFT_BLUE_COLOR} />
                    </TouchableOpacity>
                    <Title>
                        <Text style={{ fontSize: 22, fontWeight: "500", }}>{title}</Text>
                        {title !== 'Chats' ? <Text style={{ fontSize: 12, fontWeight: "300", }}>Last seen recently</Text> : null}
                    </Title>
                    <TouchableOpacity>
                        <Icon.Button name="user" backgroundColor="transparent" color={SOFT_BLUE_COLOR} style={{}} />
                    </TouchableOpacity>
                </Head>
            </HeaderWrapper>
        );
    };
}
//  should add   
//   borderColor: #fff;
//   shadowColor: #000;
//   shadowOpacity: 0.2;
//   shadowRadius: 5;
const HeaderWrapper = styled(View)`
  display: flex;
  flexDirection: column;
  borderBottomWidth: 0.3;
  borderColor: ${GRAY_COLOR};
  height: 90px;
  justifyContent: center;
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
  justifyContent: center;
`;

const Title = styled(View)`
  color: #000;
  width: 75%;
  display: flex;
  flexDirection: column;
  alignItems: center;
`;
