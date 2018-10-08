import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";

import { SOFT_BLUE_COLOR } from "../../helpers/styleConstants";

interface IProps {
    title: string;
}
export default class Header extends React.Component<IProps> {
    constructor(props) {
        super(props);
    }
    public render() {
        const { title } = this.props
        return (
            <HeaderWrapper>
                <Overlay />
                <Head>
                    <TouchableOpacity>
                        <Icon.Button name="align-left" backgroundColor="transparent" color={SOFT_BLUE_COLOR} />
                    </TouchableOpacity>
                    <Title>{title}</Title>
                    <TouchableOpacity>
                        <Icon.Button name="user" backgroundColor="transparent" color={SOFT_BLUE_COLOR} style={{}} />
                    </TouchableOpacity>
                </Head>
            </HeaderWrapper>
        );
    };
}

const HeaderWrapper = styled(View)`
  width: 100%;
  display: flex;
  flexDirection: column;
  borderBottomWidth: 0.8;
`;

const Overlay = styled(View)`
  height: 20px;
  width: 100%;
`;

const Head = styled(View)`
  height: 60px;
  width: 100%;
  display: flex;
  flexDirection: row;
  textAlign: center;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  color: #000;
  fontSize: 22px;
  font-weight: 500;
  textAlign: center;
  width: 75%;
`;
