import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional().transform(v => parseInt(v || '1', 10)),
  limit: z.string().optional().transform(v => parseInt(v || '12', 10)),
  category: z.string().optional(),
  tag: z.string().optional(),
  author: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).default('latest')
})

export const Route = createFileRoute('/api/blog/posts')({
  server: {
    handlers: {
      GET: async ({ request, context }) => {
        const url = new URL(request.url)
        const params = querySchema.parse(Object.fromEntries(url.searchParams))
        
        // In TanStack Start on Cloudflare, the D1 binding is typically available in context
        // if configured in wrangler.toml and correctly mapped by the adapter.
        const db = (context as any).env?.DB || (globalThis as any).DB
        
        if (!db) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: { code: 'DB_NOT_FOUND', message: 'Database binding missing' } 
          }), { status: 500, headers: { 'Content-Type': 'application/json' } })
        }

        try {
          let query = `SELECT p.*, a.name as author_name, c.name as category_name 
                       FROM blog_posts p
                       JOIN blog_authors a ON p.author_id = a.id
                       JOIN blog_categories c ON p.category_id = c.id
                       WHERE p.status = 'published'`
          const args: any[] = []

          if (params.category) {
            query += ` AND c.slug = ?`
            args.push(params.category)
          }

          if (params.tag) {
            query += ` AND p.id IN (SELECT post_id FROM blog_post_tags pt JOIN blog_tags t ON pt.tag_id = t.id WHERE t.slug = ?)`
            args.push(params.tag)
          }

          if (params.author) {
            query += ` AND a.slug = ?`
            args.push(params.author)
          }

          const offset = (params.page - 1) * params.limit
          const orderBy = params.sort === 'latest' ? 'DESC' : 'ASC'
          
          const countQuery = `SELECT COUNT(*) as total FROM (${query})`
          const totalRes = await db.prepare(countQuery).bind(...args).first()
          const total = totalRes.total

          query += ` ORDER BY p.published_at ${orderBy} LIMIT ? OFFSET ?`
          args.push(params.limit, offset)

          const { results } = await db.prepare(query).bind(...args).all()

          return new Response(JSON.stringify({
            success: true,
            data: results,
            pagination: {
              page: params.page,
              limit: params.limit,
              total,
              totalPages: Math.ceil(total / params.limit)
            }
          }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: { code: 'SERVER_ERROR', message: e.message } 
          }), { status: 500, headers: { 'Content-Type': 'application/json' } })
        }
      }
    }
  }
})
