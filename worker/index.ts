import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { Router } from 'itty-router'
import List from './models/List'

const router = Router()

router.get('/api/lists/:id', async request => {
  const params = request.params

  if (!params || !params?.id) {
    return new Response('Param `id` is missing', { status: 400 })
  }

  const data = await new List().get(params.id)

  return new Response(JSON.stringify({ data }))
})

router.get('/api/lists', async () => {
  const data = await new List().getAll()
  const headers: { [key: string]: string } = {}

  // todo: abstract into a get response utility function
  if (ENV === 'dev') {
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    headers['Content-type'] = 'application/json'
  }

  return new Response(JSON.stringify({ data }), { headers })
})

router.get('/api/todos/:id', request => {
  const params = request.params

  return new Response(`Id is ${params?.id}`)
})

router.post('/api/todos', request => {})

router.get('/', async (request, event: FetchEvent) => {
  return await getAssetFromKV(event)
})

router.get('/assets/*', async (request, event: FetchEvent) => {
  return await getAssetFromKV(event)
})

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request, event))
})
