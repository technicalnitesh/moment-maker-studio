import { createFileRoute } from '@tanstack/react-router'
import { BlogEditor } from '@/blog/components/BlogEditor'
import { createPost } from '@/lib/blog'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/blog/posts/new')({
  component: NewArticlePage
})

function NewArticlePage() {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    try {
      await createPost(data)
      toast.success('Article created successfully')
      navigate({ to: '/admin/blog/posts' })
    } catch (error: any) {
      toast.error(error.message || 'Failed to create article')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">New Article</h1>
      </div>
      
      <BlogEditor onSubmit={handleSubmit} />
    </div>
  )
}
