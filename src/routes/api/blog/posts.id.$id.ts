import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const postBodySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  category_id: z.string(),
  author_id: z.string().optional(),
  featured_image_id: z.string().nullable().optional(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']).default('draft'),
  published_at: z.string().nullable().optional(),
  reading_time: z.number().optional(),
  seo_title: z.string().nullable().optional(),
  seo_description: z.string().nullable().optional(),
  canonical_url: z.string().nullable().optional(),
  tags: z.array(z.string()).optional()
})

export const Route = createFileRoute('/api/blog/posts/id/$id')({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const env = (context as any).env || (globalThis as any)
        const db = env.DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })

        try {
          const post = await db.prepare(`
            SELECT p.*, a.name as author_name, a.avatar as author_avatar, 
                   c.name as category_name, m.url as featured_image_url, m.alt_text as featured_image_alt
            FROM blog_posts p
            LEFT JOIN blog_authors a ON p.author_id = a.id
            LEFT JOIN blog_categories c ON p.category_id = c.id
            LEFT JOIN blog_media m ON p.featured_image_id = m.id
            WHERE p.id = ?
          `).bind(params.id).first()

          if (!post) {
            return new Response(JSON.stringify({ success: false, error: { message: 'Post not found' } }), { status: 404 })
          }

          const tags = await db.prepare(`
            SELECT t.name FROM blog_tags t
            JOIN blog_post_tags pt ON t.id = pt.tag_id
            WHERE pt.post_id = ?
          `).bind(params.id).all()
          
          post.tags = tags.results

          return new Response(JSON.stringify({ success: true, data: post }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      },
      PUT: async ({ params, request, context }) => {
        const env = (context as any).env || (globalThis as any)
        const db = env.DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })

        try {
          // TODO: Auth check
          
          const body = await request.json()
          const data = postBodySchema.parse(body)
          const now = new Date().toISOString()
          
          await db.prepare(`
            UPDATE blog_posts SET 
              title = ?, slug = ?, excerpt = ?, content = ?, 
              category_id = ?, featured_image_id = ?, status = ?, 
              published_at = ?, reading_time = ?, seo_title = ?, 
              seo_description = ?, canonical_url = ?, updated_at = ?
            WHERE id = ?
          `).bind(
            data.title, data.slug, data.excerpt || '', data.content,
            data.category_id, data.featured_image_id || null, data.status,
            data.status === 'published' ? (data.published_at || now) : null,
            data.reading_time || 5, data.seo_title || null, data.seo_description || null, data.canonical_url || null,
            now, params.id
          ).run()

          // Sync tags
          await db.prepare("DELETE FROM blog_post_tags WHERE post_id = ?").bind(params.id).run()
          if (data.tags && data.tags.length > 0) {
            for (const tagName of data.tags) {
              const tagSlug = tagName.toLowerCase().replace(/ /g, '-')
              let tag = await db.prepare("SELECT id FROM blog_tags WHERE slug = ?").bind(tagSlug).first()
              if (!tag) {
                const tagId = crypto.randomUUID()
                await db.prepare("INSERT INTO blog_tags (id, name, slug) VALUES (?, ?, ?)").bind(tagId, tagName, tagSlug).run()
                tag = { id: tagId }
              }
              await db.prepare("INSERT INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)").bind(params.id, tag.id).run()
            }
          }

          return new Response(JSON.stringify({ success: true, data: { id: params.id } }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      },
      DELETE: async ({ params, context }) => {
        const env = (context as any).env || (globalThis as any)
        const db = env.DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })

        try {
          // TODO: Auth check
          await db.prepare("DELETE FROM blog_post_tags WHERE post_id = ?").bind(params.id).run()
          await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(params.id).run()
          return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
