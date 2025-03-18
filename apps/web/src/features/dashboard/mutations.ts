import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/client'
import type { FormSchema as DilemmaUpdateFormSchema } from './components/table_expanded_row'

export function useToggleApproveDilemmaMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dilemmaId: number) => {
      const { error } = await client.admin.dilemmas({ id: dilemmaId }).approve.$put()

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dilemmas'] })
    },
  })
}

export function useUpdateDilemmaMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      dilemmaId,
      payload,
    }: {
      dilemmaId: number
      payload: DilemmaUpdateFormSchema
    }) => {
      const { error } = await client.admin.dilemmas({ id: dilemmaId }).$put(payload)

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dilemmas'] })
    },
  })
}
