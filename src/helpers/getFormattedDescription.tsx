import styled from 'styled-components'

const StyledDescription = styled.p`
  line-height: 1.5rem;
  font-size: 1.1rem;
`

export const getFormattedDescription = (description: string) => {
  const sentences = description.split('. ')

  return (
    <>
      {sentences.map(sentence => {
        return (
          <StyledDescription key={sentence}>
            {sentence.replace('.', '')}.
          </StyledDescription>
        )
      })}
    </>
  )
}
