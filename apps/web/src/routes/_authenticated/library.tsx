import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { DilemmaList } from '@/library/components/dilemma_list'
import { dilemmasQueryOptions } from '@/library/queries'

export const Route = createFileRoute('/_authenticated/library')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(dilemmasQueryOptions())
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data: dilemmas } = useSuspenseQuery(dilemmasQueryOptions())
  return (
    <>
      <DilemmaList dilemmas={dilemmas} />
    </>
  )
}
