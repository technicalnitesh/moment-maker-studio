import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getAdminPosts, getCategories, getTags } from '@/lib/blog'
import { LayoutDashboard, FileText, FolderTree, Tag, User, Plus, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/blog/')({
  component: AdminDashboard
})

function AdminDashboard() {
  const { data: posts = [] } = useQuery({
    queryKey: ['admin-posts-summary'],
    queryFn: () => getAdminPosts({ limit: 100 })
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['blog-categories-summary'],
    queryFn: getCategories
  })

  const { data: tags = [] } = useQuery({
    queryKey: ['blog-tags-summary'],
    queryFn: getTags
  })

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length,
    categories: categories.length,
    tags: tags.length
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog Dashboard</h1>
        <p className="text-gray-400">Welcome back. Here's what's happening with your blog today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Articles" value={stats.total} icon={<FileText className="text-blue-400" />} />
        <StatCard title="Published" value={stats.published} icon={<GlobeIcon className="text-green-400" />} />
        <StatCard title="Drafts" value={stats.drafts} icon={<EditIcon className="text-amber-400" />} />
        <StatCard title="Categories" value={stats.categories} icon={<FolderTree className="text-purple-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <QuickActionButton 
              to="/admin/blog/posts/new" 
              label="Write New Article" 
              description="Create and publish a new blog post"
              icon={<Plus size={20} />}
            />
            <QuickActionButton 
              to="/admin/blog/posts" 
              label="Manage Posts" 
              description="Edit, delete or unpublish articles"
              icon={<FileText size={20} />}
            />
            <QuickActionButton 
              to="/admin/blog/categories" 
              label="Categories" 
              description="Organize your content structure"
              icon={<FolderTree size={20} />}
            />
            <QuickActionButton 
              to="/admin/blog/tags" 
              label="Tags" 
              description="Manage article keywords and tags"
              icon={<Tag size={20} />}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Articles</h2>
            <Link to="/admin/blog/posts" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="bg-gray-900/50 border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden backdrop-blur-sm">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 border border-white/5 overflow-hidden flex-shrink-0">
                    <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">{post.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(post.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    post.status === 'published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }`}>
                    {post.status}
                  </span>
                  <Link to="/admin/blog/posts/edit/$id" params={{ id: post.id }} className="p-2 text-gray-500 hover:text-white transition-colors">
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No articles yet. Start by creating one!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-gray-900/50 border border-white/5 rounded-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
    </div>
  )
}

function QuickActionButton({ to, label, description, icon }: { to: any, label: string, description: string, icon: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-4 p-4 bg-gray-900/50 border border-white/5 rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-gray-800 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </Link>
  )
}

function GlobeIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  )
}

function EditIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  )
}
