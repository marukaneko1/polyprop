'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { motion, HTMLMotionProps } from 'framer-motion'

interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  children: React.ReactNode
  container?: boolean
  background?: 'default' | 'gradient' | 'elevated'
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ container = true, background = 'default', className, children, ...props }, ref) => {
    const bgStyles = {
      default: '',
      gradient: 'bg-section-gradient',
      elevated: 'bg-surface/30',
    }

    return (
      <motion.section
        ref={ref}
        className={clsx(
          'section-padding relative',
          bgStyles[background],
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        {...props}
      >
        {container ? (
          <div className="section-container">{children}</div>
        ) : (
          children
        )}
      </motion.section>
    )
  }
)

Section.displayName = 'Section'

// Section header component
interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={clsx(
      'mb-12 lg:mb-16',
      align === 'center' && 'text-center',
      className
    )}>
      <h2 className="section-title text-balance">{title}</h2>
      {subtitle && (
        <p className={clsx(
          'section-subtitle mt-4',
          align === 'center' && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
