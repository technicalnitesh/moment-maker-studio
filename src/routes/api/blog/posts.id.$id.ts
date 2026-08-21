import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

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

export const Route = createFileRoute('/api/blog/posts/id/$id')({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const { id } = params
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })

        const post = await db.prepare(`
          SELECT p.*, a.name as author_name, c.name as category_name
          FROM blog_posts p
          JOIN blog_authors a ON p.author_id = a.id
          JOIN blog_categories c ON p.category_id = c.id
          WHERE p.id = ?
        `).bind(id).first()

        if (!post) return new Response(JSON.stringify({ success: false, error: { message: 'Not found' } }), { status: 404 })

        const { results: tags } = await db.prepare(`
          SELECT t.* FROM blog_tags t JOIN blog_post_tags pt ON t.id = pt.tag_id WHERE pt.post_id = ?
        `).bind(id).all()

        return new Response(JSON.stringify({ success: true, data: { ...post, tags } }), { headers: { 'Content-Type': 'application/json' } })
      },
      PUT: async ({ params, request, context }) => {
        const { id } = params
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })

        try {
          const body = await request.json()
          const data = postBodySchema.parse(body)
          const now = new Date().toISOString()

          await db.prepare(`
            UPDATE blog_posts SET 
              title = ?, slug = ?, excerpt = ?, content = ?, category_id = ?, 
              status = ?, published_at = ?, reading_time = ?, 
              seo_title = ?, seo_description = ?, canonical_url = ?, updated_at = ?
            WHERE id = ?
          `).bind(
            data.title, data.slug, data.excerpt || '', data.content, data.category_id,
            data.status, data.status === 'published' ? (data.published_at || now) : null,
            data.reading_time || 5, data.seo_title || null, data.seo_description || null, data.canonical_url || null,
            now, id
          ).run()

          // Sync tags (delete all then re-insert)
          await db.prepare("DELETE FROM blog_post_tags WHERE post_id = ?").bind(id).run()
          if (data.tags) {
            for (const tagName of data.tags) {
              const tagSlug = tagName.toLowerCase().replace(/ /g, '-')
              let tag = await db.prepare("SELECT id FROM blog_tags WHERE slug = ?").bind(tagSlug).first()
              if (!tag) {
                const { nanoid } = await import('nanoid')
                const tagId = nanoid()
                await db.prepare("INSERT INTO blog_tags (id, name, slug) VALUES (?, ?, ?)").bind(tagId, tagName, tagSlug).run()
                tag = { id: tagId }
              }
              await db.prepare("INSERT INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)").bind(id, tag.id).run()
            }
          }

          const updated = await db.prepare("SELECT * FROM blog_posts WHERE id = ?").bind(id).first()
          return new Response(JSON.stringify({ success: true, data: updated }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      },
      DELETE: async ({ params, context }) => {
        const { id } = params
        const db = (context as any).env?.DB || (globalThis as any).DB
        if (!db) return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })

        await db.prepare("DELETE FROM blog_post_tags WHERE post_id = ?").bind(id).run()
        await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run()
        return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
      }
    }
  }
})
