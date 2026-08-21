import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog-media/$')({
  loader: async ({ params, context }) => {
    // This runs on the server (Worker)
    const key = params['_']
    
    // @ts-ignore - The BLOG_MEDIA binding is available in the Worker environment
    const bucket = process.env.BLOG_MEDIA
    
    if (!bucket) {
      return new Response('Bucket not configured', { status: 500 })
    }

    const object = await (bucket as any).get(key)

    if (!object) {
      return new Response('Not Found', { status: 404 })
    }

    const headers = new Headers()
    object.writeHttpMetadata(headers)
    headers.set('etag', object.httpEtag)
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    return new Response(object.body, {
      headers
    })
  }
})
