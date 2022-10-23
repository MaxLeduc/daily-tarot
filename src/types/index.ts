export type CardType = {
  id: number
  name: 'Major Arcana' | 'Minor Arcana'
}

export type Card = {
  id: number
  slug: string
  description: string
  upright: string
  reversed: string
  type: CardType['name']
}
