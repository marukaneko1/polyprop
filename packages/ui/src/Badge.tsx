'use client'

import { clsx } from 'clsx'

interface BadgeProps {
  variant?: 'default' | 'accent' | 'success' | 'warning'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    default: 'bg-surface border-border text-text-secondary',
    accent: 'bg-accent/10 border-accent/30 text-accent',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 text-caption font-medium rounded-full border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
