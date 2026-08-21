import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/blog/authors')({
  component: AdminAuthorsPage
})

function AdminAuthorsPage() {
  return (
    <div className="space-y-6 text-center py-20">
      <h1 className="text-2xl font-bold tracking-tight">Authors Management</h1>
      <p className="text-gray-500">Author management will be coming in a future update.</p>
    </div>
  )
}
