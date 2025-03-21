import { Badge } from '@/components/ui/badge'
import { translateRole } from '@/features/auth/content/role'
import type { User } from '@/features/auth/types'
import { cn } from '@/lib/utils'

interface UserRoleBadgeProps extends React.ComponentProps<typeof Badge> {
  role: User['role']
}

export function UserRoleBadge({ role, variant = 'outline', ...props }: UserRoleBadgeProps) {
  const styles = {
    ADMIN: 'border-red-500',
    USER: 'border-green-500',
  } satisfies Record<typeof role, string>

  return (
    <Badge className={cn(styles[role])} variant={variant} {...props}>
      {translateRole(role)}
    </Badge>
  )
}
