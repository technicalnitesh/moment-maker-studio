import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/categories/$slug')({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const { slug } = params
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response('DB missing', { status: 500 })

        try {
          const category = await db.prepare('SELECT * FROM blog_categories WHERE slug = ?').bind(slug).first()
          if (!category) {
            return new Response(JSON.stringify({ success: false, error: { code: 'CATEGORY_NOT_FOUND', message: 'Category not found' } }), { status: 404 })
          }
          return new Response(JSON.stringify({ success: true, data: category }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
