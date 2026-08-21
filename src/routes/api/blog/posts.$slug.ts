import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/posts/$slug')({
  server: {
    handlers: {
      GET: async ({ params, context }) => {
        const { slug } = params
        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB
        
        if (!db) {
          return new Response(JSON.stringify({ success: false, error: { code: 'DB_NOT_FOUND', message: 'DB missing' } }), { status: 500 })
        }

        try {
          const post = await db.prepare(`
            SELECT p.*, a.name as author_name, a.bio as author_bio, a.avatar as author_avatar, c.name as category_name
            FROM blog_posts p
            JOIN blog_authors a ON p.author_id = a.id
            JOIN blog_categories c ON p.category_id = c.id
            WHERE p.slug = ? AND p.status = 'published'
          `).bind(slug).first()

          if (!post) {
            return new Response(JSON.stringify({ success: false, error: { code: 'POST_NOT_FOUND', message: 'Post not found' } }), { status: 404 })
          }

          // Get tags
          const { results: tags } = await db.prepare(`
            SELECT t.* FROM blog_tags t
            JOIN blog_post_tags pt ON t.id = pt.tag_id
            WHERE pt.post_id = ?
          `).bind(post.id).all()

          // Get related posts (same category)
          const { results: related } = await db.prepare(`
            SELECT id, title, slug, excerpt, published_at 
            FROM blog_posts 
            WHERE category_id = ? AND id != ? AND status = 'published'
            LIMIT 3
          `).bind(post.category_id, post.id).all()

          return new Response(JSON.stringify({
            success: true,
            data: { ...post, tags, related }
          }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { code: 'SERVER_ERROR', message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
