import React from 'react'
import { BLACK_COLOR } from '../../helpers/styleConstants'
import styled from 'styled-components'
import { View, Text, Platform } from 'react-native'

export const Title = styled(Text)`
    font-size: 36px;
    text-align: center;
    color: ${BLACK_COLOR};
    font-weight: 700;
`
export const Annotation = styled(Text)`
    font-size: 12px;
    text-align: center;
    color: ${BLACK_COLOR};
`
const headerMargin = Platform.OS === 'ios' ? 50 : 0

export const Header = styled(View)`
    justify-content: center;
    align-items: center;
    margin-top: ${headerMargin};
    height: 100;
`
export const Body = styled(View)`
    padding-top: 30;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const LoginErrorNotification = styled(Text)`
    font-size: 12px;
    color: red;
    text-align: left;
`

export const ErrorText = styled(Text)`
    color: red;
    font-size: 12px;
`
