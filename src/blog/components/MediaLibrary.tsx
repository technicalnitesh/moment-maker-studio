import React, { useState, useEffect } from 'react'
import { getMedia, uploadMedia, deleteMedia, updateMediaAlt, BlogMedia } from '@/lib/blog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload, Trash2, Edit2, Check, X, Search, Copy, Image as ImageIcon, Loader2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface MediaLibraryProps {
  allowSelection?: boolean
  onSelect?: (media: BlogMedia) => void
}

export function MediaLibrary({ allowSelection, onSelect }: MediaLibraryProps) {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAlt, setEditAlt] = useState('')

  const { data: media = [], isLoading } = useQuery({
    queryKey: ['blog-media'],
    queryFn: getMedia
  })

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadMedia(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-media'] })
      toast.success('Media uploaded successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Upload failed')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-media'] })
      toast.success('Media deleted')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Delete failed')
    }
  })

  const updateAltMutation = useMutation({
    mutationFn: ({ id, alt }: { id: string, alt: string }) => updateMediaAlt(id, alt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-media'] })
      setEditingId(null)
      toast.success('Alt text updated')
    }
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await uploadMutation.mutateAsync(file)
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const filteredMedia = media.filter(m => 
    m.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('URL copied to clipboard')
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* Toolbar */}
      <div className="p-4 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between bg-gray-900/50">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search blog assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        
        <div className="text-xs text-gray-500 italic bg-white/5 px-3 py-2 rounded-lg border border-white/5">
          Assets are managed via project files
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
            <ImageIcon size={64} className="opacity-20" />
            <p className="text-lg">No media files found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMedia.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-gray-900 rounded-xl border border-white/5 overflow-hidden flex flex-col hover:border-primary/50 transition-all"
              >
                {/* Image Preview */}
                <div 
                  className={`aspect-square relative bg-black flex items-center justify-center overflow-hidden cursor-pointer`}
                  onClick={() => allowSelection && onSelect?.(item)}
                >
                  <img 
                    src={item.url} 
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {allowSelection && (
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Select</span>
                    </div>
                  )}
                </div>

                {/* Info & Actions */}
                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-gray-300 truncate flex-1" title={item.original_name}>
                      {item.original_name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-gray-500 truncate italic">
                      Static Project Asset
                    </p>
                  </div>

                  <div className="flex items-center gap-1 pt-2 border-t border-white/5">
                    <button 
                      onClick={() => copyToClipboard(window.location.origin + item.url)}
                      className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
                    >
                      <Copy size={10} />
                      <span>URL</span>
                    </button>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
                    >
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
