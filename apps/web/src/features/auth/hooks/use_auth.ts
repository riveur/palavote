import { useAuthQuery } from '@/features/auth/queries'

export function useAuth() {
  const authQuery = useAuthQuery()

  switch (true) {
    case authQuery.isPending:
    case !authQuery.data:
      return { user: null }

    default:
      return { user: authQuery.data }
  }
}
