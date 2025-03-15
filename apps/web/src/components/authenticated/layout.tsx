import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full flex flex-col items-center gap-2">
      <Header className="w-full max-w-6xl" />
      <main className="w-full max-w-6xl p-4 flex-1 flex flex-col gap-4">{children}</main>
    </div>
  )
}
