import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/authors/id/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const author = await (db as any)
          .prepare('SELECT * FROM blog_authors WHERE id = ?')
          .bind(id)
          .first()

        if (!author) {
          return Response.json({ success: false, error: { message: 'Author not found' } }, { status: 404 })
        }

        return Response.json({ success: true, data: author })
      },
      PUT: async ({ request, params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const body = await request.json()

        await (db as any)
          .prepare(`
            UPDATE blog_authors SET
              name = ?, avatar = ?, bio = ?, twitter = ?, github = ?, website = ?, role = ?,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `)
          .bind(body.name, body.avatar, body.bio, body.twitter, body.github, body.website, body.role, id)
          .run()

        return Response.json({ success: true })
      },
      DELETE: async ({ params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        // Check if author has posts
        const hasPosts = await (db as any)
          .prepare('SELECT id FROM blog_posts WHERE author_id = ? LIMIT 1')
          .bind(id)
          .first()

        if (hasPosts) {
          return Response.json({ 
            success: false, 
            error: { message: 'Cannot delete author with existing blog posts.' } 
          }, { status: 400 })
        }

        await (db as any).prepare('DELETE FROM blog_authors WHERE id = ?').bind(id).run()

        return Response.json({ success: true })
      }
    }
  }
})
