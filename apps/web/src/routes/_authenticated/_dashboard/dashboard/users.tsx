import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersTable } from '@/features/dashboard/components/users_table'
import { usersQueryOptions } from '@/features/dashboard/queries'

export const Route = createFileRoute('/_authenticated/_dashboard/dashboard/users')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions())
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data: users } = useSuspenseQuery(usersQueryOptions())

  return (
    <>
      <Card className="pb-0">
        <CardHeader className="border-b">
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>Voir, modifier et administrer les utilisateurs</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <UsersTable data={users} />
        </CardContent>
      </Card>
    </>
  )
}
