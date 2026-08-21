import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const querySchema = z.object({
  q: z.string().min(1)
})

export const Route = createFileRoute('/api/blog/search')({
  server: {
    handlers: {
      GET: async ({ request, context }) => {
        const url = new URL(request.url)
        const result = querySchema.safeParse({ q: url.searchParams.get('q') })
        
        if (!result.success) {
          return new Response(JSON.stringify({ success: false, error: { code: 'INVALID_QUERY', message: 'Query string q is required' } }), { status: 400 })
        }

        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response('DB missing', { status: 500 })

        try {
          const searchTerm = `%${result.data.q}%`
          const { results } = await db.prepare(`
            SELECT p.*, c.name as category_name
            FROM blog_posts p
            JOIN blog_categories c ON p.category_id = c.id
            WHERE p.status = 'published' AND (
              p.title LIKE ? OR 
              p.excerpt LIKE ? OR 
              p.content LIKE ? OR
              c.name LIKE ?
            )
            ORDER BY p.published_at DESC
            LIMIT 20
          `).bind(searchTerm, searchTerm, searchTerm, searchTerm).all()

          return new Response(JSON.stringify({ success: true, data: results }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
