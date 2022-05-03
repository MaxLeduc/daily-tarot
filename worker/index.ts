/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request: Request) {
  return new Response('Hello worker!!!', {
    headers: { 'content-type': 'text/plain' },
  })
}

addEventListener('fetch', event => {
  console.log('hey')
  event.respondWith(handleRequest(event.request))
})
