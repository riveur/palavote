import { queryOptions, useQuery } from '@tanstack/react-query'

import { client } from '@/lib/client'

export function useDilemma(...args: Parameters<typeof dilemmaQueryOptions>) {
  return useQuery(dilemmaQueryOptions(...args))
}

export function dilemmaQueryOptions(firstPropositionSlug: string, secondPropositionSlug: string) {
  return queryOptions({
    queryKey: [
      'dilemma',
      { firstPropositionId: firstPropositionSlug, secondPropositionId: secondPropositionSlug },
    ],
    queryFn: async () => {
      const { data, error } = await client.api
        .dilemmas({
          firstProp: firstPropositionSlug,
        })({ secondProp: secondPropositionSlug })
        .$get()

      if (error) {
        throw error
      }

      return data
    },
  })
}
