import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Page from '../components/core/Page'
import Header from '../components/Header'
import { StyleI, useMainContext } from '../context/MainContext'


const readmeFrameS = (style: StyleI) => css({
  width: '80%',
  textAlign: 'left',
  marginTop: '30px',
  height: `calc(100vh - ${style.view.headerHeight})`,
  overflowY: 'scroll',
  lineHeight: '1.7em'
})

const Readme = () => {

  const { setPage, style } = useMainContext()
  const [readmeText, setReadmeText] = useState('')

  const getReadmeText = async () => {
    const res = await fetch('/data/readme.md', {method: 'GET'})
    setReadmeText(await res.text())
}

  useEffect(() => {
    setPage('readme')
    getReadmeText()
  }, [])

  return (
    <Page title='KKY | MDE Corpus | Readme' description='Data Analysis'>
      <Header />
      <div css={readmeFrameS(style)}>
        <ReactMarkdown>{readmeText}</ReactMarkdown>
      </div>
    </Page>
  )
}

export default Readme
