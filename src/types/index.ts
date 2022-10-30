export type CardType = {
  id: number
  name: 'Major Arcana' | 'Minor Arcana'
}

export type Card = {
  id: number
  slug: string
  description: string
  upright: string
  type: CardType['name']
  url: string
  secret_type: string
  wiki_link: string
}
