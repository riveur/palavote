import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { client } from '@/lib/client'

export function useAuthQuery() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const query = useQuery(authQueryOptions())

  useEffect(() => {
    if (query.error) {
      queryClient.resetQueries({ queryKey: authQueryOptions().queryKey })
      navigate({
        to: '/login',
        search: { redirect: location.pathname !== '/login' ? location.pathname : undefined },
      })
    }
  }, [query.error, navigate, location.pathname, queryClient])

  return query
}

export function authQueryOptions() {
  return queryOptions({
    queryKey: ['auth'],
    queryFn: async () => {
      const { data, error } = await client.auth.me.$get()
      if (error) {
        throw error
      }
      return data
    },
    retry: 1,
    staleTime: Infinity,
  })
}
