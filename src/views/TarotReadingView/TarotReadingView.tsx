import { memo, useMemo, Dispatch, useState } from 'react'
import Typist from 'react-typist'
import styled from 'styled-components'

import { ViewContainer, Button, ButtonWrapper } from '@app/components'
import { Card } from '@app/types'
import { Actions } from '@app/views'
import { getRandomMessage } from '@app/helpers'

export const TextWrapper = styled.div`
  margin-bottom: 20px;
`

const getRandomFortune = (fortunes: string[], secret: string) => {
  const randomNumber = Math.floor(Math.random() * fortunes.length)
  const words = fortunes.filter((val, i) => i <= randomNumber)
  const before = `${secret ? `${secret} ` : ''}`

  if (words.length === 1) {
    return `${before} I see ${words[0]} in your future.`
  }

  const popped = words.pop()
  const lastFortune = popped ? ` and ${popped}` : ''

  console.log({ words, popped })

  return `${before}
 I see ${words.join(', ')}${lastFortune}  in your future.`
}

function TarotReadingView({
  card,
  dispatch,
}: {
  card: Card
  dispatch: Dispatch<Actions>
}) {
  const [isDoneTyping, setIsDoneTyping] = useState(false)
  const fortuneWords = card.upright.toLowerCase().split(',')
  const text = useMemo(
    () => ({
      agreementMessage: 'Very well then.',
      letMeSee: 'Let me see.',
      interesting: 'Interesting.',
      facinating: 'Facinating.',
      intriguing: 'Intriguing.',
      seeCardMessage: 'I picked a card for you, do you wish to see it?',
      yes: 'Yes',
      no: 'No',
      secret: `${
        card.secret_type === 'Great Secret' ? 'Great things await you.' : ''
      }`,
    }),
    [],
  )
  const randomMessage = getRandomMessage([
    text.interesting,
    text.facinating,
    text.intriguing,
  ])
  const fortune = getRandomFortune(fortuneWords, text.secret)

  return (
    <ViewContainer>
      <TextWrapper>
        <Typist onTypingDone={() => setIsDoneTyping(true)}>
          <span>{text.agreementMessage}</span>
          <Typist.Backspace count={text.agreementMessage.length} delay={200} />
          <span>{text.letMeSee}</span>
          <Typist.Backspace count={text.letMeSee.length} delay={200} />
          <span>{randomMessage}</span>
          <Typist.Delay ms={500} />
          <Typist.Backspace count={randomMessage.length} delay={200} />
          <span>{fortune}</span>
          <Typist.Delay ms={1000} />
          <Typist.Backspace count={fortune.length} delay={200} />
          <span>{text.seeCardMessage}</span>
        </Typist>
      </TextWrapper>
      <ButtonWrapper showButtons={isDoneTyping}>
        <Button onClick={() => dispatch({ type: 'SHOW_CARD' })} inverted>
          {text.yes}
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: 'STOP_READING' })
          }}
        >
          {text.no}
        </Button>
      </ButtonWrapper>
    </ViewContainer>
  )
}

export default memo(TarotReadingView)
