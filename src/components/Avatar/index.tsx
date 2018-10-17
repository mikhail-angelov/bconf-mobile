import React from "react";
import styled from "styled-components";
import { View, Text, Image } from "react-native";

export const Avatar = ({ size, srcImg, name, chatColor }: IAvatarProps) => {
  return (
    <AvatarWrapper chatColor={chatColor}>
      {srcImg ? <AvaImg source={{ uri: srcImg }} /> :
        <AvaText size={size} >{name[0].toUpperCase()}</AvaText>}
    </AvatarWrapper>
  );
};

interface IAvatarProps {
  size: string;
  source: () => void;
  name: string;
  srcImg: string;
  chatColor: string;
}

const AvatarWrapper = styled(View).attrs({})`
      height: 65%;
      width: 65%;
      borderRadius: 50;
      borderWidth: 3;
      borderColor: #fff;
      display: flex;
      alignItems: center;
      shadowColor: #000;
      justifyContent: center;
      shadowOpacity: 0.2;
      shadowRadius: 5;
      backgroundColor: ${(props: IAvatarProps) =>
    props.chatColor || '#eee'};
    `;

const AvaImg = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AvaText = styled(Text)`
    fontSize: ${(props: IAvatarProps) =>
    props.size === "small" ? "12px" : "24px"
  }};
    color: #fff;
  `;
