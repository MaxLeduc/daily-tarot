import { memo } from 'react'
import styled from 'styled-components'

import { Card } from '@app/types'

const StyledImage = styled.img`
  width: 100%;
  border: 2px solid white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  max-height: 450px;
  background-color: rgba(235, 235, 235, 0.1);
`

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: block;
  max-width: 70%;
  margin: 0 auto;
`

function CardLayout({
  card,
  setOpenDrawer,
}: {
  card: Card
  setOpenDrawer: (isOpen: boolean) => void
}) {
  const { url } = card

  return (
    <StyledButton onClick={() => setOpenDrawer(true)}>
      <StyledImage
        src={`${
          import.meta.env.DEV ? import.meta.env.VITE_LOCAL_BACKEND_URL : ''
        }${url}`}
      />
    </StyledButton>
  )
}

export default memo(CardLayout)
