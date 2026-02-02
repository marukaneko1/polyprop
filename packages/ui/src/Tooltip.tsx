'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { HelpCircle } from 'lucide-react'

interface TooltipProps {
  content: string
  children?: React.ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={clsx('relative inline-flex', className)}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="cursor-help"
        tabIndex={0}
        role="button"
        aria-describedby="tooltip"
      >
        {children || <HelpCircle className="w-4 h-4 text-text-muted hover:text-text-secondary transition-colors" />}
      </div>
      {isVisible && (
        <div
          id="tooltip"
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-caption text-text-primary bg-surface-elevated border border-border rounded-lg shadow-card whitespace-nowrap z-50 animate-fade-in"
        >
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-surface-elevated" />
        </div>
      )}
    </div>
  )
}
