import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { ActivityIndicator, View } from 'react-native'
import { checkAuth } from '../actions/auth'
import { BLACK_COLOR } from '../helpers/styleConstants'
import styled from 'styled-components'

class App extends React.Component {
    constructor(props) {
        super(props)
        props.checkAuth()
    }
    public render() {
        return (
            <Wrap>
                <ActivityIndicator size="large" color={BLACK_COLOR} />
            </Wrap>
        )
    }
}

const mapDispatchToProps = {
    checkAuth,
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

const Wrap = styled(View)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`
