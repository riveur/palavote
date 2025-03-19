import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { client } from '@/lib/client'
import { authQueryOptions } from './queries'
import { useAuthTokenStore } from './stores/auth_token_store'

export function useLogoutMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const resetAuthToken = useAuthTokenStore((state) => state.reset)

  return useMutation({
    mutationFn: () => client.auth.logout.$post(),
    onSuccess: async () => {
      queryClient.resetQueries({ queryKey: authQueryOptions().queryKey })
      navigate({ to: '/' })
      resetAuthToken()
    },
  })
}
