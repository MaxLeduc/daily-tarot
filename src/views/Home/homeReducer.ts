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

export type Actions =
  | ShowCardAction
  | ShowButtonsAction
  | ShowReadingAction
  | StopReading

// const TempCard = {
//   id: 1,
//   slug: 'the_magician',
//   description:
//     'The Magician is depicted with one hand pointing upwards towards the sky and the other pointing down to the earth, interpreted widely as an "as above, so below" reference to the spiritual and physical realms. On the table before him are a cup, a sword, a wand, and a pentacle, representing the four suits of the Minor Arcana. Such symbols signify the classical elements of earth, air, fire and water, "which lie like counters before the adept, and he adapts them as he wills". The Magician\'s right hand, pointed upwards, holds a double-ended white wand; the ends are interpreted much like the hand gestures, in that they represent the Magician\'s status as conduit between the spiritual and the physical. His robe is similarly also white, a symbol of purity yet also of inexperience, while his red mantle is understood through the lens of red\'s wildly polarised colour symbolism—both a representative of willpower and passion, and one of egotism, rage, and revenge. In front of the Magician is a garden of Rose of Sharon roses and lily of the valley lillies demonstrating the "culture of aspiration", or the Magician\'s ability to cultivate and fulfill potential.',
//   upright: 'Willpower, creation and manifestation',
//   reversed: 'Physician, Magus, mental disease, disgrace, disquiet',
//   type: 'Major Arcana',
// }

export const initialState: AppState = {
  card: null,
  currentState: 'INITIAL',
}

export const reducer = (state: AppState, action: Actions) => {
  console.log({ state, action })
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
    default:
      return state
  }
}
