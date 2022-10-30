import { useReducer, memo, Reducer } from 'react'
import type {Dispatch} from 'react'
import styled from 'styled-components'

import {
  IntroView,
  TarotReadingView,
  CardRevealingView,
  ExitView,
} from '@app/views'
import {
  TopBar,
  BottomBar
} from '@app/components'

import { reducer, initialState, AppState, Actions } from './homeReducer'

const StyledContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`

const getCurrentView = (state: AppState, dispatch: Dispatch<Actions>) => {
  if (state.currentState === 'CARD_SHOWING') {
    if (!state.card) {
      console.error('Could not find card')
      return null
    }

    return <CardRevealingView card={state.card} dispatch={dispatch} />
  }

  if (state.currentState === 'CARD_READING') {
    if (!state.card) {
      console.error('Could not find card')
      return null
    }

    return <TarotReadingView card={state.card} dispatch={dispatch} />
  }

  if (state.currentState === 'READING_STOPPED') {
    return <ExitView card={state.card} />
  }

  return <IntroView currentState={state.currentState} dispatch={dispatch} />
}

function Home() {
  const [state, dispatch] = useReducer<Reducer<AppState, Actions>>(
    reducer,
    initialState,
  )
  const view = getCurrentView(state, dispatch)

  return <StyledContainer>
    <TopBar />
    {view}
    <BottomBar />
  </StyledContainer>
}

export default memo(Home)
