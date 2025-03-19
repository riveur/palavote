import { createFileRoute, Link, notFound, Outlet, redirect } from '@tanstack/react-router'
import { LandPlotIcon } from 'lucide-react'

import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { dilemmaQueryOptions } from '@/features/vote/queries'
import { client } from '@/lib/client'

export const Route = createFileRoute('/_authenticated/vote/')({
  loader: async ({ context }) => {
    const { data, error } = await client.api.dilemmas.pick.$get()

    if (error) {
      throw error
    }

    if (!data.dilemma) {
      throw notFound()
    }

    const [p1, p2] = data.dilemma.propositions

    context.queryClient.setQueryData(dilemmaQueryOptions(p1.slug, p2.slug).queryKey, data)

    throw redirect({ to: '/vote/$p1/$p2', params: { p1: p1.slug, p2: p2.slug } })
  },
  component: RouteComponent,
  notFoundComponent: () => (
    <div className="flex-1 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-xl font-bold text-center">Vous avez fini de répondre à tous les votes</h1>
      <LandPlotIcon className="size-16" />
      <Button asChild>
        <Link to="/propositions/create">Proposer un nouveau vote</Link>
      </Button>
    </div>
  ),
  pendingComponent: () => (
    <div className="flex-1 flex items-center justify-center">
      <Loading className="[&_svg]:size-8">Recherche d'un dilemme</Loading>
    </div>
  ),
})

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
