import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'

import { ThemeToggler } from '@/components/shared/theme_toggler'
import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main className="min-h-screen w-full flex flex-col items-center justify-center gap-8">
        <h1 className="text-5xl font-bold">PalaVote</h1>
        <p>Votez parmis plusieurs dilemmes sur le thème de Paladium</p>
        <Link to="/" className={buttonVariants()}>
          Commencer <ChevronRightIcon />
        </Link>
      </main>
      <ThemeToggler className="fixed top-4 right-4 size-8" />
    </>
  )
}
