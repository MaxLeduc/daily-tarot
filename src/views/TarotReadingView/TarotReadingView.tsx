import { memo, useMemo, Dispatch, useState } from 'react'
import Typist from 'react-typist'
import styled from 'styled-components'

import { ViewContainer, Button, ButtonWrapper } from '@app/components'
import { Card } from '@app/types'
import { Actions } from '@app/views'

export const TextWrapper = styled.div`
  margin-bottom: 20px;
`

function TarotReadingView({
  card,
  dispatch,
}: {
  card: Card
  dispatch: Dispatch<Actions>
}) {
  const [isDoneTyping, setIsDoneTyping] = useState(false)

  const text = useMemo(
    () => ({
      agreementMessage: 'Very well then.',
      mmmm: 'Mmmm.',
      uprightMessage: `I see ${card.upright.toLowerCase()} in your future.`,
      interesting: 'Interesting.',
      seeCardMessage: 'Do you wish to see your card?',
      yes: 'Yes',
      no: 'No',
    }),
    [],
  )

  return (
    <ViewContainer>
      <TextWrapper>
        <Typist onTypingDone={() => setIsDoneTyping(true)}>
          <span>{text.agreementMessage}</span>
          <Typist.Backspace count={text.agreementMessage.length} delay={200} />
          <span>{text.mmmm}</span>
          <Typist.Backspace count={text.mmmm.length} delay={200} />
          <span>{text.interesting}</span>
          <Typist.Backspace count={text.interesting.length} delay={200} />
          <Typist.Delay ms={500} />
          <span>{text.uprightMessage}</span>
          <Typist.Delay ms={1000} />
          <Typist.Backspace count={text.uprightMessage.length} delay={200} />
          <span>{text.seeCardMessage}</span>
        </Typist>
      </TextWrapper>
      <ButtonWrapper showButtons={isDoneTyping}>
        <Button onClick={() => dispatch({ type: 'SHOW_CARD' })} inverted>
          {text.yes}
        </Button>
        <Button>{text.no}</Button>
      </ButtonWrapper>
    </ViewContainer>
  )
}

export default memo(TarotReadingView)
