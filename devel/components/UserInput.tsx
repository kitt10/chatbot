import React, { createRef, KeyboardEvent, useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { useDataContext } from '../context/DataContext'


const componentS = (style: StyleI) => css({
    width: 'calc(90% - 50px)',
    height: '50px',
    backgroundColor: style.colors.blond,
    color: style.colors.dark,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25px',
    borderRadius: '10px',
    marginTop: '50px',
    marginBottom: '50px',
    boxShadow: '1px 3px #ccc'
})

const VoiceIconS = (style: StyleI) => css({
    visibility: 'hidden',
    width: '10%',
    marginRight: '5%',
    border: '1px solid red'
})

const TAuserMessageS = (style: StyleI) => css({
    width: '60%',
    fontSize: '15px',
    padding: '5px',
    borderRadius: '5px'
})

const SendButtonS = (style: StyleI, visible: boolean) => css({
    visibility: visible ? 'visible': 'hidden',
    width: '10%',
    fontSize: '20px',
    backgroundColor: 'darkblue',
    color: 'white',
    padding: '10px',
    marginLeft: '5%',
    cursor: 'pointer',
    borderRadius: '5px',
    boxShadow: '1px 3px #888888'
})

const UserInput: React.FunctionComponent = props => {

    const { style } = useMainContext()
    const { sendToServer, dialog } = useDataContext()

    const [sendable, setSendable] = useState(false)

    const refUserMessage: React.RefObject<HTMLInputElement> = createRef() as React.RefObject<HTMLInputElement>
    
    const sendMessage = () => {
        if (refUserMessage.current) {
            const message: string = refUserMessage.current.value
            console.log('Sending:', message)
            sendToServer(message)
            refUserMessage.current.value = ''
        } else {
            console.log('Empty message not sent.')
        }
    }

    const textAreaChangeHandler = () => {
        if (refUserMessage.current && refUserMessage.current.value != '') {
            !sendable && setSendable(true)
        } else {
            sendable && setSendable(false)
        }
    }

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key == 'Enter') {
          sendMessage()
        }
    }

    useEffect(() => {
        if (refUserMessage.current) {
            refUserMessage.current.focus()
        }
    }, [])

    return (
        <div css={componentS(style)} onKeyDown={(event) => onKeyDown(event)} tabIndex={0}>
            <div css={VoiceIconS(style)}>voice</div>
            <input type={'text'} ref={refUserMessage} onChange={textAreaChangeHandler} css={TAuserMessageS(style)} />
            <button css={SendButtonS(style, sendable)} onClick={() => sendMessage()}>send</button>
        </div>
    )
}

export default UserInput