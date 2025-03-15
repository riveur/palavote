import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Dilemma } from '../types'

interface PropositionCardProps extends React.ComponentProps<typeof Card> {
  proposition: Dilemma['propositions'][number]
  isPending?: boolean
  alreadyVoted?: boolean
  onVote?: () => void
}

export function PropositionCard({
  proposition,
  isPending = false,
  alreadyVoted = false,
  onVote,
  className,
  ...props
}: PropositionCardProps) {
  return (
    <Card
      data-pending={isPending}
      className={cn(
        'group relative flex flex-col justify-end overflow-hidden data-[pending="true"]:animate-pulse data-[voted="true"]:border-0 data-[voted="true"]:outline-4 data-[voted="true"]:outline-purple-900/70',
        className
      )}
      {...props}
    >
      {!alreadyVoted && (
        <button className="z-10 absolute inset-0 cursor-pointer" onClick={onVote} />
      )}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${proposition.imageUrl})` }}
      />
      <div className='absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black group-hover:from-transparent transition-colors duration-100 to-transparent group-data-[voted="true"]:bg-none' />
      {!alreadyVoted && (
        <CardContent className="opacity-0 group-hover:opacity-100 transition-all duration-100 bg-black/60 absolute inset-0 flex flex-col items-center justify-center gap-4">
          <Button disabled={isPending} className="w-1/3 pointer-events-none">
            Voter
          </Button>
        </CardContent>
      )}
      <CardContent className="relative">
        <h3 className="text-3xl font-semibold text-white">{proposition.name}</h3>
      </CardContent>
    </Card>
  )
}
