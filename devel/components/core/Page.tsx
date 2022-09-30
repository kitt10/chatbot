import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useMainContext } from '../../context/MainContext'
import _Temp from '../mobile/_Temp'

export const isMobile = () => {
  return Boolean(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))
}

export interface PageI {
    title: string
    description: string
}

const Page: NextPage<PageI> = props => {
    
  const { style, device } = useMainContext()

  useEffect(() => {
    device.setIsMobile(isMobile())
  }, [])

  return (
    <div css={style.pageS}>
      <Head>
          <title>{props.title}</title>
          <meta name="description" content={props.description} />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      {!device.isMobile && props.children}
      {device.isMobile && <_Temp />}
    </div>
  )
}
  
  export default Page