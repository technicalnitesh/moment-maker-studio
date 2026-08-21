import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/blog/diagnostics')({
  server: {
    handlers: {
      GET: async ({ context, request }: { context: any, request: Request }) => {
        const results: any = {
          timestamp: new Date().toISOString(),
          diagnostics: {
            context_keys: Object.keys(context || {}),
            env_keys: Object.keys((context as any).env || {}),
            process_env_keys: Object.keys(process.env || {}),
            global_this_db: !!(globalThis as any).DB,
            request_context_keys: Object.keys((request as any).context || {}),
          },
          checks: {}
        }

        const db = (context as any).env?.DB || (process.env as any).DB || (globalThis as any).DB || (request as any).context?.env?.DB

        if (!db) {
          results.checks.db_binding = "MISSING"
          return Response.json(results, { status: 500 })
        }

        results.checks.db_binding = "PRESENT"

        try {
          const testQuery = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' LIMIT 5").all()
          results.checks.db_query = "SUCCESS"
          results.checks.tables = testQuery.results
        } catch (e: any) {
          results.checks.db_query = "FAILED"
          results.checks.error = e.message
        }

        return Response.json(results)
      }
    }
  }
})
