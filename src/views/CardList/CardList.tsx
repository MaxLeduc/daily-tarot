import { memo, useEffect, useState } from 'react'

import { APIClient } from '@app/api'
import { Card } from '@app/types'
import { CardLayout } from '@app/components'

const fetchCards = async () => {
  const res = await APIClient.get('/api/cards').then(res => res.json())
  return res.data
}

function CardList() {
  const [cards, setCards] = useState<Card[] | null>(null)

  useEffect(() => {
    const populateCards = async () => {
      const cards = await fetchCards()
      setCards(cards)
    }

    populateCards()
  }, [])

  if (!cards) {
    return null
  }

  return (
    <div style={{ overflow: 'scroll', height: '100vh' }}>
      {cards.map(card => {
        return (
          <div>
            <h1>{`${card.id} - ${card.slug}`}</h1>
            <CardLayout
              card={card}
              setOpenDrawer={() => {
                window.location.href = card.wiki_link
              }}
            />
            <p>{card.upright}</p>
            <p>{card.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default memo(CardList)
