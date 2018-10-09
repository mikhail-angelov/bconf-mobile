import React from "react";
import styled from "styled-components";
import { View, Text, Image } from "react-native";

export const Avatar = ({ size, srcImg, name, }) => {

  return (
    <AvatarWrapper>
      {srcImg ? <AvaImg source={{ uri: srcImg }} /> :
        <AvaText>{name[0].toUpperCase()}</AvaText>}
    </AvatarWrapper>
  );
};

interface IAvatarProps {
  size: string;
  source: () => void;
  name: string;
}

const AvatarWrapper = styled(View)`
      height:75%;
      width: 75%;
      backgroundColor: #fff;
      borderRadius: 50;
      borderWidth: 2;
      borderColor: #fff;
      display: flex;
      alignItems: center;
      shadowColor: #000;
      justifyContent: center;
      shadowOpacity: 0.2;
      shadowRadius: 5;
    `;

const AvaImg = styled(Image)`
  width: 100%;
  height: 100%;
`;

const AvaText = styled(Text)`
    fontSize: 12px;
  `;
