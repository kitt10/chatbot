import { useEffect } from 'react'
import Page from '../components/core/Page'
import Header from '../components/Header'
import Body from '../components/Body'
import { useMainContext } from '../context/MainContext'

const Home = () => {

  const { setPage } = useMainContext()

  useEffect(() => {
    setPage('index')
  }, [])

  return (
    <Page title='KKY | Chatbot' description='T5-based'>
      <Header />
      <Body />
    </Page>
  )
}

export default Home
