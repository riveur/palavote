import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { Dilemma, VoteResult } from '../types'

interface DilemmaVoteResultProps extends React.ComponentProps<'div'> {
  dilemma: Dilemma
  result: VoteResult
}

export function DilemmaVoteResult({
  dilemma,
  result,
  className,
  ...props
}: DilemmaVoteResultProps) {
  const proposition = dilemma.propositions.find((p) => p.id === result.propositionId)!
  return (
    <div className={cn('flex flex-col gap-2 w-full', className)} {...props}>
      <p className="text-sm">{proposition.name}</p>
      <Progress
        className="rounded-xs h-4"
        value={(result.votesForCurrentProposition / result.totalVotes) * 100}
      />
      <div className="flex items-center justify-between text-muted-foreground text-sm">
        <span>{Math.round((result.votesForCurrentProposition / result.totalVotes) * 100)}%</span>
        <span>
          {result.votesForCurrentProposition} / {result.totalVotes} votes
        </span>
      </div>
    </div>
  )
}
