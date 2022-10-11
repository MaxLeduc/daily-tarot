import { useCallback, useState, ReactNode, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Typist from 'react-typist'

import { APIClient } from './api'

export type CardType = {
  id: number
  name: string
}

type Card = {
  id: number
  slug: string
  description: string
  upright: string
  reversed: string
  type: CardType['name']
}

function CardLayout({ card }: { card: Card }) {
  const { slug, type } = card

  return (
    <div>
      <img
        src={`${
          import.meta.env.DEV ? import.meta.env.VITE_LOCAL_BACKEND_URL : ''
        }/assets/${slug}.jpg`}
      />
      <h4>Type: {type}</h4>
    </div>
  )
}
const ViewContainer = styled.div`
  max-width: 960px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const ViewContainer2 = styled.div`
  max-width: 960px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const ViewContainer3 = styled.div`
  max-width: 960px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

function Home() {
  const [card, setCard] = useState<Card | null>(null)
  const [showCard, setShowCard] = useState<boolean>(false)

  const fetchCard = useCallback(async () => {
    const res = await APIClient.get('/api/cards/random').then(res => res.json())
    setCard(JSON.parse(res.data))
  }, [])

  if (showCard && card) {
    return (
      <ViewContainer3>
        <CardLayout card={card} />
      </ViewContainer3>
    )
  }

  if (card) {
    const agreementMessage = 'Very well then.'
    const mmmm = 'mmmm.'
    const uprightMessage = `I see ${card.upright} in your future.`
    const interesting = 'Interesting.'

    return (
      <ViewContainer2>
        <Typist onTypingDone={() => setShowCard(true)}>
          <span>{agreementMessage}</span>
          <Typist.Backspace count={agreementMessage.length} delay={200} />
          <span>{mmmm}</span>
          <Typist.Backspace count={mmmm.length} delay={200} />
          <span>{interesting}</span>
          <Typist.Backspace count={interesting.length} delay={200} />
          <Typist.Delay ms={500} />
          <span>{uprightMessage}</span>
          <Typist.Delay ms={3000} />
          <Typist.Backspace count={uprightMessage.length} delay={200} />
        </Typist>
      </ViewContainer2>
    )
  }

  const welcomeMessage = 'Hello Stranger.'
  const question = 'Shall I look into your future?'

  return (
    <ViewContainer>
      <Typist
        startDelay={1000}
        onTypingDone={() => console.log('done')}
        cursor={{
          show: true,
          blink: true,
          element: '|',
          hideWhenDone: true,
          hideWhenDoneDelay: 1000,
        }}
      >
        <span>{welcomeMessage}</span>
        <Typist.Backspace count={welcomeMessage.length} delay={200} />
        <span>{question}</span>
        <Typist.Backspace count={question.length} delay={200} />
        <button onClick={() => fetchCard()}>Yes</button>
        <button>No</button>
      </Typist>
    </ViewContainer>
  )
}

const AppBackground = styled.div`
  background-color: #000e1b;
  height: 100vh;
  padding-top: 20px;
  background-size: 150px 150px;
  background-repeat: repeat;
`

function AppWrapper({ children }: { children: ReactNode }) {
  return <AppBackground>{children}</AppBackground>
}

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default App
