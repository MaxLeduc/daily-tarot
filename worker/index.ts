import {
  getAssetFromKV,
  serveSinglePageApp,
} from '@cloudflare/kv-asset-handler'
import { Router } from 'itty-router'

const deck = []
const router = Router()

const getStandardResponse = (data: any | null) => {
  const headers: { [key: string]: string } = {
    'Content-type': 'application/json',
  }

  if (ENV === 'dev') {
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  }

  return new Response(JSON.stringify({ data: data }), { headers })
}

router.get('/api/cards/random', async () => {
  const listOfCardKeys = await CARDS.list()
  const length = listOfCardKeys.keys.length
  const randomNumber = Math.floor(Math.random() * length)
  const card = await CARDS.get(`${randomNumber}`)

  return getStandardResponse(card)
})

router.get('/api/card_ids', async () => {
  const listOfCardKeys = await CARDS.list()

  return getStandardResponse(listOfCardKeys.keys)
})

router.get('/assets/*', async (request, event: FetchEvent) => {
  console.log(event.request)
  return await getAssetFromKV(event)
})

router.get('/*', async (request, event: FetchEvent) => {
  return await getAssetFromKV(event, { mapRequestToAsset: serveSinglePageApp })
})

router.get('/api/*', () => {
  return new Response('Not Found.', { status: 404 })
})

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request, event))
})
