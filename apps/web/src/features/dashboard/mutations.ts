import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/client'
import type { FormSchema as DilemmaUpdateFormSchema } from './components/dilemmas_table_expanded_row'
import type { FormSchema as UserUpdateFormSchema } from './components/users_table_expanded_row'

export function useToggleApproveDilemmaMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dilemmaId: number) => {
      const { error } = await client.api.admin.dilemmas({ id: dilemmaId }).approve.$put()

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
      const { error } = await client.api.admin.dilemmas({ id: dilemmaId }).$put(payload)

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dilemmas'] })
    },
  })
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, payload }: { userId: number; payload: UserUpdateFormSchema }) => {
      const { error } = await client.api.admin.users({ id: userId }).$put(payload)

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
