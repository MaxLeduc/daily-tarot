import { useMemo, memo, Dispatch } from 'react'
import Typist from 'react-typist'

import { ViewContainer, Button, ButtonWrapper } from '@app/components'
import { Actions } from '@app/views'
import { APIClient } from '@app/api'

import { TextWrapper } from './styled'

const fetchCard = async () => {
  const res = await APIClient.get('/api/cards/random').then(res => res.json())
  return JSON.parse(res.data)
}

function IntroView({
  currentState,
  dispatch,
}: {
  currentState: any
  dispatch: Dispatch<Actions>
}) {
  const text = useMemo(
    () => ({
      welcomeMessage: 'Hello Stranger.',
      question: 'Shall I look into your future?',
      yes: 'YES',
      no: 'NO',
    }),
    [],
  )

  return (
    <ViewContainer>
      <TextWrapper>
        <Typist
          startDelay={1000}
          onTypingDone={() => dispatch({ type: 'SHOW_BUTTONS' })}
          cursor={{
            show: true,
            blink: true,
            element: '|',
            hideWhenDone: true,
            hideWhenDoneDelay: 0,
          }}
        >
          <span>{text.welcomeMessage}</span>
          <Typist.Backspace count={text.welcomeMessage.length} delay={200} />
          <span>{text.question}</span>
        </Typist>
      </TextWrapper>
      <ButtonWrapper showButtons={currentState === 'BUTTONS_SHOWING'}>
        <Button
          onClick={async () => {
            const card = await fetchCard()
            dispatch({ type: 'SHOW_READING', payload: { card } })
          }}
          inverted
        >
          {text.yes}
        </Button>
        <Button>{text.no}</Button>
      </ButtonWrapper>
    </ViewContainer>
  )
}

export default memo(IntroView)
