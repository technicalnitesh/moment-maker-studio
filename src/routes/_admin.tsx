import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin')({
  beforeLoad: async ({ location }) => {
    // Basic server-side protection for admin area.
    // In a real app, integrate with your authentication system.
    const isAdmin = true // Temporary toggle for implementation
    if (!isAdmin) {
      throw redirect({ to: '/auth' })
    }
  },
  component: () => <div className="min-h-screen bg-gray-950 text-white p-8">Admin Layout Placeholder</div>
})
