import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'


const componentS = (style: StyleI) => css({
    width: '100%',
    height: style.view.headerHeight,
    minHeight: style.view.headerHeight,
    zIndex: 200,
    backgroundColor: style.colors.dark,
    color: style.colors.blond,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
})

const headerBlockS = (style: StyleI, selected: boolean) => css({
    height: `calc(${style.view.headerHeight} - 20px)`,
    width: 'auto',
    fontSize: '13px',
    color: selected ? style.colors.highlight : style.colors.blond,
    marginLeft: '25px',
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '5px',
    ':hover': {
        backgroundColor: '#222222'
    }
})


const Header: React.FunctionComponent = props => {

    const { style, page } = useMainContext()

    return (
        <div css={componentS(style)}>
            <a href='https://kky.zcu.cz' target='blank' title='Open the KKY website.'>
                <img css={headerBlockS(style, false)} src='/img/kky_logo.png' />
            </a>
            <Link href='/'>
                <div css={headerBlockS(style, page == 'index')}>
                    {'T5-based CHATBOT'}
                </div>
            </Link>

            <Link href='/readme'>
                <div css={headerBlockS(style, page == 'readme')}>
                    {'Readme'}
                </div>
            </Link>
            
            <div css={{flexGrow: 1}}>
                &nbsp;
            </div>
        </div>
    )
}

export default Header