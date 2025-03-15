import { Link } from '@tanstack/react-router'
import { TextLogo } from '../shared/text_logo'
import { UserDropdown } from './user_dropdown'
import { cn } from '@/lib/utils'

export function Header({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header className={cn('flex flex-row items-center justify-between p-4', className)} {...props}>
      <Link to="/">
        <TextLogo className="text-3xl" />
      </Link>
      <UserDropdown />
    </header>
  )
}
