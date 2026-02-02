'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'pricing' | 'feature'
  hover?: boolean
  glow?: boolean
  children: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, glow = false, className, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-surface/60 border-border',
      elevated: 'bg-surface-elevated/80 border-border',
      pricing: 'bg-surface/80 border-border',
      feature: 'bg-surface/40 border-border-subtle',
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'relative rounded-2xl border backdrop-blur-sm transition-all duration-300',
          variantStyles[variant],
          hover && 'hover:border-accent/30 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer',
          glow && 'shadow-glow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card subcomponents
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('p-6 pb-4', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('p-6 pt-4 border-t border-border', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'
