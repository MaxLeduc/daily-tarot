import { memo } from 'react'
import styled from 'styled-components'

import { colors } from '@app/constants'

const BottomBarContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledText = styled.span<{ first?: boolean }>`
  font-size: 12px;
  font-family: 'Berkshire Swash';
`

const StyledLink = styled.a`
  color: ${colors.terciary};
  text-decoration: none;

  &:hover {
    color: #8a0303;
    transition: color 3s ease;
  }
`

function BottomBar() {
  const year = new Date().getFullYear()

  return (
    <BottomBarContainer>
      <StyledText>
        ©{' '}
        <StyledLink
          href="https://twitter.com/ledukeness"
          target="_blank"
          rel="noopener noreferrer"
        >
          Maxime Leduc
        </StyledLink>{' '}
        - {year}
      </StyledText>
    </BottomBarContainer>
  )
}

export default memo(BottomBar)
