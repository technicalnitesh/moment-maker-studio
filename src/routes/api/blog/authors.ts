import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/api/blog/authors')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // @ts-ignore
        const db = (request as any).context?.env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response('DB not bound', { status: 500 })

        try {
          const { results } = await (db as any)
            .prepare('SELECT id, name, slug, avatar, bio, website, role FROM blog_authors ORDER BY name ASC')
            .all()

          return Response.json({ success: true, data: results })
        } catch (error: any) {
          console.error('Error fetching authors:', error)
          return new Response(JSON.stringify({ 
            success: false, 
            error: { message: error.message } 
          }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          })
        }
      },
      POST: async ({ request }) => {
        // @ts-ignore
        const db = (request as any).context?.env?.DB || (process.env as any).DB || (globalThis as any).DB
        if (!db) return new Response('DB not bound', { status: 500 })

        try {
          const body = await request.json()
          const id = crypto.randomUUID()
          const slug = body.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')

          await (db as any)
            .prepare(`
              INSERT INTO blog_authors (id, name, slug, avatar, bio, website, role)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `)
            .bind(id, body.name, slug, body.avatar || '', body.bio || '', body.website || '', body.role || 'Contributor')
            .run()

          return Response.json({ success: true, data: { id } })
        } catch (error: any) {
          console.error('Error creating author:', error)
          return new Response(JSON.stringify({ 
            success: false, 
            error: { message: error.message } 
          }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }
    }
  }
})

