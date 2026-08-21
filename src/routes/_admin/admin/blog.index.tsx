import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/blog')({
  component: () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-gray-900 rounded-xl">
          <h3 className="text-sm text-gray-400">Total Posts</h3>
          <p className="text-3xl font-semibold">12</p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl">
          <h3 className="text-sm text-gray-400">Published</h3>
          <p className="text-3xl font-semibold text-green-400">10</p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl">
          <h3 className="text-sm text-gray-400">Drafts</h3>
          <p className="text-3xl font-semibold text-amber-400">2</p>
        </div>
      </div>
    </div>
  ),
})
