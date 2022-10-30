import styled from 'styled-components'

import { colors } from '@app/constants'

export const Button = styled.button<{
  inverted?: boolean
  hideButton?: boolean
}>`
  margin: 0 5px;
  background: ${({ inverted }) => (inverted ? colors.terciary : 'transparent')};
  color: ${({ inverted }) => (inverted ? '#000e1b' : '#daa520')};
  border: 1px solid
    ${({ inverted }) => (inverted ? colors.terciary : '#daa520')};
  padding: 5px 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  font-family: 'Berkshire Swash';
  opacity: ${({ hideButton }) => (hideButton ? '0' : '1')};
  transition: opacity 3s ease;
`
