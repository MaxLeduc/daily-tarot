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
    font-size: 1rem;
  }
`

const Inner = styled.div`
  width: 600px;
  max-width: calc(100vw - 40px);
  padding: 20px;
`

const StyledDescription = styled.p`
  line-height: 1.7rem;
  font-size: 1.2rem;
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

function CardRevealingView({ card }: { card: Card }) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const classes = useStyles()

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
            <h1>
              {card.slug
                .split('_')
                .map(element => {
                  return (
                    element.charAt(0).toUpperCase() +
                    element.slice(1).toLowerCase()
                  )
                })
                .join(' ')}
            </h1>
            <h4>Type: {card.type}</h4>
            <StyledDescription>{card.description}</StyledDescription>
            <p>Source: Wikipedia</p>
          </Inner>
        </Drawer>
      </FadeInContainer>
    </ViewContainer>
  )
}

export default memo(CardRevealingView)
