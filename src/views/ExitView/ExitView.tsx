import Typist from 'react-typist'
import { memo } from 'react'

import { ViewContainer } from '@app/components'

import { getRandomMessage } from '@app/helpers'
import { Card } from '@app/types'

function ExitView({ card }: { card: Card | null }) {
  const text = {
    fateAwaitsEitherWay: 'Fate shall await you either way.',
    mmmm: 'Mmmm.',
    oh: 'Oh.',
    farewell: 'Farewell then.',
  }
  const randomMessage = getRandomMessage([text.mmmm, text.oh])

  if (card) {
    return (
      <ViewContainer>
        <Typist>
          <span>{randomMessage}</span>
          <Typist.Backspace count={randomMessage.length} delay={200} />
          <span>{text.farewell}</span>
        </Typist>
      </ViewContainer>
    )
  }

  return (
    <ViewContainer>
      <Typist>
        <span>{randomMessage}</span>
        <Typist.Backspace count={randomMessage.length} delay={200} />
        <span>{text.fateAwaitsEitherWay}</span>
      </Typist>
    </ViewContainer>
  )
}

export default memo(ExitView)
