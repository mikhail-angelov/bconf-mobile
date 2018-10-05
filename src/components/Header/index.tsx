import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import styled from "styled-components";
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
                <Overlay/>
                <Head>
                    <Text></Text>
                    <Title>{title}</Title>
                    <View></View>
                </Head>
            </HeaderWrapper>
        );
    };
}

const HeaderWrapper = styled(View)`
  width: 100%;
  display: flex;
  flexDirection: column;
  shadowColor: #000;
  shadowOpacity: 0.6;
  borderBottomWidth: 0.8;
  borderColor: #eed;
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
`;

const Title = styled(Text)`
  fontWeight: 700;
  color: #000;
  fontSize: 36px;
  textAlign: center;
  shadowColor: null;
  shadowOpacity: 0;
  borderBottomWidth: 0;
  borderColor: null;
`;

const Icon = styled(TouchableOpacity)`
  width: 15%;
`;

