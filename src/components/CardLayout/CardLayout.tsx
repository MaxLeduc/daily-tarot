import { memo, useState } from 'react'
import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import Typist from 'react-typist'

import { Card } from '@app/types'

const useStyles = makeStyles({
  paperDark: {
    background: '#000e1b',
    color: 'white',
  },
})

const StyledImage = styled.img`
  width: 300px;
  max-width: 90%;
  border: 1px solid white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 15px;
`

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`

function CardLayout({
  card,
  setOpenDrawer,
}: {
  card: Card
  setOpenDrawer: (isOpen: boolean) => void
}) {
  const { slug } = card

  return (
    <StyledButton onClick={() => setOpenDrawer(true)}>
      <StyledImage
        src={`${
          import.meta.env.DEV ? import.meta.env.VITE_LOCAL_BACKEND_URL : ''
        }/assets/${slug}.svg`}
      />
    </StyledButton>
  )
}

export default memo(CardLayout)
