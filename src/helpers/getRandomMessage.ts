export const getRandomMessage = (messages: string[]) => {
  const randomNumber = Math.floor(Math.random() * messages.length)

  return messages[randomNumber]
}
