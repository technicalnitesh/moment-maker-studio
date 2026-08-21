import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { LayoutDashboard, FileText, FolderTree, Tag, User, Globe, ArrowLeft, Plus } from 'lucide-react'
import { Toaster } from 'sonner'

export const Route = createFileRoute('/_admin')({
  component: AdminLayout
})

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-black text-gray-100 font-sans selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-gray-950/50 backdrop-blur-xl flex flex-col fixed inset-y-0">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold tracking-tight text-lg">BM Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="pb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main</h3>
            <AdminNavLink to="/admin/blog" icon={<LayoutDashboard size={18} />}>Dashboard</AdminNavLink>
            <AdminNavLink to="/admin/blog/posts" icon={<FileText size={18} />}>Posts</AdminNavLink>
          </div>
          
          <div className="pb-4 border-t border-white/5 pt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Structure</h3>
            <AdminNavLink to="/admin/blog/categories" icon={<FolderTree size={18} />}>Categories</AdminNavLink>
            <AdminNavLink to="/admin/blog/tags" icon={<Tag size={18} />}>Tags</AdminNavLink>
          </div>

          <div className="pb-4 border-t border-white/5 pt-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</h3>
            <AdminNavLink to="/admin/blog/authors" icon={<User size={18} />}>Authors</AdminNavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link to="/blog" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            View Blog
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        <header className="h-16 border-b border-white/5 bg-gray-950/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-gray-400">Blog Management</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/admin/blog/posts/new"
              className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Plus size={16} />
              New Article
            </Link>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
      
      <Toaster theme="dark" position="bottom-right" closeButton />
    </div>
  )
}

function AdminNavLink({ to, icon, children }: { to: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      activeProps={{ className: 'bg-white/5 text-white ring-1 ring-white/10' }}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
    >
      <span className="text-gray-500 group-hover:text-primary transition-colors">{icon}</span>
      {children}
    </Link>
  )
}
