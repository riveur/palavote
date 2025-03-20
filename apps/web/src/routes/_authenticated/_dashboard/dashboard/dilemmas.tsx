import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DilemasTable } from '@/features/dashboard/components/dilemmas_table'
import { dilemmasQueryOptions } from '@/library/queries'

export const Route = createFileRoute('/_authenticated/_dashboard/dashboard/dilemmas')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(dilemmasQueryOptions({ onlyApproved: false }))
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data: dilemmas } = useSuspenseQuery(dilemmasQueryOptions({ onlyApproved: false }))
  return (
    <>
      <Card className="pb-0">
        <CardHeader className="border-b">
          <CardTitle>Dilemmes</CardTitle>
          <CardDescription>Liste de tous les dilemmes</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DilemasTable data={dilemmas} />
        </CardContent>
      </Card>
    </>
  )
}
