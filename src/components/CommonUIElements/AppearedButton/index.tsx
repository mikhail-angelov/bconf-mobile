import React from 'react'
import { Animated, Text, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BLACK_COLOR, SOFT_BLUE_COLOR, WHITE_COLOR } from '../../../helpers/styleConstants'

import styled from 'styled-components'

import { Platform } from 'react-native'

interface IProps {
    isButtonVisible: boolean
    buttonAnimate: any
    buttonHandler: () => void
    iconName: string
    iconSize: number
    buttonText: string
    reverseAppear: boolean
}

class UIAppearedButton extends React.Component<IProps> {
    constructor(props) {
        super(props)
        this.state = {
            buttonAnimate: new Animated.Value(0),
        }
    }

    public componentDidUpdate(prevProps) {
        if (prevProps.isButtonVisible !== this.props.isButtonVisible && this.props.isButtonVisible) {
            Animated.timing(this.state.buttonAnimate, {
                toValue: 1,
                duration: 500,
            }).start()
        } else if (prevProps.isButtonVisible !== this.props.isButtonVisible && !this.props.isButtonVisible) {
            Animated.timing(this.state.buttonAnimate, {
                toValue: 0,
                duration: 500,
            }).start()
        }
    }

    public render() {
        const { buttonHandler, iconName, iconSize, buttonText, reverseAppear } = this.props
        return (
            <AppearedButtonWrap onPress={() => buttonHandler()}>
                <AppearedButton
                    buttonText={buttonText}
                    style={{
                        transform: [
                            {
                                translateY: this.state.buttonAnimate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: reverseAppear ? [0, 100] : [100, 0],
                                }),
                            },
                        ],
                    }}
                >
                    {buttonText && <Text style={{ color: WHITE_COLOR, fontSize: 18 }}>{buttonText}</Text>}
                    <Icon size={iconSize} name={iconName} backgroundColor={WHITE_COLOR} color={WHITE_COLOR} />
                </AppearedButton>
            </AppearedButtonWrap>
        )
    }
}

export default UIAppearedButton

const AppearedButtonWrap = styled(Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity)`
    position: absolute;
    z-index: 20;
    right: 20;
    bottom: 20;
`

const AppearedButton = styled(Animated.View)`
        padding: ${props => (props.buttonText ? '10px' : '20px')};
        position: absolute;
        right: 10;
        bottom: 10;
        background-color: ${SOFT_BLUE_COLOR};
        border-radius: 50;
        shadow-radius: 3; 
        shadow-opacity: 0.2; 
        shadow-offset: {width: 1, height: 1}; 
        shadow-color: ${BLACK_COLOR};
        flex-direction: row;
        display: flex;
      `
