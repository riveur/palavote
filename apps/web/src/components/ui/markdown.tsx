import * as React from 'react'
import MarkdownPrimitive, { type Components } from 'react-markdown'

import { cn } from '@/lib/utils'

export const implementedComponents = {
  h1({ node, className, ...props }) {
    return <h1 className={cn('text-2xl font-bold pb-2 mb-4 border-b', className)} {...props} />
  },
  h2({ node, className, ...props }) {
    return <h2 className={cn('text-xl font-bold mt-2 mb-2', className)} {...props} />
  },
  h3({ node, className, ...props }) {
    return <h3 className={cn('text-lg font-bold mb-2', className)} {...props} />
  },
  h4({ node, className, ...props }) {
    return <h4 className={cn('text-base font-bold mb-2', className)} {...props} />
  },
  p({ node, className, ...props }) {
    return <p className={cn('mb-4', className)} {...props} />
  },
  a({ node, className, ...props }) {
    return <a className={cn('underline', className)} {...props} />
  },
  ul({ node, className, ...props }) {
    return (
      <ul
        className={cn('list-disc list-inside mb-4 [&>li]:pl-4 [&>li>p]:inline-block', className)}
        {...props}
      />
    )
  },
  code({ node, className, ...props }) {
    return (
      <code className={cn('bg-card text-card-foreground px-1 rounded-sm', className)} {...props} />
    )
  },
} satisfies Components

export function Markdown({
  components,
  ...markdownProps
}: React.ComponentProps<typeof MarkdownPrimitive>) {
  return (
    <MarkdownPrimitive
      components={{
        ...implementedComponents,
        ...components,
      }}
      {...markdownProps}
    />
  )
}
