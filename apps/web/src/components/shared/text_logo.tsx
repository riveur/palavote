import { cn } from '@/lib/utils'

export function TextLogo({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="text-logo"
      className={cn('text-4xl font-bold tracking-tighter', className)}
      {...props}
    >
      pala
      <span className="text-primary">vote</span>
    </span>
  )
}
