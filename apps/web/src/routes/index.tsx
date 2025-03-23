import { createFileRoute, Link } from '@tanstack/react-router'

import { CreditCard } from '@/components/shared/credit_card'
import { TextLogo } from '@/components/shared/text_logo'
import { ThemeToggler } from '@/components/shared/theme_toggler'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="space-y-6 max-w-3xl">
            <TextLogo className="block text-6xl font-bold" />
            <p className="text-xl text-muted-foreground mb-8">
              Créez et participez à des dilemmes sur l'univers de Paladium. Votez pour vos choix
              préférés et découvrez ce que la communauté en pense !
            </p>
            <div className="grid gap-4 md:grid-cols-2 max-w-lg mx-auto">
              <Link to="/vote" className={cn(buttonVariants({ size: 'lg' }), 'text-lg')}>
                Commencer
              </Link>
              <a
                className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'text-lg')}
                href="https://discord.gg/stnPkbtw3E"
                target="_blank"
              >
                Rejoindre Discord
              </a>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="outline-2 outline-transparent hover:outline-primary/50 outline-offset-1 transition-colors p-6 rounded-xl bg-card shadow-md text-secondary-foreground">
                <h3 className="text-xl font-semibold mb-3">Créez des dilemmes</h3>
                <p className="text-muted-foreground">
                  Proposez vos propres dilemmes à la communauté après validation par nos modérateurs
                </p>
              </div>

              <div className="outline-2 outline-transparent hover:outline-primary/50 outline-offset-1 transition-colors p-6 rounded-xl bg-card shadow-md text-secondary-foreground">
                <h3 className="text-xl font-semibold mb-3">Votez</h3>
                <p className="text-muted-foreground">
                  Participez aux votes et donnez votre avis sur les dilemmes de la communauté
                </p>
              </div>

              <div className="outline-2 outline-transparent hover:outline-primary/50 outline-offset-1 transition-colors p-6 rounded-xl bg-card shadow-md text-secondary-foreground">
                <h3 className="text-xl font-semibold mb-3">Découvrez</h3>
                <p className="text-muted-foreground">
                  Voyez les résultats et le pourcentage de joueurs qui ont fait le même choix que
                  vous
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreditCard className="fixed bottom-0 right-0 rounded-tr-none rounded-b-none border-b-0 border-r-0" />
      <ThemeToggler className="fixed top-4 right-4 size-8" />
    </>
  )
}
