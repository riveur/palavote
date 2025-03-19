import { CreditCard } from '@/components/shared/credit_card'
import { Toaster } from '@/components/ui/sonner'
import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-dvh w-full flex flex-col items-center gap-2">
        <Header className="w-full max-w-6xl sticky top-0 bg-background/80 backdrop-blur-sm" />
        <main className="w-full max-w-6xl p-4 flex-1 flex flex-col gap-4">{children}</main>
      </div>
      <CreditCard className="fixed bottom-0 right-0 rounded-tr-none rounded-b-none border-b-0 border-r-0" />
      <Toaster richColors />
    </>
  )
}
