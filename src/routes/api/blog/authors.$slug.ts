import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/authors/$slug')({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const { slug } = params
        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response('DB missing', { status: 500 })

        try {
          const author = await db.prepare('SELECT id, name, slug, bio, avatar, website, social_links FROM blog_authors WHERE slug = ?').bind(slug).first()
          if (!author) {
            return new Response(JSON.stringify({ success: false, error: { code: 'AUTHOR_NOT_FOUND', message: 'Author not found' } }), { status: 404 })
          }

          const { results: posts } = await db.prepare(`
            SELECT p.*, c.name as category_name
            FROM blog_posts p
            JOIN blog_categories c ON p.category_id = c.id
            WHERE p.author_id = ? AND p.status = 'published'
            ORDER BY p.published_at DESC
            LIMIT 12
          `).bind(author.id).all()

          return new Response(JSON.stringify({ 
            success: true, 
            data: { ...author, posts } 
          }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
