import { createFileRoute } from '@tanstack/react-router'
import { MediaLibrary } from '@/blog/components/MediaLibrary'

export const Route = createFileRoute('/_admin/admin/blog/media')({
  component: MediaLibraryPage
})

function MediaLibraryPage() {
  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Media Library</h1>
        <p className="text-gray-400">Upload and manage images for your blog posts.</p>
      </div>
      <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden h-full">
        <MediaLibrary />
      </div>
    </div>
  )
}
