'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-background hover:bg-accent-hover shadow-glow-sm hover:shadow-glow font-semibold',
  secondary: 'bg-transparent border border-border text-text-primary hover:border-accent hover:text-accent',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body',
  lg: 'px-8 py-4 text-body-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Link styled as button
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'
