import React, { Fragment, useEffect, createRef } from 'react'
import { css } from '@emotion/react'
import { StyleI, useMainContext } from '../context/MainContext'
import { MessageI, useDataContext } from '../context/DataContext'


const componentS = (style: StyleI) => css({
    width: 'fit-content',
    minWidth: '450px',
    maxWidth: 'calc(90% - 50px)',
    height: '950px',//'fit-content',
    maxHeight: `calc(100vh - ${style.view.headerHeight} - 250px)`,
    overflowY: 'scroll',
    backgroundColor: '#fff',
    color: style.colors.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '25px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    boxShadow: '1px 3px #ccc'
})

const messageTimeS = (style: StyleI, visible: boolean) => css({
    visibility: visible ? 'visible' : 'hidden',
    width: 'fit-content',
    backgroundColor: 'transparent',
    color: 'gray',
    fontSize: '12px',
    marginTop: '25px',
    alignSelf: 'center'
})

const messageTextS = (style: StyleI, source: string) => css({
    width: 'fit-content',
    backgroundColor: source == 'bot' ? '#ccc' : 'blue',
    color: source == 'bot' ? 'black' : 'white',
    padding: '7px',
    borderRadius: '7px',
    alignSelf: source == 'bot' ? 'flex-start' : 'flex-end',
    marginTop: '7px'
})

const robotThinkingS = (style: StyleI) => css({
    width: 'fit-content',
    color: 'gray',
    padding: '7px',
    borderRadius: '7px',
    alignSelf: 'flex-start',
    marginTop: '7px'
})


const Thread: React.FunctionComponent = props => {

    const { style } = useMainContext()
    const { dialog, robotThinking, sc } = useDataContext()

    const refThread: React.RefObject<HTMLDivElement> = createRef() as React.RefObject<HTMLDivElement>

    useEffect(() => {
        if (refThread.current) {
            refThread.current.scrollTo(0, refThread.current.scrollHeight)
        }
    }, [dialog.length])

    return (
        <div css={componentS(style)} ref={refThread}>
            {dialog.length > 0 && dialog.map((message: MessageI) => 
                <Fragment key={'message_'+message.time.toString()}>
                    <div css={messageTimeS(style, message.source == 'human')}>
                        {message.time}
                    </div>
                    <div css={messageTextS(style, message.source)}>
                        {message.text}
                    </div>
                </Fragment>
            )}
            {robotThinking && 
                <div css={robotThinkingS(style)}>
                    {'Thinking...'}
                </div>
            }
            {dialog.length <= 0 && (sc.usingASR ? 'Start talking...' : 'Start the chat...')}
        </div>
    )
}

export default Thread