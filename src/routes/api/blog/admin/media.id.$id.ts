import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/admin/media/id/$id')({
  server: {
    handlers: {
      DELETE: async ({ params, context }) => {
        const env = (context as any).env || (globalThis as any)
        const db = env.DB
        const bucket = env.BLOG_MEDIA
        
        if (!db || !bucket) {
          return new Response(JSON.stringify({ success: false, error: { message: 'Services missing' } }), { status: 500 })
        }

        try {
          // TODO: Auth check
          const id = params.id

          // Check if used in posts
          const usage = await db.prepare("SELECT id FROM blog_posts WHERE featured_image_id = ? LIMIT 1").bind(id).first()
          if (usage) {
            return new Response(JSON.stringify({ 
              success: false, 
              error: { message: 'This image is currently used by one or more articles.' } 
            }), { status: 400 })
          }

          // Get media info
          const media = await db.prepare("SELECT storage_key FROM blog_media WHERE id = ?").bind(id).first()
          if (!media) {
            return new Response(JSON.stringify({ success: false, error: { message: 'Media not found' } }), { status: 404 })
          }

          // Delete from R2
          await bucket.delete(media.storage_key)

          // Delete from D1
          await db.prepare("DELETE FROM blog_media WHERE id = ?").bind(id).run()

          return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      },
      PATCH: async ({ params, request, context }) => {
        const env = (context as any).env || (globalThis as any)
        const db = env.DB
        
        if (!db) {
          return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })
        }

        try {
          const id = params.id
          const { alt_text } = await request.json()
          
          await db.prepare("UPDATE blog_media SET alt_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
            .bind(alt_text, id)
            .run()

          return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
