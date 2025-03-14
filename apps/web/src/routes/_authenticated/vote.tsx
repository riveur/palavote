import { createFileRoute } from '@tanstack/react-router'

import { LogoutButton } from '@/features/auth/components/logout_button'
import { useAuth } from '@/features/auth/hooks/use_auth'

export const Route = createFileRoute('/_authenticated/vote')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()

  return (
    <>
      <div className="flex flex-col">
        <p>Hello "/_authenticated/vote"!</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <LogoutButton className="fixed right-4 top-4" />
    </>
  )
}
