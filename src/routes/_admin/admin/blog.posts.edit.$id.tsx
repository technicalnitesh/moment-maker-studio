import { createFileRoute } from '@tanstack/react-router'
import { BlogEditor } from '@/blog/components/BlogEditor'
import { getPostById, updatePost } from '@/lib/blog'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_admin/admin/blog/posts/edit/$id')({
  component: EditArticlePage
})

function EditArticlePage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data: post, isLoading } = useQuery({
    queryKey: ['admin-post', id],
    queryFn: () => getPostById(id)
  })

  const handleSubmit = async (data: any) => {
    try {
      await updatePost(id, data)
      toast.success('Article updated successfully')
      navigate({ to: '/admin/blog/posts' })
    } catch (error: any) {
      toast.error(error.message || 'Failed to update article')
    }
  }

  if (isLoading) return <div>Loading article...</div>
  if (!post) return <div>Article not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Edit Article</h1>
      </div>
      
      <BlogEditor initialData={post} onSubmit={handleSubmit} isEditing />
    </div>
  )
}
