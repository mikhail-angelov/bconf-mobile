import React from "react";
import styled from "styled-components";
import { View, Text, Image } from "react-native";

export const Avatar = ({ style, size, srcImg, name, chatColor }: IAvatarProps) => {
  return (
    <AvatarWrapper style={style} chatColor={chatColor}>
      {srcImg ? <AvaImg source={{ uri: srcImg }} /> :
        <AvaText size={size} >{name[0].toUpperCase()}</AvaText>}
    </AvatarWrapper>
  );
};

interface IAvatarProps {
  size: string | undefined;
  source: () => void;
  name: string;
  srcImg: string | undefined;
  chatColor: string;
  style: object | undefined;
}

const AvatarWrapper = styled(View).attrs({})`
      overflow:hidden;
      height: 65%;
      width: 65%;
      borderRadius: 45;
      borderWidth: 3;
      borderColor: #ddd;
      display: flex;
      alignItems: center;
      justifyContent: center;
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
