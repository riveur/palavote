import { Link } from '@tanstack/react-router'
import { GaugeIcon, LogOutIcon } from 'lucide-react'

import { ThemeIcon } from '@/components/shared/theme_icon'
import { useTheme } from '@/components/shared/theme_provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { translateRole } from '@/features/auth/content/role'
import { useAuth } from '@/features/auth/hooks/use_auth'
import { useLogoutMutation } from '@/features/auth/mutations'

export function UserDropdown() {
  const { user, roleIs } = useAuth()
  const { theme, setTheme } = useTheme()

  const changeTheme = () => {
    switch (theme) {
      case 'light':
        setTheme('dark')
        break
      case 'dark':
        setTheme('system')
        break
      case 'system':
        setTheme('light')
        break
    }
  }

  const { mutate: logout } = useLogoutMutation()

  if (!user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full hover:opacity-75">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{user.username.at(0)!.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg" align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username.at(0)!.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.username}</span>
              <span className="truncate text-xs">
                {translateRole(user.role)}
                {user.isAnonymous && ' - Anonyme'}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {roleIs('ADMIN') && (
            <DropdownMenuItem asChild>
              <Link to="/dashboard">
                <GaugeIcon />
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={(event) => event.preventDefault()} onClick={changeTheme}>
            <ThemeIcon />
            Thème
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOutIcon />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
