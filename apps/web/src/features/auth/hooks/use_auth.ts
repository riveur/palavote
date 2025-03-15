import { useAuthQuery } from '@/features/auth/queries'

export function useAuth() {
  const authQuery = useAuthQuery()

  const roleIs = (role: NonNullable<typeof authQuery.data>['role']) => {
    return authQuery.data?.role === role
  }

  switch (true) {
    case authQuery.isPending:
    case !authQuery.data:
      return { user: null, roleIs }

    default:
      return { user: authQuery.data, roleIs }
  }
}
