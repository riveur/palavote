import { queryOptions } from '@tanstack/react-query'

import { client } from '@/lib/client'

type UseDilemmasOptions = {
  onlyApproved?: boolean
}

export function dilemmasQueryOptions(options: UseDilemmasOptions = {}) {
  const { onlyApproved = true } = options

  return queryOptions({
    queryKey: ['dilemmas', { onlyApproved }],
    queryFn: async () => {
      const { data, error } = await client.api.dilemmas.$get({
        query: { only_approved: onlyApproved },
      })

      if (error) {
        throw error
      }

      return data
    },
  })
}
