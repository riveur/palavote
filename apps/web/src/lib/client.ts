import { createClient } from '@repo/rpc/client'

import { useAuthTokenStore } from '@/features/auth/stores/auth_token_store'

export const client = createClient({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = useAuthTokenStore.getState().token
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      (_, __, response) => {
        if (response.status === 401) {
          useAuthTokenStore.getState().reset()
        }
      },
    ],
  },
})
