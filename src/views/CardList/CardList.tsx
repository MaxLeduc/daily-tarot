import { memo, useEffect, useState } from 'react'

import { APIClient } from '@app/api'
import { Card } from '@app/types'
import { CardLayout } from '@app/components'
import { getFormattedDescription } from '@app/helpers'

const fetchCards = async () => {
  const res = await APIClient.get('/api/cards').then(res => res.json())
  return res.data
}

function compare(a: Card, b: Card) {
  if (a.id < b.id) {
    return -1
  }
  if (a.id > b.id) {
    return 1
  }
  return 0
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
      {cards.sort(compare).map(card => {
        console.log(card)
        return (
          <div key={card.slug}>
            <h1>{`${card.id} - ${card.slug}`}</h1>
            <CardLayout
              card={card}
              setOpenDrawer={() => {
                window.location.href = card.wiki_link
              }}
            />
            <p>{card.upright}</p>
            {getFormattedDescription(card.description)}
          </div>
        )
      })}
    </div>
  )
}

export default memo(CardList)
