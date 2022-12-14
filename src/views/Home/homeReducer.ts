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

type Restart = {
  type: 'RESTART'
}

export type Actions =
  | ShowCardAction
  | ShowButtonsAction
  | ShowReadingAction
  | StopReading
  | Restart

export const initialState: AppState = {
  card: null,
  currentState: 'INITIAL',
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
