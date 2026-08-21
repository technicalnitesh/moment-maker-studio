import React, { useState, useEffect, useRef, useMemo } from 'react'
import { BlogPost } from '@/blog/types/blog'
import { getCategories, getTags, BlogMedia, getAuthors } from '@/lib/blog'
import { useQuery } from '@tanstack/react-query'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { Save, Eye, Send, X, AlertCircle, Image as ImageIcon } from 'lucide-react'
import { MediaLibrary } from './MediaLibrary'

interface BlogEditorProps {
  initialData?: Partial<BlogPost>
  onSubmit: (data: Partial<BlogPost>) => Promise<void>
  isEditing?: boolean
}

export function BlogEditor({ initialData, onSubmit, isEditing }: BlogEditorProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>(initialData || {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    categoryId: '',
    tags: [],
    status: 'draft',
    readingTime: 5,
    featuredImage: '',
    featuredImageId: '',
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: ''
  })

  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [mediaTarget, setMediaTarget] = useState<'featured' | 'content'>('featured')
  const quillRef = useRef<ReactQuill>(null)

  const { data: categories = [] } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: getCategories
  })

  const { data: tags = [] } = useQuery({
    queryKey: ['blog-tags'],
    queryFn: getTags
  })

  const { data: authors = [] } = useQuery({
    queryKey: ['blog-authors'],
    queryFn: getAuthors
  })

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && formData.title && !formData.slug) {
      const suggestedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setFormData(prev => ({ ...prev, slug: suggestedSlug }))
    }
  }, [formData.title, isEditing])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }))
  }

  const handleTagToggle = (tagName: string) => {
    setFormData(prev => {
      const currentTags = prev.tags || []
      if (currentTags.includes(tagName)) {
        return { ...prev, tags: currentTags.filter(t => t !== tagName) }
      } else {
        return { ...prev, tags: [...currentTags, tagName] }
      }
    })
  }

  const handleMediaSelect = (media: BlogMedia) => {
    if (mediaTarget === 'featured') {
      setFormData(prev => ({
        ...prev,
        featuredImage: media.url,
        featuredImageId: media.id
      }))
    } else {
      const quill = quillRef.current?.getEditor()
      if (quill) {
        const range = quill.getSelection(true)
        quill.insertEmbed(range.index, 'image', media.url)
        quill.setSelection(range.index + 1)
      }
    }
    setShowMediaLibrary(false)
  }

  const handleSaveDraft = () => onSubmit({ ...formData, status: 'draft' })
  const handlePublish = () => onSubmit({ ...formData, status: 'published' })

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: () => {
          setMediaTarget('content')
          setShowMediaLibrary(true)
        }
      }
    }
  }), [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter article title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-300"
              placeholder="article-slug-here"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Short summary for SEO and listing cards..."
            />
          </div>

          <div className="min-h-[400px] flex flex-col">
            <label className="block text-sm font-medium text-gray-400 mb-1">Content</label>
            <div className="flex-1 bg-gray-900 rounded-lg border border-white/10 overflow-hidden">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={formData.content || ''}
                onChange={handleContentChange}
                modules={modules}
                className="h-full min-h-[350px] text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-900/50 border border-white/5 rounded-xl p-6 space-y-6 backdrop-blur-sm sticky top-24">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Publishing</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSaveDraft}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Save size={16} />
                Draft
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
              >
                <Send size={16} />
                Publish
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
              <AlertCircle size={14} />
              Status: <span className="text-gray-300 capitalize">{formData.status}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Featured Image</h3>
            <div 
              onClick={() => {
                setMediaTarget('featured')
                setShowMediaLibrary(true)
              }}
              className="relative aspect-video rounded-lg border border-dashed border-white/10 bg-black/20 hover:bg-black/40 transition-colors cursor-pointer group overflow-hidden flex flex-col items-center justify-center"
            >
              {formData.featuredImage ? (
                <>
                  <img src={formData.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Change Image</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setFormData(prev => ({ ...prev, featuredImage: '', featuredImageId: '' }))
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white/60 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-gray-600 mb-2" />
                  <span className="text-xs text-gray-500">Click to select image</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Organization</h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select Category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Tags</label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-gray-800 rounded-lg border border-white/5">
                {tags.map((t: any) => (
                  <button
                    key={t.id}
                    onClick={() => handleTagToggle(t.name)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${
                      formData.tags?.includes(t.name)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Author</label>
              <select
                name="author_id"
                value={formData.author?.id || (formData as any).author_id || ''}
                onChange={(e) => {
                  const val = e.target.value
                  setFormData(prev => ({ ...prev, author: { ...prev.author!, id: val } }))
                  // Also set it as a root property for the API mapping
                  ;(formData as any).author_id = val
                }}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select Author</option>
                {authors.map((a: any) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Details</h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Reading Time (mins)</label>
              <input
                type="number"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Select Media</h2>
              <button 
                onClick={() => setShowMediaLibrary(false)}
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <MediaLibrary 
                allowSelection 
                onSelect={handleMediaSelect} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
