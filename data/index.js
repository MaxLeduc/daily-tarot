var cards = require('./cards.json')

const fs = require('fs')

const data = cards.map(card => {
  return {
    key: `${card.id}`,
    value: JSON.stringify(card),
  }
})

const output = JSON.stringify(data)

fs.writeFile('./data/output/formatted_cards.json', output, err => {
  if (err) {
    return console.log('error', err)
  }

  console.log('Success')
})

data.forEach(card => {
  fs.writeFile(`./local_kv/CARDS/${card.key}`, card.value, err => {
    if (err) {
      return console.log('error', err)
    }

    console.log('Success')
  })
})
