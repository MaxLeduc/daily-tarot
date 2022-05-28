import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { Router } from 'itty-router'
import List from './models/List'

const router = Router()

const getStandardResponse = (data: any[] | null) => {
  const headers: { [key: string]: string } = {
    'Content-type': 'application/json',
  }

  if (ENV === 'dev') {
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  }

  return new Response(JSON.stringify({ data: data }), { headers })
}

router.get('/api/lists/:id', async request => {
  const params = request.params

  if (!params || !params?.id) {
    return new Response('Param `id` is missing', { status: 400 })
  }

  const data = await new List().get(params.id)

  return getStandardResponse(data)
})

router.get('/api/lists', async () => {
  const data = await new List().getAll()

  return getStandardResponse(data)
})

router.get('/api/lists/:id/tasks', async request => {
  const params = request.params

  if (!params || !params.id) {
    return new Response('Param `id` is missing', { status: 400 })
  }

  const data = await new List().getListTasks(params.id)

  return getStandardResponse(data)
})

router.get('/assets/*', async (request, event: FetchEvent) => {
  return await getAssetFromKV(event)
})

router.get('/', async (request, event: FetchEvent) => {
  return await getAssetFromKV(event)
})

router.get('/*', () => {
  return new Response('Not Found.', { status: 404 })
})

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request, event))
})
