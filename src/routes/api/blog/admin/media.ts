import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export const Route = createFileRoute('/api/blog/admin/media')({
  server: {
    handlers: {
      GET: async () => {
        // Return static assets from our manifest
        const { BLOG_ASSETS } = await import('@/data/blog-assets');
        
        const media = BLOG_ASSETS.map(asset => ({
          id: asset.id,
          filename: asset.filename,
          original_name: asset.name,
          mime_type: 'image/webp',
          file_size: 0,
          storage_provider: 'static',
          storage_key: asset.url,
          url: asset.url,
          alt_text: asset.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));

        return Response.json({ success: true, data: media });
      },

      POST: async () => {
        return Response.json({ 
          success: false, 
          error: { message: 'Uploads are disabled. Please add assets to the project manually.' } 
        }, { status: 405 });
      }
    }
  }
})
