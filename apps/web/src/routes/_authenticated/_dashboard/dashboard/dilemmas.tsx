import { createFileRoute } from '@tanstack/react-router'

import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DilemasTable } from '@/features/dashboard/components/dilemmas_table'
import { useDilemmas } from '@/library/queries'

export const Route = createFileRoute('/_authenticated/_dashboard/dashboard/dilemmas')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: dilemmas, isLoading, isError, refetch } = useDilemmas({ onlyApproved: false })
  return (
    <>
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
      )}
      {isError && (
        <div className="flex-1 flex flex-col gap-4">
          <p>Erreur lors du chargement des données</p>
          <Button onClick={() => refetch()}>Réessayer</Button>
        </div>
      )}
      {dilemmas && (
        <Card className="pb-0">
          <CardHeader className="border-b">
            <CardTitle>Dilemmes</CardTitle>
            <CardDescription>Liste de tous les dilemmes</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DilemasTable data={dilemmas} />
          </CardContent>
        </Card>
      )}
    </>
  )
}
