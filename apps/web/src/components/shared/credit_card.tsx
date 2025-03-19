import { Link } from '@tanstack/react-router'
import { HeartIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const CreditCard = ({ className, children, ...props }: React.ComponentProps<typeof Card>) => {
  return (
    <Card className={cn('p-2 px-4', className)} {...props}>
      <CardContent className="p-0">
        <p className="text-xs">
          Made with <HeartIcon className="text-red-500 fill-red-500 inline-block size-4" /> by{' '}
          <a className="text-primary" href="https://riveur.com" target="_blank">
            Riveur
          </a>{' '}
          •{' '}
          <Link to="/terms" className="hover:underline">
            Terms
          </Link>{' '}
          •{' '}
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export { CreditCard }
