import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { nanoid } from 'nanoid'

const querySchema = z.object({
  page: z.string().optional().transform(v => parseInt(v || '1', 10)),
  limit: z.string().optional().transform(v => parseInt(v || '12', 10)),
  category: z.string().optional(),
  tag: z.string().optional(),
  author: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
  admin: z.string().optional().transform(v => v === 'true'),
  status: z.string().optional(),
  search: z.string().optional()
})

const postBodySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  category_id: z.string(),
  author_id: z.string().optional(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).default('draft'),
  published_at: z.string().optional(),
  reading_time: z.number().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  canonical_url: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export const Route = createFileRoute('/api/blog/posts')({
  server: {
    handlers: {
      GET: async ({ request, context }) => {
        const url = new URL(request.url)
        const params = querySchema.parse(Object.fromEntries(url.searchParams))
        
        const db = (context as any).env?.DB || (globalThis as any).DB
        
        if (!db) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: { code: 'DB_NOT_FOUND', message: 'Database binding missing' } 
          }), { status: 500, headers: { 'Content-Type': 'application/json' } })
        }

        try {
          // TODO: Check auth if params.admin is true
          
          let query = `SELECT p.*, a.name as author_name, c.name as category_name 
                       FROM blog_posts p
                       JOIN blog_authors a ON p.author_id = a.id
                       JOIN blog_categories c ON p.category_id = c.id
                       WHERE 1=1`
          const args: any[] = []

          if (!params.admin) {
            query += ` AND p.status = 'published'`
          } else if (params.status) {
            query += ` AND p.status = ?`
            args.push(params.status)
          }

          if (params.category) {
            query += ` AND c.slug = ?`
            args.push(params.category)
          }

          if (params.tag) {
            query += ` AND p.id IN (SELECT post_id FROM blog_post_tags pt JOIN blog_tags t ON pt.tag_id = t.id WHERE t.slug = ?)`
            args.push(params.tag)
          }

          if (params.search) {
            query += ` AND (p.title LIKE ? OR p.excerpt LIKE ? OR p.content LIKE ?)`
            const searchPattern = `%${params.search}%`
            args.push(searchPattern, searchPattern, searchPattern)
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
      },
      POST: async ({ request, context }) => {
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })

        try {
          // TODO: Check auth
          
          const body = await request.json()
          const data = postBodySchema.parse(body)
          
          // Check slug uniqueness
          const existing = await db.prepare("SELECT id FROM blog_posts WHERE slug = ?").bind(data.slug).first()
          if (existing) {
            return new Response(JSON.stringify({ success: false, error: { message: 'Slug already exists' } }), { status: 400 })
          }

          const id = nanoid()
          const now = new Date().toISOString()
          const author_id = data.author_id || (await db.prepare("SELECT id FROM blog_authors LIMIT 1").first())?.id
          
          if (!author_id) {
             return new Response(JSON.stringify({ success: false, error: { message: 'Author not found. Please create an author first.' } }), { status: 400 })
          }

          await db.prepare(`
            INSERT INTO blog_posts (
              id, author_id, category_id, title, slug, excerpt, content, 
              status, published_at, reading_time, seo_title, seo_description, canonical_url,
              created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            id, author_id, data.category_id, data.title, data.slug, data.excerpt || '', data.content,
            data.status, data.status === 'published' ? (data.published_at || now) : null,
            data.reading_time || 5, data.seo_title || null, data.seo_description || null, data.canonical_url || null,
            now, now
          ).run()

          // Handle tags
          if (data.tags && data.tags.length > 0) {
            for (const tagName of data.tags) {
              const tagSlug = tagName.toLowerCase().replace(/ /g, '-')
              let tag = await db.prepare("SELECT id FROM blog_tags WHERE slug = ?").bind(tagSlug).first()
              if (!tag) {
                const tagId = nanoid()
                await db.prepare("INSERT INTO blog_tags (id, name, slug) VALUES (?, ?, ?)").bind(tagId, tagName, tagSlug).run()
                tag = { id: tagId }
              }
              await db.prepare("INSERT INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)").bind(id, tag.id).run()
            }
          }

          const newPost = await db.prepare("SELECT * FROM blog_posts WHERE id = ?").bind(id).first()
          return new Response(JSON.stringify({ success: true, data: newPost }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
