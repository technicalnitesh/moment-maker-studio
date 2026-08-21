import { createFileRoute } from '@tanstack/react-router'
import { MediaLibrary } from '@/blog/components/MediaLibrary'

export const Route = createFileRoute('/_admin/admin/blog/media')({
  component: MediaLibraryPage
})

function MediaLibraryPage() {
  return (
    <div className="space-y-6 h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
      </div>
      
      <MediaLibrary />
    </div>
  )
}
