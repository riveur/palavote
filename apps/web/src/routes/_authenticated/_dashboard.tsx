import { createFileRoute, Link, Outlet, redirect, useLocation } from '@tanstack/react-router'
import { VoteIcon } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authQueryOptions } from '@/features/auth/queries'

const tabs = [{ label: 'Dilemmes', href: '/dashboard/dilemmas', icon: VoteIcon }]

export const Route = createFileRoute('/_authenticated/_dashboard')({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    const user = await queryClient.ensureQueryData(authQueryOptions())

    if (user.role !== 'ADMIN') {
      throw redirect({
        to: '/library',
      })
    }

    if (location.href === '/dashboard') {
      throw redirect({
        to: '/dashboard/dilemmas',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation()

  return (
    <>
      <Tabs defaultValue={location.href}>
        <TabsList className="w-full justify-start text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.href}
              value={tab.href}
              className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              asChild
            >
              <Link to={tab.href}>
                <tab.icon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                {tab.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Outlet />
    </>
  )
}
