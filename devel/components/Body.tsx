import React from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { useDataContext } from '../context/DataContext'


const componentS = (style: StyleI) => css({
    width: '100%',
    height: `calc(100% - ${style.view.headerHeight})`,
    backgroundColor: style.colors.blond,
    color: style.colors.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const ansS = (style: StyleI) => css({
    width: '100%',
    marginTop: '100px',
    fontSize: '150%',
    color: 'darkblue'
})

const Body: React.FunctionComponent = props => {

    const { style } = useMainContext()
    const { query, res } = useDataContext()

    const doQuery = () => {
        const q: string = 'čauky'
        console.log('Sending:', q)
        const ans = query(q)
        console.log('Ans:', ans)
    }

    return (
        <div css={componentS(style)}>
            <button onClick={() => doQuery()}>{'Do Query'}</button>
            <div css={ansS(style)}>{res.ans}</div>
        </div>
    )
}

export default Body