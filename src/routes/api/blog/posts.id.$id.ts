import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/api/blog/posts/id/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const post = await (db as any)
          .prepare(`
            SELECT p.*, 
                   c.name as category_name, c.slug as category_slug,
                   a.name as author_name, a.avatar as author_avatar
            FROM blog_posts p
            LEFT JOIN blog_categories c ON p.category_id = c.id
            LEFT JOIN blog_authors a ON p.author_id = a.id
            WHERE p.id = ?
          `)
          .bind(id)
          .first()

        if (!post) {
          return Response.json({ success: false, error: { message: 'Post not found' } }, { status: 404 })
        }

        const { results: tags } = await (db as any)
          .prepare(`
            SELECT t.name, t.slug 
            FROM blog_tags t 
            JOIN blog_post_tags pt ON t.id = pt.tag_id 
            WHERE pt.post_id = ?
          `)
          .bind(id)
          .all()

        return Response.json({
          success: true,
          data: {
            ...post,
            tags,
            featured_image_url: post.featured_image || post.featured_image_url || "/placeholder.svg"
          }
        })
      },

      PUT: async ({ request, params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const body = await request.json()

        await (db as any)
          .prepare(`
            UPDATE blog_posts SET
              title = ?, slug = ?, excerpt = ?, content = ?, category_id = ?, 
              author_id = ?, featured_image = ?, status = ?, reading_time = ?,
              seo_title = ?, seo_description = ?, canonical_url = ?,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `)
          .bind(
            body.title, body.slug, body.excerpt, body.content, body.category_id,
            body.author_id, body.featured_image || body.featured_image_id || null, 
            body.status, body.reading_time,
            body.seo_title, body.seo_description, body.canonical_url,
            id
          )
          .run()

        // Sync tags: Delete existing and re-add
        await (db as any).prepare('DELETE FROM blog_post_tags WHERE post_id = ?').bind(id).run()

        if (body.tags && Array.isArray(body.tags)) {
          for (const tagName of body.tags) {
            const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            let tag = await (db as any).prepare('SELECT id FROM blog_tags WHERE name = ?').bind(tagName).first()
            
            if (!tag) {
              const tagId = crypto.randomUUID()
              await (db as any).prepare('INSERT INTO blog_tags (id, name, slug) VALUES (?, ?, ?)').bind(tagId, tagName, tagSlug).run()
              tag = { id: tagId }
            }

            await (db as any).prepare('INSERT INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)').bind(id, tag.id).run()
          }
        }

        return Response.json({ success: true })
      },

      DELETE: async ({ params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        await (db as any).prepare('DELETE FROM blog_post_tags WHERE post_id = ?').bind(id).run()
        await (db as any).prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run()

        return Response.json({ success: true })
      }
    }
  }
})
