'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface IntroLogoAnimationProps {
  size?: number
  durationMs?: number
  onComplete?: () => void
  className?: string
  mode?: 'inline' | 'fullscreen'
}

// SVG path for the diamond logo - simplified single path
// Diamond shape with gap on right side
const DIAMOND_PATH = 'M 90 10 L 25 60 L 90 110 L 155 60 Z'
const PATH_LENGTH = 340

export function IntroLogoAnimation({
  size = 180,
  durationMs = 2000,
  onComplete,
  className,
  mode = 'inline',
}: IntroLogoAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState<'draw' | 'pop' | 'shrink' | 'done'>('draw')
  const [strokeOffset, setStrokeOffset] = useState(PATH_LENGTH)
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(0)

  const handleAnimationComplete = useCallback(() => {
    // Restore body scroll
    document.body.style.overflow = ''
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    // Lock scroll in fullscreen mode
    if (mode === 'fullscreen') {
      document.body.style.overflow = 'hidden'
    }

    const startTime = Date.now()
    let animationFrame: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      // Phase 1: Draw (0% - 60%)
      if (progress < 0.6) {
        setAnimationPhase('draw')
        // Fade in quickly at start
        const fadeProgress = Math.min(progress / 0.1, 1)
        setOpacity(fadeProgress)
        // Draw the stroke
        const drawProgress = progress / 0.6
        const eased = 1 - Math.pow(1 - drawProgress, 3) // ease out cubic
        setStrokeOffset(PATH_LENGTH * (1 - eased))
        setScale(1)
      }
      // Phase 2: Pop (60% - 80%)
      else if (progress < 0.8) {
        setAnimationPhase('pop')
        setOpacity(1)
        setStrokeOffset(0)
        const popProgress = (progress - 0.6) / 0.2
        // Scale up then slightly back: 1 → 1.1 → 1.05
        if (popProgress < 0.5) {
          setScale(1 + 0.1 * (popProgress * 2))
        } else {
          setScale(1.1 - 0.05 * ((popProgress - 0.5) * 2))
        }
      }
      // Phase 3: Shrink (80% - 100%)
      else {
        setAnimationPhase('shrink')
        const shrinkProgress = (progress - 0.8) / 0.2
        const eased = shrinkProgress * shrinkProgress // ease in quad
        setScale(1.05 * (1 - eased))
        setOpacity(1 - eased)
        setStrokeOffset(0)
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setAnimationPhase('done')
        handleAnimationComplete()
      }
    }

    // Start animation after a tiny delay to ensure component is mounted
    const startTimeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate)
    }, 50)

    return () => {
      clearTimeout(startTimeout)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      document.body.style.overflow = ''
    }
  }, [durationMs, mode, handleAnimationComplete])

  // Don't render if animation is done in fullscreen mode
  if (animationPhase === 'done' && mode === 'fullscreen') {
    return null
  }

  const containerClasses = clsx(
    'flex items-center justify-center',
    mode === 'fullscreen' && 'fixed inset-0 z-[9999] bg-[#09090b]',
    className
  )

  return (
    <div className={containerClasses}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 180 120"
        style={{
          opacity,
          transform: `scale(${scale})`,
          transition: 'none',
        }}
      >
        <defs>
          {/* Gradient for stroke */}
          <linearGradient id="introLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="introGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Diamond path */}
        <path
          d={DIAMOND_PATH}
          fill="none"
          stroke="url(#introLogoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#introGlow)"
          style={{
            strokeDasharray: PATH_LENGTH,
            strokeDashoffset: strokeOffset,
          }}
        />
      </svg>
    </div>
  )
}
