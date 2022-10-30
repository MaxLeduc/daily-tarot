import React, { memo, useMemo, Dispatch, useState } from 'react'
import Typist from 'react-typist'
import styled from 'styled-components'

import { ViewContainer, Button, ButtonWrapper } from '@app/components'
import { Card } from '@app/types'
import { Actions } from '@app/views'
import { getRandomMessage } from '@app/helpers'
import { colors } from '@app/constants'

export const TextWrapper = styled.div`
  margin-bottom: 20px;
`

const getRandomFortune = (fortunes: string[], secret: string) => {
  const randomNumber = Math.floor(Math.random() * fortunes.length)
  const words = fortunes.filter((val, i) => i <= randomNumber)
  const before = `${secret ? `${secret}` : ''}`
  const first = `${before} I see `
  const last = ` in your future.`
  let second = ''

  if (words.length === 1) {
    second = words[0]
    const fortuneSentence = `${first}${second}${last}`

    return {
      el: (
        <span>
          {first}
          <span style={{ color: colors.terciary }}>{second}</span>
          {last}
        </span>
      ),
      wordCount: fortuneSentence.length,
    }
  }

  const popped = words.pop()
  second = words.join(', ')
  const lastFortune = popped ? ` and ${popped}` : ''
  const fortuneSentence = `${first}${second}${lastFortune}${last}`

  return {
    el: (
      <span>
        {first}
        {words.map((word, i) => {
          return (
            <div style={{ display: 'inline-block' }} key={word}>
              <span style={{ color: colors.terciary }}>{word}</span>
              {i < words.length - 1 ? <span>,&nbsp;</span> : ''}
            </div>
          )
        })}
        {popped ? (
          <span>
            {' '}
            and <span style={{ color: colors.terciary }}>{popped}</span>
          </span>
        ) : (
          ''
        )}
        {last}
      </span>
    ),
    wordCount: fortuneSentence.length,
  }
}

function TarotReadingView({
  card,
  dispatch,
}: {
  card: Card
  dispatch: Dispatch<Actions>
}) {
  const [isDoneTyping, setIsDoneTyping] = useState(false)
  const fortuneWords = card.upright.toLowerCase().split(', ')
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
        card.secret_type === 'Great Secret' ? 'Great things await.' : ''
      }`,
    }),
    [],
  )
  const randomMessage = getRandomMessage([
    text.interesting,
    text.facinating,
    text.intriguing,
  ])
  const { el, wordCount } = useMemo(
    () => getRandomFortune(fortuneWords, text.secret),
    [],
  )

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
          <span>{el}</span>
          <Typist.Delay ms={1000} />
          <Typist.Backspace count={wordCount} delay={200} />
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
