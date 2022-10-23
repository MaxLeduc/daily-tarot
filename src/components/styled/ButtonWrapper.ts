import styled from 'styled-components'

export const ButtonWrapper = styled.div<{ showButtons: boolean }>`
  opacity: ${({ showButtons }) => (showButtons ? '1' : '0')};
  transition: opacity 2s ease;
`
