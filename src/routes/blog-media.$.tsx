import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog-media/$')({
  server: {
    handlers: {
      GET: async ({ request, context, params }) => {
        const env = (context as any).env || (globalThis as any)
        const bucket = env.BLOG_MEDIA
        
        if (!bucket) {
          return new Response('Bucket not configured', { status: 500 })
        }

        // In TanStack Router, splat parameter for /blog-media/$ is typically in params._splat
        const key = (params as any)._splat
        if (!key) {
          return new Response('Not found', { status: 404 })
        }

        const object = await bucket.get(key)

        if (!object) {
          return new Response('Not found', { status: 404 })
        }

        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cache-Control', 'public, max-age=31536000, immutable')

        return new Response(object.body, {
          headers,
        })
      }
    }
  }
})
