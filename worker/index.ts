import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request: Request) {
  return new Response('Hello worker!!!', {
    headers: { 'content-type': 'text/plain' },
  })
}

async function handleEvent(event: FetchEvent) {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    let pathname = new URL(event.request.url).pathname
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: 'not found',
    })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})
