import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '@/lib/blog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, User, Twitter, Github, Globe, X, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_admin/admin/blog/authors')({
  component: AdminAuthorsPage
})

function AdminAuthorsPage() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<any | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    bio: '',
    role: 'Contributor',
    twitter: '',
    github: '',
    website: ''
  })

  const { data: authors = [], isLoading } = useQuery({
    queryKey: ['blog-authors'],
    queryFn: getAuthors
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => createAuthor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-authors'] })
      setIsModalOpen(false)
      toast.success('Author created')
    },
    onError: (err: any) => toast.error(err.message)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updateAuthor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-authors'] })
      setIsModalOpen(false)
      setEditingAuthor(null)
      toast.success('Author updated')
    },
    onError: (err: any) => toast.error(err.message)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-authors'] })
      toast.success('Author deleted')
    },
    onError: (err: any) => toast.error(err.message)
  })

  const handleEdit = (author: any) => {
    setEditingAuthor(author)
    setFormData({
      name: author.name,
      avatar: author.avatar || '',
      bio: author.bio || '',
      role: author.role || 'Contributor',
      twitter: author.twitter || '',
      github: author.github || '',
      website: author.website || ''
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAuthor) {
      updateMutation.mutate({ id: editingAuthor.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Authors</h1>
          <p className="text-gray-400">Manage blog contributors and their profiles.</p>
        </div>
        <button
          onClick={() => {
            setEditingAuthor(null)
            setFormData({ name: '', avatar: '', bio: '', role: 'Contributor', twitter: '', github: '', website: '' })
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <Plus size={16} />
          Add Author
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : authors.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-gray-900/50 border border-dashed border-white/10 rounded-2xl">
            <User className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-500">No authors found. Add your first author to get started.</p>
          </div>
        ) : (
          authors.map((author: any) => (
            <div key={author.id} className="bg-gray-900 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 border-2 border-white/10">
                    {author.avatar ? (
                      <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="text-gray-600" size={32} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{author.name}</h3>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">{author.role}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(author)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => confirm('Delete author?') && deleteMutation.mutate(author.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">
                {author.bio || 'No bio provided.'}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1DA1F2]">
                    <Twitter size={16} />
                  </a>
                )}
                {author.github && (
                  <a href={author.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                    <Github size={16} />
                  </a>
                )}
                {author.website && (
                  <a href={author.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                    <Globe size={16} />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-950 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editingAuthor ? 'Edit Author' : 'Add New Author'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    <option value="Contributor">Contributor</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Avatar URL</label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary/50 outline-none h-24 resize-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Twitter</label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">GitHub</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Check size={18} />
                  )}
                  {editingAuthor ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
