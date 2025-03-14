import { LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLogoutMutation } from '../mutations'

export function LogoutButton({
  size = 'icon',
  variant = 'ghost',
  children = <LogOutIcon />,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'onClick'>) {
  const mutation = useLogoutMutation()

  return (
    <Button
      size={size}
      variant={variant}
      {...props}
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {children}
    </Button>
  )
}
