import { memo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import Typist from 'react-typist'

import { Card } from '@app/types'
import { CardLayout, ViewContainer } from '@app/components'

const useStyles = makeStyles({
  paperDark: {
    background: '#000e1b',
    color: 'white',
  },
})

const TypistWrapper = styled.div`
  * > span {
    font-size: 0.8rem;
  }
`

const Inner = styled.div`
  width: 600px;
  max-width: calc(100vw - 40px);
  padding: 20px;
`

const StyledDescription = styled.p`
  line-height: 1.5rem;
  font-size: 1.1rem;
`

const CloseButton = styled.button`
  width: 100%;
  padding: 10px 0;
  background: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border: 0;
`

const fadeInAnimation = keyframes`
 0% {
  opacity: 0;
 }

 100% {
  opacity: 100%;
 }
`

const FadeInContainer = styled.div`
  animation-name: ${fadeInAnimation};
  animation-duration: 5s;
  width: 100%;
`

const StyledTitle = styled.h1`
  font-family: 'Berkshire Swash';
  font-size: 3rem;
  margin: 25px 0 10px 0;
  text-align: center;
`

const StyledUnderTitle = styled.h4`
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  margin: 0 0 20px 0;
  font-style: italic;
  font-weight: normal;
`

const StyledLink = styled.a`
  color: white;
`

const toggleDrawer = (
  open: boolean,
  setOpenDrawer: (isOpen: boolean) => void,
) => (event: React.KeyboardEvent | React.MouseEvent) => {
  if (
    event.type === 'keydown' &&
    ((event as React.KeyboardEvent).key === 'Tab' ||
      (event as React.KeyboardEvent).key === 'Shift')
  ) {
    return
  }

  setOpenDrawer(open)
}

const getFormattedDescription = (description: string) => {
  const sentences = description.split('. ')

  return (
    <>
      {sentences.map(sentence => {
        return (
          <StyledDescription>{sentence.replace('.', '')}.</StyledDescription>
        )
      })}
    </>
  )
}

function CardRevealingView({ card }: { card: Card }) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const classes = useStyles()
  const formattedDescription = getFormattedDescription(card.description)

  return (
    <ViewContainer>
      <FadeInContainer>
        <CardLayout card={card} setOpenDrawer={setOpenDrawer} />
        <TypistWrapper>
          <Typist
            startDelay={1000}
            cursor={{
              show: true,
              blink: true,
              element: '|',
              hideWhenDone: true,
              hideWhenDoneDelay: 1000,
            }}
          >
            <Typist.Delay ms={1000} />
            <span>Click on your card to learn more.</span>
          </Typist>
        </TypistWrapper>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={toggleDrawer(false, setOpenDrawer)}
          classes={{ paper: classes.paperDark }}
        >
          <CloseButton onClick={() => setOpenDrawer(false)}>Close</CloseButton>
          <Inner>
            <StyledTitle>
              {card.slug
                .split('_')
                .map(element => {
                  return (
                    element.charAt(0).toUpperCase() +
                    element.slice(1).toLowerCase()
                  )
                })
                .join(' ')}
            </StyledTitle>
            <StyledUnderTitle>{card.type}</StyledUnderTitle>
            {formattedDescription}
            <p>
              <b>Source:</b>{' '}
              <StyledLink
                href={card.wiki_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </StyledLink>
            </p>
          </Inner>
        </Drawer>
      </FadeInContainer>
    </ViewContainer>
  )
}

export default memo(CardRevealingView)
