import { Link } from '@tanstack/react-router'
import { EyeIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/features/auth/hooks/use_auth'
import type { Dilemma } from '../types'

interface DilemmaListProps extends React.ComponentProps<typeof Card> {
  dilemmas: Dilemma[]
}

export function DilemmaList({ dilemmas, ...props }: DilemmaListProps) {
  const { user } = useAuth()
  return (
    <Card {...props}>
      <CardHeader className="border-b">
        <CardTitle>Catalogue</CardTitle>
        <CardDescription>Liste de tous les dilemmes que vous pouvez voter</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {dilemmas.map((dilemma) => (
          <div key={dilemma.id} className="flex flex-row gap-4">
            <div className="rounded-md size-16 flex flex-row overflow-hidden">
              {[dilemma.propositions[0], '', dilemma.propositions[1]].map((proposition) => {
                if (typeof proposition === 'string') {
                  return (
                    <Separator
                      key={proposition}
                      orientation="vertical"
                      className="data-[orientation=vertical]:w-1 bg-background"
                    />
                  )
                }

                return (
                  <div
                    key={proposition.id}
                    className="w-full h-full bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${proposition.imageUrl})` }}
                  />
                )
              })}
            </div>
            <div className="space-y-1.5 grow">
              <p>{dilemma.title}</p>
              <div className="flex items-center gap-4">
                <div className="flex flex-row gap-1 items-center text-muted-foreground text-sm">
                  {[dilemma.propositions[0], '', dilemma.propositions[1]].map((proposition) => {
                    if (typeof proposition === 'string') {
                      return <span key={proposition}>/</span>
                    }
                    return (
                      <div key={proposition.id} className="flex flex-row items-center gap-1">
                        <Badge variant="secondary" className="p-0.5 size-4 rounded-xs">
                          {proposition.votes.length}
                        </Badge>
                        <p>{proposition.name}</p>
                      </div>
                    )
                  })}
                </div>
                {dilemma.propositions.some((prop) =>
                  prop.votes.some((vote) => vote.voter === user?.id)
                ) && <Badge variant="outline">Déjà voté</Badge>}
                {dilemma.author && (
                  <p className="text-xs text-muted-foreground">
                    {dilemma.author.username} - {new Date(dilemma.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center w-16">
              <Button size="icon" variant="outline" asChild>
                <Link
                  to="/vote/$p1/$p2"
                  params={{ p1: dilemma.propositions[0].slug, p2: dilemma.propositions[1].slug }}
                >
                  <EyeIcon />
                  <span className="sr-only">Voir</span>
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
