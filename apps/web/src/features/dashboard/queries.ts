import { client } from '@/lib/client'

import { queryOptions } from '@tanstack/react-query'

export function usersQueryOptions() {
  return queryOptions({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await client.api.admin.users.$get()

      if (error) {
        throw error
      }

      return data
    },
  })
}
