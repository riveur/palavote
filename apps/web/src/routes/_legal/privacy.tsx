import { createFileRoute } from '@tanstack/react-router'

import { Header } from '@/components/authenticated/header'
import { CreditCard } from '@/components/shared/credit_card'
import { Markdown } from '@/components/ui/markdown'
import content from '@/content/privacy.md?raw'

export const Route = createFileRoute('/_legal/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col items-center gap-2">
        <Header className="w-full max-w-6xl sticky top-0 bg-background/80 backdrop-blur-sm" />
        <main className="min-h-dvh container mx-auto max-w-4xl p-4">
          <Markdown>{content}</Markdown>
        </main>
      </div>
      <CreditCard className="fixed bottom-0 right-0 rounded-tr-none rounded-b-none border-b-0 border-r-0" />
    </>
  )
}
