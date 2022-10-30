import { memo } from 'react'
import styled from 'styled-components'
import crystalBall from './assets/crystal-ball.svg'

const TopBarContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledImg = styled.img`
  width: 25px;
`

const StyledText = styled.span<{ first?: boolean }>`
  font-size: 0.8rem;
  width: 100px;
  display: block;
  font-family: 'Berkshire Swash';
  text-align: ${({ first }) => (first ? 'right' : 'left')};
  margin-right: ${({ first }) => (first ? '5px' : '0')};
  margin-left: ${({ first }) => (first ? '0' : '5px')};
`

function TopBar() {
  return (
    <TopBarContainer>
      <StyledText first>Fortune</StyledText>
      <StyledImg src={crystalBall} />
      <StyledText>Readers</StyledText>
    </TopBarContainer>
  )
}

export default memo(TopBar)
