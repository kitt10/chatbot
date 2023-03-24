import { createContext, useContext } from 'react'

export interface MessageI {
  text: string
  time: string
  source: string
  dt: number
}

export interface ReplyI {
  text: string
  dt: number
}

export interface SpeechCloudI {
  usingASR: boolean
  setUsingASR: (on: boolean) => void
  usingTTS: boolean
  setUsingTTS: (on: boolean) => void
  scLib: object
  initialized: boolean,
  init: () => void,
  asrReady: boolean,
  recognize: () => void,
  recognizing: boolean,
  synthesize: (text: string) => void,
  synthesizing: boolean
}

export interface DataContextI {
  logged: boolean
  log: () => void
  sendToServer: (q: string) => void
  dialog: MessageI[]
  robotThinking: boolean
  sc: SpeechCloudI
}

const DataContext = createContext<DataContextI>({} as DataContextI)

export const useDataContext = () => {
  return useContext(DataContext)
}

export default DataContext
