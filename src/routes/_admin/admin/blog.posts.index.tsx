import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getAdminPosts } from '@/lib/blog'
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Calendar, Clock, Tag as TagIcon } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_admin/admin/blog/posts/')({
  component: AdminPostsPage
})

function AdminPostsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-posts', status, search],
    queryFn: () => getAdminPosts({ status, search })
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Manage Articles</h1>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by title..."
              className="bg-gray-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Article</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-8 h-20 bg-white/5"></td>
                </tr>
              ))
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No articles found matching your criteria.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 flex-shrink-0 overflow-hidden border border-white/5">
                        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-xs md:max-w-md">
                        <h3 className="font-medium text-white truncate">{post.title}</h3>
                        <p className="text-xs text-gray-500 truncate">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400">
                      <TagIcon size={12} />
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.publishedAt || post.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock size={12} />
                        {post.readingTime} min read
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to="/blog/$slug" params={{ slug: post.slug }} target="_blank" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Eye size={18} />
                      </Link>
                      <Link to="/admin/blog/posts/edit/$id" params={{ id: post.id }} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit size={18} />
                      </Link>

                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
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

function StatusBadge({ status }: { status: string }) {
  const styles = {
    published: 'bg-green-500/10 text-green-400 border-green-500/20',
    draft: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    archived: 'bg-red-500/10 text-red-400 border-red-500/20',
  }[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider ${styles}`}>
      {status}
    </span>
  )
}
