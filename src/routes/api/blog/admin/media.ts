import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { nanoid } from 'nanoid'

const uploadSchema = z.object({
  altText: z.string().optional()
})

export const Route = createFileRoute('/api/blog/admin/media')({
  server: {
    handlers: {
      GET: async ({ request, context }) => {
        const env = (context as any).env || (globalThis as any)
        const db = env.DB
        
        if (!db) {
          return new Response(JSON.stringify({ success: false, error: { message: 'DB missing' } }), { status: 500 })
        }

        try {
          // TODO: Auth check
          const { results } = await db.prepare("SELECT * FROM blog_media ORDER BY created_at DESC").all()
          
          return new Response(JSON.stringify({
            success: true,
            data: results
          }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      },
      POST: async ({ request, context }) => {
        const env = (context as any).env || (globalThis as any)
        const db = env.DB
        const bucket = env.BLOG_MEDIA
        
        if (!db || !bucket) {
          return new Response(JSON.stringify({ success: false, error: { message: 'Services missing' } }), { status: 500 })
        }

        try {
          // TODO: Auth check
          
          const formData = await request.formData()
          const file = formData.get('file') as File
          const altText = formData.get('altText') as string || ''

          if (!file) {
            return new Response(JSON.stringify({ success: false, error: { message: 'No file uploaded' } }), { status: 400 })
          }

          // Validation
          const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
          if (!allowedTypes.includes(file.type)) {
            return new Response(JSON.stringify({ success: false, error: { message: 'Unsupported file type' } }), { status: 400 })
          }

          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            return new Response(JSON.stringify({ success: false, error: { message: 'File too large (max 5MB)' } }), { status: 400 })
          }

          const id = nanoid()
          const now = new Date()
          const year = now.getFullYear()
          const month = String(now.getMonth() + 1).padStart(2, '0')
          const extension = file.name.split('.').pop()
          const storageKey = `blog/${year}/${month}/${id}.${extension}`

          // Upload to R2
          await bucket.put(storageKey, file.stream(), {
            httpMetadata: { contentType: file.type }
          })

          const publicUrl = `/blog-media/${storageKey}`

          // Record in D1
          await db.prepare(`
            INSERT INTO blog_media (
              id, filename, original_name, mime_type, file_size, 
              storage_provider, storage_key, url, alt_text, 
              created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `).bind(
            id, `${id}.${extension}`, file.name, file.type, file.size,
            'r2', storageKey, publicUrl, altText
          ).run()

          const newMedia = await db.prepare("SELECT * FROM blog_media WHERE id = ?").bind(id).first()
          
          return new Response(JSON.stringify({
            success: true,
            data: newMedia
          }), { headers: { 'Content-Type': 'application/json' } })
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: { message: e.message } }), { status: 500 })
        }
      }
    }
  }
})
