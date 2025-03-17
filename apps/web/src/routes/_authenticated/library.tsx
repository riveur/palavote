import { createFileRoute } from '@tanstack/react-router'

import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { DilemmaList } from '@/library/components/dilemma_list'
import { useDilemmas } from '@/library/queries'

export const Route = createFileRoute('/_authenticated/library')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: dilemmas, isLoading, isError, refetch } = useDilemmas()
  return (
    <>
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Loading>Chargement du catalogue...</Loading>
        </div>
      )}
      {isError && (
        <div className="flex-1 flex flex-col gap-4">
          <p>Erreur lors du chargement des données</p>
          <Button onClick={() => refetch()}>Réessayer</Button>
        </div>
      )}
      {dilemmas && <DilemmaList dilemmas={dilemmas} />}
    </>
  )
}
