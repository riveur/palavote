import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/client'
import { dilemmaQueryOptions } from './queries'

type UseVoteDilemmaMutationOptions = {
  firstPropositionSlug: string
  secondPropositionSlug: string
  onReceiveNext?: (nextFirstPropSlug: string, nextSecondPropSlug: string) => void
  onNextEmpty?: () => void
}

export function useVoteDilemmaMutation({
  firstPropositionSlug,
  secondPropositionSlug,
  onReceiveNext,
  onNextEmpty,
}: UseVoteDilemmaMutationOptions) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (propositionId: number) =>
      client.dilemmas.vote.$post({ proposition_id: propositionId }),
    onSettled: (data) => {
      if (!data?.error) {
        queryClient.invalidateQueries({
          queryKey: dilemmaQueryOptions(firstPropositionSlug, secondPropositionSlug).queryKey,
        })

        if (data?.data.next) {
          const [p1, p2] = data.data.next.propositions
          onReceiveNext?.(p1.slug, p2.slug)
          queryClient.setQueryData(dilemmaQueryOptions(p1.slug, p2.slug).queryKey, {
            dilemma: data.data.next,
            result: null,
          })
        } else {
          onNextEmpty?.()
        }
      }
    },
  })
}
