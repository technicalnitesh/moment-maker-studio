import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/categories')({
  server: {
    handlers: {
      GET: async ({ context }) => {
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response('DB missing', { status: 500 })

        try {
          const { results } = await db.prepare('SELECT * FROM blog_categories ORDER BY name ASC').all()
          return new Response(JSON.stringify({ success: true, data: results }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
