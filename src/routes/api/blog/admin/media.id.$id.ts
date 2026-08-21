import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/admin/media/id/$id')({
  server: {
    handlers: {
      PATCH: async ({ request, params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const { alt_text } = await request.json()

        await (db as any)
          .prepare('UPDATE blog_media SET alt_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
          .bind(alt_text, id)
          .run()

        return Response.json({ success: true })
      },

      DELETE: async ({ params }) => {
        const { id } = params
        // @ts-ignore
        const db = process.env.DB
        // @ts-ignore
        const bucket = process.env.BLOG_MEDIA
        if (!db || !bucket) return new Response('Infrastructure not bound', { status: 500 })

        // Check if media is used as featured image
        const used = await (db as any)
          .prepare('SELECT id, title FROM blog_posts WHERE featured_image_id = ?')
          .bind(id)
          .first()

        if (used) {
          return Response.json({ 
            success: false, 
            error: { message: `Cannot delete: Media is used as featured image in article "${used.title}"` } 
          }, { status: 400 })
        }

        // Get storage key
        const media = await (db as any)
          .prepare('SELECT storage_key FROM blog_media WHERE id = ?')
          .bind(id)
          .first()

        if (!media) {
          return Response.json({ success: false, error: { message: 'Media not found' } }, { status: 404 })
        }

        // Delete from R2
        await (bucket as any).delete(media.storage_key)

        // Delete from D1
        await (db as any)
          .prepare('DELETE FROM blog_media WHERE id = ?')
          .bind(id)
          .run()

        return Response.json({ success: true })
      }
    }
  }
})
