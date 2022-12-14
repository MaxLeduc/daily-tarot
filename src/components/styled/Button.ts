import styled from 'styled-components'

export const Button = styled.button<{
  inverted?: boolean
  hideButton?: boolean
}>`
  margin: 0 5px;
  background: ${({ inverted }) => (inverted ? 'white' : 'transparent')};
  color: ${({ inverted }) => (inverted ? '#000e1b' : 'white')};
  border: 1px solid white;
  padding: 5px 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  font-family: 'Berkshire Swash';
  opacity: ${({ hideButton }) => (hideButton ? '0' : '1')};
  transition: opacity 3s ease;

  &:hover {
    color: red;
    transition: color 3s ease;
  }
`
