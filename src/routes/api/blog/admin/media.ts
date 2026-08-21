import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export const Route = createFileRoute('/api/blog/admin/media')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // @ts-ignore
        const db = process.env.DB
        if (!db) return new Response('DB not bound', { status: 500 })

        const { results } = await (db as any)
          .prepare('SELECT * FROM blog_media ORDER BY created_at DESC')
          .all()

        const media = results.map((m: any) => ({
          ...m,
          url: `/blog-media/${m.storage_key}`
        }))

        return Response.json({ success: true, data: media })
      },

      POST: async ({ request }) => {
        // @ts-ignore
        const db = process.env.DB
        // @ts-ignore
        const bucket = process.env.BLOG_MEDIA
        
        if (!db || !bucket) return new Response('Infrastructure not bound', { status: 500 })

        const formData = await request.formData()
        const file = formData.get('file') as File
        const altText = formData.get('altText') as string || ''

        if (!file) {
          return Response.json({ success: false, error: { message: 'No file uploaded' } }, { status: 400 })
        }

        // Validate file type and size (5MB limit)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
        if (!allowedTypes.includes(file.type)) {
          return Response.json({ success: false, error: { message: 'Invalid file type' } }, { status: 400 })
        }
        if (file.size > 5 * 1024 * 1024) {
          return Response.json({ success: false, error: { message: 'File too large (max 5MB)' } }, { status: 400 })
        }

        const id = uuidv4()
        const extension = file.name.split('.').pop()
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const storageKey = `blog/${year}/${month}/${id}.${extension}`

        // Upload to R2
        await (bucket as any).put(storageKey, file.stream(), {
          httpMetadata: { contentType: file.type }
        })

        // Save to D1
        await (db as any)
          .prepare(`
            INSERT INTO blog_media (
              id, filename, original_name, mime_type, file_size, 
              storage_provider, storage_key, alt_text
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `)
          .bind(
            id, file.name, file.name, file.type, file.size,
            'r2', storageKey, altText
          )
          .run()

        const newMedia = {
          id,
          filename: file.name,
          original_name: file.name,
          mime_type: file.type,
          file_size: file.size,
          storage_provider: 'r2',
          storage_key: storageKey,
          alt_text: altText,
          url: `/blog-media/${storageKey}`,
          created_at: now.toISOString(),
          updated_at: now.toISOString()
        }

        return Response.json({ success: true, data: newMedia })
      }
    }
  }
})
