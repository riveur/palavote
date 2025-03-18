import { createFileRoute, Link } from '@tanstack/react-router'
import { XCircleIcon } from 'lucide-react'
import { useState } from 'react'

import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { DilemmaVoteResult } from '@/features/vote/components/dilemma_vote_result'
import { PropositionCard } from '@/features/vote/components/proposition_card'
import { useVoteDilemmaMutation } from '@/features/vote/mutations'
import { useDilemma } from '@/features/vote/queries'

export const Route = createFileRoute('/_authenticated/vote/$p1/$p2')({
  component: RouteComponent,
})

function RouteComponent() {
  const { p1: firstPropositionSlug, p2: secondPropositionSlug } = Route.useParams()
  const { data, isLoading } = useDilemma(firstPropositionSlug, secondPropositionSlug)

  const [next, setNext] = useState<{
    nextFirstPropSlug: string
    nextSecondPropSlug: string
  } | null>(null)

  const { mutate: vote, isPending } = useVoteDilemmaMutation({
    firstPropositionSlug,
    secondPropositionSlug,
    onReceiveNext: (nextFirstPropSlug, nextSecondPropSlug) => {
      setNext({ nextFirstPropSlug, nextSecondPropSlug })
    },
    onNextEmpty: () => {
      setNext(null)
    },
  })

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!data?.dilemma) {
    return (
      <div className="flex-1 flex flex-col gap-8 items-center justify-center">
        <h1 className="text-xl font-bold text-center">Vote inexistant</h1>
        <XCircleIcon className="size-16" />
        <Button asChild>
          <Link to="/library">Retourner au catalogue</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center py-6">{data.dilemma.title}</h1>
      <div className="h-full grid md:grid-cols-2 gap-8 flex-grow">
        {data.dilemma.propositions.map((proposition) => (
          <PropositionCard
            key={proposition.id}
            data-voted={data.result?.propositionId === proposition.id}
            alreadyVoted={!!data.result}
            proposition={proposition}
            isPending={isPending}
            onVote={() => vote(proposition.id)}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 justify-center items-center gap-8 py-6">
        {data.result && (
          <>
            <DilemmaVoteResult
              className="place-self-start"
              dilemma={data.dilemma}
              result={data.result}
            />
            <Button variant="outline" className="w-32 place-self-center" size="lg" asChild>
              <Link
                to={next ? '/vote/$p1/$p2' : '/vote'}
                params={
                  next ? { p1: next.nextFirstPropSlug, p2: next.nextSecondPropSlug } : undefined
                }
              >
                Suivant
              </Link>
            </Button>
          </>
        )}
        <div className="col-start-3 col-end-4 place-self-end flex items-center gap-4">
          <img
            src={data.dilemma.author?.avatarUrl}
            alt={data.dilemma.author?.username}
            className="w-12 h-12 rounded-full border-2 border-white/20"
          />
          <div>
            <h2 className="text-xl font-semibold">{data.dilemma.author?.username}</h2>
            <p className="text-gray-400">{new Date(data.dilemma.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </>
  )
}
