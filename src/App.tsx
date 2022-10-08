import { useCallback, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
  const { slug, description, upright, reversed, type } = card

  return (
    <div>
      <img
        src={`${
          import.meta.env.DEV ? import.meta.env.VITE_LOCAL_BACKEND_URL : ''
        }/assets/${slug}.jpg`}
      />
      <h3>
        {slug
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </h3>
      <h4>Type: {type}</h4>
      <h4>Upright: {upright}</h4>
      <h4>Reversed: {reversed}</h4>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const [card, setCard] = useState<Card | null>(null)

  const fetchCard = useCallback(async () => {
    const res = await APIClient.get('/api/cards/random').then(res => res.json())
    setCard(JSON.parse(res.data))
  }, [])

  if (!card) {
    return <button onClick={() => fetchCard()}>Pick a card.</button>
  }

  return (
    <div>
      <CardLayout card={card} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
