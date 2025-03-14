import { cn } from '@/lib/utils'

export function TextLogo({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="text-logo"
      className={cn('text-4xl font-bold tracking-tighter', className)}
      {...props}
    >
      pala
      <span className="bg-gradient-to-br from-purple-800 to-indigo-500 bg-clip-text text-transparent">
        vote
      </span>
      .
    </span>
  )
}
