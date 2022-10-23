import { useReducer, memo, Reducer } from 'react'

import { IntroView, TarotReadingView, CardRevealingView } from '@app/views'

import { reducer, initialState, AppState, Actions } from './homeReducer'

function Home() {
  const [state, dispatch] = useReducer<Reducer<AppState, Actions>>(
    reducer,
    initialState,
  )

  if (state.currentState === 'CARD_SHOWING') {
    if (!state.card) {
      console.error('Could not find card')
      return null
    }

    return <CardRevealingView card={state.card} />
  }

  if (state.currentState === 'CARD_READING') {
    if (!state.card) {
      console.error('Could not find card')
      return null
    }

    return <TarotReadingView card={state.card} dispatch={dispatch} />
  }

  return <IntroView currentState={state.currentState} dispatch={dispatch} />
}

export default memo(Home)
