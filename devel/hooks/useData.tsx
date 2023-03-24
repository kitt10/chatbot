import { useEffect, useState } from "react"
import { DataContextI, MessageI, ReplyI, SpeechCloudI } from "../context/DataContext"
import { get, post } from "../fcn/httpFetch"
import { cfg } from "../config/cfg"

export const useData = () => {

    const [logged, setLogged] = useState(false)
    const [dialog, setDialog] = useState([] as MessageI[])
    const [robotThinking, setRobotThinking] = useState(false)
    
    const [usingASR, setUsingASR] = useState(false)
    const [usingTTS, setUsingTTS] = useState(true)
    const [scLib, setScLib] = useState({} as any)
    const [scInitialized, setScInitialized] = useState(false)
    const [asrReady, setAsrReady] = useState(false)
    const [recognizing, setRecognizing] = useState(false)
    const [synthesizing, setSynthesizing] = useState(false)

    const log = async () => {
        if (!logged) {
            await get(cfg.uri_log).then(async (res: {online: boolean}) => {
                setLogged(res.online)
                console.log('Logged. Server online.', res)
            }).catch(() => { 
                setLogged(false)
                console.log('Server not online')
            })
        }
    }

    const sendToServer = async (message: string) => {
        if (logged) {
            await onHumanMessage(message).then(async (updatedDialog: MessageI[]) => {
                console.log('human message set:', updatedDialog)
                await post(cfg.uri_query, {message: message}).then(async (reply: ReplyI) => {
                    console.log('Got result:', reply)
                    onBotMessage(reply, updatedDialog)
                }).catch(() => { 
                    console.log('E: Unable to fetch Env data.')
                })
            })
        } else {
            console.log('E: Not connected.')
        }
    }

    const getNow = () => {
        const date = new Date()
        return date.toLocaleString('cs')+'.'+date.getMilliseconds()
    }

    const onHumanMessage = async (messageText: string) => {
        setRobotThinking(true)
        const message: MessageI = {
            text: messageText,
            source: 'human',
            time: getNow(),
            dt: 0
        }
        console.log('Human appending to', dialog)
        const updatedDialog = dialog.concat([message])
        setDialog(updatedDialog)
        return updatedDialog
    }

    const onBotMessage = async (reply: ReplyI, updatedDialog: MessageI[]) => {
        setRobotThinking(false)
        const message: MessageI = {
            text: reply.text,
            source: 'bot',
            time: getNow(),
            dt: reply.dt
        }
        console.log('Bot appending to', updatedDialog)
        setDialog(updatedDialog.concat([message]))
    }

    // SpeechCloud ----

    const onWsConnected = () => {
        console.log('SC: ws connected.')
    }
    
    const onWsClosed = () => {
        setAsrReady(false)
        setRecognizing(false)
        console.log('SC: ws closed.')
    }
    
    const onWsSession = () => {
        console.log('SC: ws session.')
    }
    
    const onASRReady = () => {
        setAsrReady(true)
        console.log('SC: ASR ready.')
    }
    
    const onASRRecognizing = () => {
        setRecognizing(true)
        console.log('SC: Recognizing...')
    }
    
    const onASRResult = (msg: any) => {
        setRecognizing(false)
        console.log('SC: ASR result.', msg)
    }
    
    const onSCError = (msg: any) => {
        setAsrReady(false)
        setRecognizing(false)
        console.log('SC: Error.', msg)
    }
    
    /** Add more listeners here...  */

    const initSpeechCloud = async () => {
        if (scInitialized) {
            setScInitialized(false)
        }
        
        console.log('Initializing SC...')

        // Ignore this VS Code warning, as it actually works (The lib is imported at _app.tsx / Scripts)
        // @ts-ignore
        let newScInstance: any = await new SpeechCloud(cfg.sc.options)

        console.log('Got instance:', newScInstance)
        console.log('Listeners registration...')

        newScInstance.on('_ws_connected', onWsConnected)
        newScInstance.on('_ws_closed', onWsClosed)
        newScInstance.on('_ws_session', onWsSession)
        newScInstance.on('asr_ready', onASRReady)
        newScInstance.on('asr_recognizing', onASRRecognizing)
        newScInstance.on('asr_result', onASRResult)
        newScInstance.on('sc_error', onSCError)
        
        /** Register more listeners here... */

        newScInstance.init()
        console.log('SC initialized.')

        // Make it visible via the sc variable everywhere:
        console.log(newScInstance)
        setScLib(newScInstance)
        setScInitialized(true)
    }

    const startRecognizing = () => {
        if (scLib && !recognizing) {
            scLib.asr_recognize()
        }
    }

    const stopRecognizing = () => {
        if (sc && recognizing) {
            scLib.asr_pause()
        }
    }
    
    const recognize = () => {
        startRecognizing()
    }

    const synthesize = (text: string) => {
        console.log('Trying to synthesize:', text)
        //scLib.tts_synthesize({
        //    text: text,
        //    voice: 'Stanislav210'
        //})
        scLib._ws.send(JSON.stringify({"type": "tts_synthesize", "text": text}))
        console.log('Synthesized.')
    }

    const sc: SpeechCloudI = {
        usingASR: usingASR,
        setUsingASR: setUsingASR,
        usingTTS: usingTTS,
        setUsingTTS: setUsingTTS,
        scLib: scLib,
        initialized: scInitialized,
        init: initSpeechCloud,
        asrReady: asrReady,
        recognize: recognize,
        recognizing: recognizing,
        synthesize: synthesize,
        synthesizing: synthesizing
    }

    const dataContext: DataContextI = {
        logged: logged,
        log: log,
        sendToServer: sendToServer,
        dialog: dialog,
        robotThinking: robotThinking,
        sc: sc
    }

    return dataContext
}

export default useData
