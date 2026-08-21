import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/tags/$slug')({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })
        const tag = await db.prepare("SELECT * FROM blog_tags WHERE slug = ?").bind(params.slug).first()
        if (!tag) return new Response(JSON.stringify({ success: false, error: { message: 'Not found' } }), { status: 404 })
        return new Response(JSON.stringify({ success: true, data: tag }), { headers: { 'Content-Type': 'application/json' } })
      },
      PUT: async ({ params, request, context }) => {
        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })
        try {
          const data = await request.json()
          const now = new Date().toISOString()
          await db.prepare("UPDATE blog_tags SET name = ?, slug = ?, updated_at = ? WHERE slug = ?")
            .bind(data.name, data.slug, now, params.slug).run()
          const updated = await db.prepare("SELECT * FROM blog_tags WHERE slug = ?").bind(data.slug).first()
          return new Response(JSON.stringify({ success: true, data: updated }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      },
      DELETE: async ({ params, context }) => {
        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })
        await db.prepare("DELETE FROM blog_post_tags WHERE tag_id = (SELECT id FROM blog_tags WHERE slug = ?)").bind(params.slug).run()
        await db.prepare("DELETE FROM blog_tags WHERE slug = ?").bind(params.slug).run()
        return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
      }
    }
  }
})
