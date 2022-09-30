import { createContext, useContext } from 'react'
import { SerializedStyles } from '@emotion/react'

export type pageT = 'index' | 'readme'

export interface StyleI {
  globalStyle: SerializedStyles
  pageS: SerializedStyles
  colors: any
  view: any
}

export interface DeviceI {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

export interface MainContextI {
  style: StyleI
  device: DeviceI
  page: pageT
  setPage: (page: pageT) => void
}

const MainContext = createContext<MainContextI>({} as MainContextI)

export const useMainContext = () => {
  return useContext(MainContext)
}

export default MainContext
