import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Link = styled(TouchableOpacity)`
    align-items: center;
    padding-top: 10;
    padding-bottom: 10;
`;

const LinkText = styled(Text)`
  color: black;
`

const UILink = (otherProps) => (<Link {...otherProps}>
  <LinkText>{otherProps.title}</LinkText>
</Link>);

export default UILink;