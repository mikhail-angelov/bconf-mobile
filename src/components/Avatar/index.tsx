import React from 'react'
import styled from 'styled-components'
import { WHITE_COLOR } from '../../helpers/styleConstants'
import { View, Text, Image } from 'react-native'

export const Avatar = ({ style, size, srcImg, name, avatarColor }: IAvatarProps) => {
    return (
        <AvatarWrapper
            style={{ ...style, aspectRatio: 1, elevation: 3, shadowRadius: '5', shadowOpacity: '0.3', shadowOffset: { width: 2, height: 2 }, shadowColor: 'black' }}
            avatarColor={avatarColor}
        >
            {srcImg ? <AvaImg source={{ uri: srcImg }} /> : <AvaText size={size}>{name ? name[0].toUpperCase() : ''}</AvaText>}
        </AvatarWrapper>
    )
}

interface IAvatarProps {
    size?: string | undefined
    name: string
    srcImg: string | undefined
    avatarColor: string
    style?: object | undefined
}

interface IAvaTextProps {
    size?: string
}

const AvatarWrapper = styled(View).attrs({})`
    overflow: hidden;
    height: 100%;
    border-radius: 45;
    border-color: ${WHITE_COLOR};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props: IAvatarProps) => props.avatarColor || '#eee'};
`

const AvaImg = styled(Image)`
    width: 100%;
    height: 100%;
`

const AvaText = styled(Text)`
    font-size: ${(props: IAvaTextProps) => (props.size === 'small' ? '12px' : '24px')};
    color: ${WHITE_COLOR};
`
