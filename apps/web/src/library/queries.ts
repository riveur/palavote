import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/client'

type UseDilemmasOptions = {
  onlyApproved?: boolean
}

export function useDilemmas(options: UseDilemmasOptions = {}) {
  const { onlyApproved = true } = options

  return useQuery({
    queryKey: ['dilemmas', { onlyApproved }],
    queryFn: async () => {
      const { data, error } = await client.dilemmas.$get({ query: { only_approved: onlyApproved } })

      if (error) {
        throw error
      }

      return data
    },
  })
}
