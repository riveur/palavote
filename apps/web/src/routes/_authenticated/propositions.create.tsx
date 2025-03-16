import { createFileRoute } from '@tanstack/react-router'

import { PropositionForm } from '@/features/vote/components/proposition_form'

export const Route = createFileRoute('/_authenticated/propositions/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1 className="text-xl font-bold">Envoyer une nouvelle proposition de vote</h1>
      <PropositionForm />
    </>
  )
}
