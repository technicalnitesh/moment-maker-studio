import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/api/blog/categories')({
  server: {
    handlers: {
      GET: async ({ context }) => {
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })
        const { results } = await db.prepare("SELECT * FROM blog_categories ORDER BY name ASC").all()
        return new Response(JSON.stringify({ success: true, data: results }), { headers: { 'Content-Type': 'application/json' } })
      },
      POST: async ({ request, context }) => {
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })
        try {
          const data = await request.json()
          const { nanoid } = await import('nanoid')
          const id = nanoid()
          const now = new Date().toISOString()
          await db.prepare("INSERT INTO blog_categories (id, name, slug, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
            .bind(id, data.name, data.slug, data.description || '', now, now).run()
          const category = await db.prepare("SELECT * FROM blog_categories WHERE id = ?").bind(id).first()
          return new Response(JSON.stringify({ success: true, data: category }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
