import { client } from '@/lib/client'
import { useQuery } from '@tanstack/react-query'

export function useDilemmas() {
  return useQuery({
    queryKey: ['dilemmas'],
    queryFn: async () => {
      const { data, error } = await client.dilemmas.$get()

      if (error) {
        throw error
      }

      return data
    },
  })
}
