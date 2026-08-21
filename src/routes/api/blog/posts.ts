import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/api/blog/posts')({
  server: {
    handlers: {
      GET: async ({ request, context }) => {
        const url = new URL(request.url)
        const category = url.searchParams.get('category')
        const tag = url.searchParams.get('tag')
        const status = url.searchParams.get('status')
        const admin = url.searchParams.get('admin') === 'true'
        const page = parseInt(url.searchParams.get('page') || '1')
        const limit = parseInt(url.searchParams.get('limit') || '10')
        const offset = (page - 1) * limit

        // @ts-ignore
        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response('DB not bound', { status: 500 })

        let query = `
          SELECT p.*, 
                 c.name as category_name, c.slug as category_slug,
                 a.name as author_name, a.avatar as author_avatar
          FROM blog_posts p
          LEFT JOIN blog_categories c ON p.category_id = c.id
          LEFT JOIN blog_authors a ON p.author_id = a.id
          WHERE 1=1
        `
        const params: any[] = []

        if (!admin) {
          query += " AND p.status = 'published'"
        } else if (status) {
          query += " AND p.status = ?"
          params.push(status)
        }

        if (category) {
          query += " AND (c.slug = ? OR c.id = ?)"
          params.push(category, category)
        }

        if (tag) {
          query += " AND p.id IN (SELECT post_id FROM blog_post_tags pt JOIN blog_tags t ON pt.tag_id = t.id WHERE t.slug = ?)"
          params.push(tag)
        }

        query += " ORDER BY p.published_at DESC LIMIT ? OFFSET ?"
        params.push(limit, offset)

        const { results } = await (db as any).prepare(query).bind(...params).all()

        // Fetch tags for each post
        const postsWithTags = await Promise.all(results.map(async (post: any) => {
          const { results: tags } = await (db as any)
            .prepare(`
              SELECT t.name, t.slug 
              FROM blog_tags t 
              JOIN blog_post_tags pt ON t.id = pt.tag_id 
              WHERE pt.post_id = ?
            `)
            .bind(post.id)
            .all()
          
          return {
            ...post,
            tags,
            featured_image_url: post.featured_image || post.featured_image_url || "/placeholder.svg"
          }
        }))

        return Response.json({
          success: true,
          data: postsWithTags,
          pagination: { page, limit }
        })
      },

      POST: async ({ request, context }) => {
        // @ts-ignore
        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const body = await request.json()
        const id = crypto.randomUUID()

        await (db as any)
          .prepare(`
            INSERT INTO blog_posts (
              id, title, slug, excerpt, content, category_id, author_id, 
              featured_image, status, published_at, reading_time,
              seo_title, seo_description, canonical_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `)
          .bind(
            id, body.title, body.slug, body.excerpt, body.content, body.category_id, body.author_id,
            body.featured_image || body.featured_image_id || null, body.status || 'draft', 
            body.published_at || new Date().toISOString(),
            body.reading_time || 5, body.seo_title, body.seo_description, body.canonical_url
          )
          .run()

        // Handle tags
        if (body.tags && Array.isArray(body.tags)) {
          for (const tagName of body.tags) {
            // Find or create tag
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

        return Response.json({ success: true, data: { id } })
      }
    }
  }
})
