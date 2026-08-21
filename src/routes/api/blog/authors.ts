import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/authors')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const { results } = await (db as any)
          .prepare('SELECT id, name, avatar, bio, twitter, github, website, role FROM blog_authors ORDER BY name ASC')
          .all()

        return Response.json({ success: true, data: results })
      },
      POST: async ({ request }) => {
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const body = await request.json()
        const id = crypto.randomUUID()

        await (db as any)
          .prepare(`
            INSERT INTO blog_authors (id, name, avatar, bio, twitter, github, website, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `)
          .bind(id, body.name, body.avatar || '', body.bio || '', body.twitter || '', body.github || '', body.website || '', body.role || 'Contributor')
          .run()

        return Response.json({ success: true, data: { id } })
      }
    }
  }
})
