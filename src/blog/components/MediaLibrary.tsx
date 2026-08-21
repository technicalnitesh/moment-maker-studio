import React, { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMedia, uploadMedia, deleteMedia, updateMediaAlt, BlogMedia } from '@/lib/blog'
import { Upload, Trash2, Search, X, Check, Copy, Info, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface MediaLibraryProps {
  onSelect?: (media: BlogMedia) => void
  allowSelection?: boolean
}

export function MediaLibrary({ onSelect, allowSelection = false }: MediaLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<BlogMedia | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const { data: media = [], isLoading } = useQuery({
    queryKey: ['blog-media'],
    queryFn: getMedia
  })

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadMedia(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-media'] })
      toast.success('Media uploaded successfully')
      setIsUploading(false)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Upload failed')
      setIsUploading(false)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-media'] })
      toast.success('Media deleted successfully')
      setSelectedItem(null)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Delete failed')
    }
  })

  const updateAltMutation = useMutation({
    mutationFn: ({ id, altText }: { id: string, altText: string }) => updateMediaAlt(id, altText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-media'] })
      toast.success('Alt text updated')
    }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      uploadMutation.mutate(file)
    }
  }

  const handleCopyUrl = (url: string) => {
    const fullUrl = window.location.origin + url
    navigator.clipboard.writeText(fullUrl)
    toast.success('URL copied to clipboard')
  }

  const filteredMedia = media.filter(m => 
    m.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex flex-col h-full bg-black/40 rounded-xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-gray-900/50 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Upload size={16} />
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center text-gray-500">Loading media...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500 gap-2">
              <ImageIcon className="w-12 h-12 opacity-20" />
              <p>No media found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer group ${
                    selectedItem?.id === item.id ? 'border-primary ring-2 ring-primary/20' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Info size={20} className="text-white" />
                  </div>
                  {allowSelection && selectedItem?.id === item.id && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Details */}
        {selectedItem && (
          <div className="w-80 border-l border-white/5 bg-gray-950/50 p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Details</h3>
              <button onClick={() => setSelectedItem(null)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 border border-white/5 mb-6">
              <img
                src={selectedItem.url}
                alt={selectedItem.alt_text || selectedItem.original_name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Original Name</label>
                <p className="text-gray-300 break-all">{selectedItem.original_name}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Alt Text</label>
                <textarea
                  value={selectedItem.alt_text || ''}
                  onChange={(e) => {
                    const newAlt = e.target.value
                    setSelectedItem(prev => prev ? { ...prev, alt_text: newAlt } : null)
                  }}
                  onBlur={(e) => {
                    if (selectedItem) {
                      updateAltMutation.mutate({ id: selectedItem.id, altText: e.target.value })
                    }
                  }}
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Size</label>
                  <p className="text-gray-300">{formatSize(selectedItem.file_size)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Type</label>
                  <p className="text-gray-300">{selectedItem.mime_type?.split('/')[1]?.toUpperCase() || 'N/A'}</p>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => handleCopyUrl(selectedItem.url)}
                  className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors"
                >
                  <Copy size={16} />
                  Copy URL
                </button>
                {allowSelection && (
                  <button
                    onClick={() => {
                      if (selectedItem) {
                        onSelect?.(selectedItem)
                      }
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Select Image
                  </button>
                )}
                <button
                  onClick={() => {
                    if (selectedItem && confirm('Are you sure you want to delete this media? It cannot be undone.')) {
                      deleteMutation.mutate(selectedItem.id)
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  Delete Media
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
