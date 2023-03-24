import React from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import Thread from './Thread'
import UserInput from './UserInput'


const componentS = (style: StyleI) => css({
    width: '100%',
    minHeight: `calc(100vh - ${style.view.headerHeight})`,
    backgroundColor: '#ddd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
})

const Body: React.FunctionComponent = props => {

    const { style } = useMainContext()

    return (
        <div css={componentS(style)}>
            <Thread />
            <UserInput />
        </div>
    )
}

export default Body