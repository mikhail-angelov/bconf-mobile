import React from "react";
import styled from "styled-components";
import { WHITE_COLOR } from "../../helpers/styleConstants";
import { View, Text, Image } from "react-native";

export const Avatar = ({ style, size, srcImg, name, avatarColor }: IAvatarProps) => {
  return (
    <AvatarWrapper style={style} avatarColor={avatarColor}>
      {srcImg ? <AvaImg source={{ uri: srcImg }} /> :
        <AvaText size={size} >{name ? name[0].toUpperCase() : ""}</AvaText>}
    </AvatarWrapper>
  );
};

interface IAvatarProps {
  size: string | undefined;
  name: string;
  srcImg: string | undefined;
  avatarColor: string;
  style: object | undefined;
}

const AvatarWrapper = styled(View).attrs({})`
      overflow:hidden;
      height: 68%;
      width: 70%;
      borderRadius: 45;
      borderWidth: 3;
      borderColor: ${WHITE_COLOR};
      display: flex;
      alignItems: center;
      justifyContent: center;
      backgroundColor: ${(props: IAvatarProps) =>
    props.avatarColor || '#eee'};
    `;

const AvaImg = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AvaText = styled(Text)`
    fontSize: ${(props: IAvatarProps) =>
    props.size === "small" ? "12px" : "24px"
  }};
    color: ${WHITE_COLOR};
  `;
