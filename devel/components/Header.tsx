import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { useDataContext } from '../context/DataContext'
import Icon from './atomic/Icon'
import IconButton from './atomic/IconButton'
import { cfg } from '../config/cfg'


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
    fontSize: '17px',
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

const statusS = (style: StyleI, connected: boolean) => css({
    fontSize: '13px',
    color: connected ? 'lime' : 'red',
    marginRight: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const statusButtonS = (style: StyleI, connected: boolean) => css({
    fontSize: '13px',
    color: connected ? 'lime' : 'red',
    marginRight: '35px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    ':hover': {
        color: connected ? 'darkgreen' : 'maroon'
    }
})

const iconS = (style: StyleI) => css({
    marginRight: '10px'
})


const Header: React.FunctionComponent = props => {

    const { style, page } = useMainContext()
    const { logged, sc } = useDataContext()

    const scConnected: boolean = cfg.sc.useSc && sc.initialized

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
            <div css={{flexGrow: 1}} />
            {scConnected && 
                <div css={statusButtonS(style, sc.usingASR)} onClick={() => {sc.setUsingASR(!sc.usingASR)}}>
                    <IconButton
                        onClick={() => {}}
                        iconStyle={() => iconS(style)}
                        color={sc.usingASR ? 'lime' : 'red'}>{sc.usingASR ? 'mic' : 'mic_off'}</IconButton>
                    {'ASR '+(sc.usingASR ? 'on' : 'off')}
                </div>
            }
            {scConnected && 
                <div css={statusButtonS(style, sc.usingTTS)} onClick={() => {sc.setUsingTTS(!sc.usingTTS)}}>
                    <IconButton
                        onClick={() => {}}
                        iconStyle={() => iconS(style)}
                        color={sc.usingTTS ? 'lime' : 'red'}>{sc.usingTTS ? 'volume_up' : 'volume_off'}</IconButton>
                    {'TTS '+(sc.usingTTS ? 'on' : 'off')}
                </div>
            }
            <div css={{width: '100px'}} />
            <div css={statusS(style, scConnected)}>
                <Icon 
                    iconStyle={() => iconS(style)}
                    color={scConnected ? 'lime' : 'red'}>{scConnected ? 'wifi_on' : 'wifi_off'}</Icon>
                {'SpeechCloud '+(scConnected ? 'connected' : 'disconnected')}
            </div>
            <div css={statusS(style, logged)}>
                <Icon 
                    iconStyle={() => iconS(style)}
                    color={logged ? 'lime' : 'red'}>{logged ? 'wifi_on' : 'wifi_off'}</Icon>
                {'T5 '+(logged ? 'connected' : 'disconnected')}
            </div>
        </div>
    )
}

export default Header