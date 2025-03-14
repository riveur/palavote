import { createFileRoute, redirect } from '@tanstack/react-router'

import { Loading } from '@/components/shared/loading'
import { authQueryOptions } from '@/features/auth/queries'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    try {
      await context.queryClient.ensureQueryData(authQueryOptions())
    } catch (_) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  pendingComponent: () => (
    <main className="min-h-dvh flex items-center justify-center">
      <Loading />
    </main>
  ),
})
