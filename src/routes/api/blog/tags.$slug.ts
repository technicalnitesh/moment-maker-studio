import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/tags/$slug')({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const { slug } = params
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response('DB missing', { status: 500 })

        try {
          const tag = await db.prepare('SELECT * FROM blog_tags WHERE slug = ?').bind(slug).first()
          if (!tag) {
            return new Response(JSON.stringify({ success: false, error: { code: 'TAG_NOT_FOUND', message: 'Tag not found' } }), { status: 404 })
          }
          return new Response(JSON.stringify({ success: true, data: tag }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
