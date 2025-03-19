import { createFileRoute, redirect } from '@tanstack/react-router'

import { ThemeToggler } from '@/components/shared/theme_toggler'
import { LoginForm } from '@/features/auth/components/login_form'
import { loginSearchSchema } from '@/features/auth/schemas/login_search_schema'
import { useAuthTokenStore } from '@/features/auth/stores/auth_token_store'
import { client } from '@/lib/client'

export const Route = createFileRoute('/_guest_only/login')({
  validateSearch: (search) => loginSearchSchema.parse(search),
  beforeLoad: async ({ search }) => {
    if (!search.code) {
      return
    }

    const tokenState = useAuthTokenStore.getState()

    const { data, error } = await client.api.auth.callback.$get({
      query: { code: search.code },
    })

    if (!error) {
      tokenState.init(data.value)
      throw redirect({
        to: search.redirect || '/vote',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch()
  return (
    <>
      <main className="min-h-dvh w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full max-w-sm">
          <LoginForm redirect={search.redirect} />
        </div>
      </main>
      <ThemeToggler className="fixed top-4 right-4" />
    </>
  )
}
