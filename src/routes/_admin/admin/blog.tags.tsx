import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTags, createTag, updateTag, deleteTag } from '@/lib/blog'
import { Plus, Edit, Trash2, Tag as TagIcon, Save, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_admin/admin/blog/tags')({
  component: AdminTagsPage
})

function AdminTagsPage() {
  const queryClient = useQueryClient()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  })

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ['blog-tags'],
    queryFn: getTags
  })

  const createMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-tags'] })
      setIsAdding(false)
      setFormData({ name: '', slug: '' })
      toast.success('Tag created')
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string, data: any }) => updateTag(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-tags'] })
      setEditingId(null)
      toast.success('Tag updated')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-tags'] })
      toast.success('Tag deleted')
    }
  })

  const handleEdit = (tag: any) => {
    setEditingId(tag.slug)
    setFormData({
      name: tag.name,
      slug: tag.slug
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({ name: '', slug: '' })
  }

  const handleSave = () => {
    if (editingId) {
      updateMutation.mutate({ slug: editingId, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
        {!isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            New Tag
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-900 border border-primary/20 rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          <h3 className="text-lg font-semibold">{editingId ? 'Edit Tag' : 'New Tag'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Tag name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                placeholder="tag-slug"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={handleCancel} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Save size={16} />
              {editingId ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tag</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={3} className="px-6 py-8 h-16 bg-white/5"></td>
                </tr>
              ))
            ) : tags.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  No tags found.
                </td>
              </tr>
            ) : (
              tags.map((tag: any) => (
                <tr key={tag.slug} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <TagIcon size={16} />
                      </div>
                      <span className="font-medium text-white">{tag.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-500">{tag.slug}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(tag)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => deleteMutation.mutate(tag.slug)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
