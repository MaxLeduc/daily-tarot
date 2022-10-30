import { Card } from '@app/types'

type StateTypes =
  | 'INITIAL'
  | 'BUTTONS_SHOWING'
  | 'CARD_READING'
  | 'CARD_SHOWING'
  | 'READING_STOPPED'

export type AppState = {
  card: Card | null
  currentState: StateTypes
  // card: Card
}

type ShowCardAction = {
  type: 'SHOW_CARD'
}

type ShowButtonsAction = {
  type: 'SHOW_BUTTONS'
}

type ShowReadingAction = {
  type: 'SHOW_READING'
  payload: {
    card: Card
  }
}

type StopReading = {
  type: 'STOP_READING'
}

type Restart = {
  type: 'RESTART'
}

export type Actions =
  | ShowCardAction
  | ShowButtonsAction
  | ShowReadingAction
  | StopReading
  | Restart

const TempCard: Card = {
  id: 0,
  slug: 'the_fool',
  description:
    'On The Fool Tarot card, a young man stands on the edge of a cliff, without a care in the world, as he sets out on a new adventure. He is gazing upwards toward the sky (and the Universe) and is seemingly unaware that he is about to skip off a precipice into the unknown. Over his shoulder rests a modest knapsack containing everything he needs – which isn’t much (let’s say he’s a minimalist). The white rose in his left hand represents his purity and innocence. And at his feet is a small white dog, representing loyalty and protection, that encourages him to charge forward and learn the lessons he came to learn. The mountains behind The Fool symbolize the challenges yet to come. They are forever present, but The Fool doesn’t care about them right now; he’s more focused on starting his expedition.',
  upright: 'new beginnings, innocence, adventure',
  type: 'Major Arcana',
  wiki_link: 'https://en.wikipedia.org/wiki/The_Fool_(tarot_card)',
  url: '/assets/the_fool.svg',
  secret_type: 'Great Secret',
}

export const initialState: AppState = {
  card: null,
  currentState: 'INITIAL',
  // card: TempCard,
  // currentState: 'CARD_SHOWING',
}

export const reducer = (state: AppState, action: Actions) => {
  switch (action.type) {
    case 'SHOW_BUTTONS':
      return {
        ...state,
        currentState: 'BUTTONS_SHOWING' as StateTypes,
      }
    case 'SHOW_READING':
      return {
        ...state,
        currentState: 'CARD_READING' as StateTypes,
        card: action.payload.card,
      }
    case 'SHOW_CARD':
      return {
        ...state,
        currentState: 'CARD_SHOWING' as StateTypes,
      }
    case 'STOP_READING':
      return {
        ...state,
        currentState: 'READING_STOPPED' as StateTypes,
      }
    case 'RESTART':
      return {
        card: null,
        currentState: 'INITIAL' as StateTypes,
      }
    default:
      return state
  }
}
