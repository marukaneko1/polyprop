'use client'

/**
 * IntroLogoAnimation - Premium 2-second logo intro animation
 * 
 * Timeline:
 * - 0.00-0.25s: Blank (invisible)
 * - 0.25-1.35s: Trace/draw stroke from top to gap
 * - 1.35-1.65s: Pop with 3D tilt (scale 1 → 1.08 → 1.03)
 * - 1.65-2.00s: Shrink to 0 scale and fade out
 * 
 * @example
 * // Inline usage in Hero
 * <IntroLogoAnimation mode="inline" size={220} />
 * 
 * @example
 * // Fullscreen splash (already integrated in layout.tsx)
 * <IntroLogoAnimation mode="fullscreen" size={220} onComplete={() => console.log('Done')} />
 */

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { clsx } from 'clsx'

interface IntroLogoAnimationProps {
  size?: number
  durationMs?: number
  onComplete?: () => void
  className?: string
  mode?: 'inline' | 'fullscreen'
}

// SVG paths for the diamond logo
// ViewBox is 180x120, so center is at 90x60
// Diamond shape: top at (90, 20), left at (30, 60), bottom at (90, 100), right at (150, 60)
// Gap is on right side between (150, 45) and (150, 75)
// Top dot extends from (90, 20) to (110, 20)

// Main path: starts at top apex, goes down left, to bottom, up right (lower segment) to gap
// M 90 20 (top) → L 30 60 (left) → L 90 100 (bottom) → L 150 75 (right lower, at gap)
const MAIN_PATH = 'M 90 20 L 30 60 L 90 100 L 150 75'

// Upper right segment: from gap up to top right
// M 150 45 (right upper, at gap) → L 150 60 (top right)
const UPPER_RIGHT_PATH = 'M 150 45 L 150 60'

// Top dot: small horizontal line at apex
// M 90 20 (apex) → L 110 20 (dot end)
const TOP_DOT_PATH = 'M 90 20 L 110 20'

// Calculate approximate path lengths (using distance formula)
// Main: ~240px, Upper right: ~15px, Top dot: ~20px
const MAIN_PATH_LENGTH = 240
const UPPER_RIGHT_PATH_LENGTH = 15
const TOP_DOT_PATH_LENGTH = 20
const TOTAL_PATH_LENGTH = MAIN_PATH_LENGTH + UPPER_RIGHT_PATH_LENGTH + TOP_DOT_PATH_LENGTH

export function IntroLogoAnimation({
  size = 180,
  durationMs = 2000,
  onComplete,
  className,
  mode = 'inline',
}: IntroLogoAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  // Timeline values
  const time = useMotionValue(0)
  const progress = useTransform(time, [0, durationMs], [0, 1])
  
  // Phase 1: Blank (0-0.25s / 0-12.5%)
  const phase1End = 0.125
  // Phase 2: Trace (0.25-1.35s / 12.5-67.5%)
  const phase2Start = 0.125
  const phase2End = 0.675
  // Phase 3: Pop (1.35-1.65s / 67.5-82.5%)
  const phase3Start = 0.675
  const phase3End = 0.825
  // Phase 4: Shrink (1.65-2.0s / 82.5-100%)
  const phase4Start = 0.825

  // Opacity: fade in at phase 2 start, fade out at phase 4
  const opacity = useTransform(progress, (p) => {
    if (p < phase2Start) return 0
    if (p < phase4Start) return 1
    // Fade out during shrink
    return 1 - (p - phase4Start) / (1 - phase4Start)
  })

  // Stroke dash offset: full → 0 during trace phase
  const getStrokeDashoffset = (pathLength: number, totalLength: number) => {
    return useTransform(progress, (p) => {
      if (p < phase2Start) return pathLength
      if (p > phase2End) return 0
      const traceProgress = (p - phase2Start) / (phase2End - phase2Start)
      // Ease in-out cubic
      const eased = traceProgress < 0.5
        ? 4 * traceProgress * traceProgress * traceProgress
        : 1 - Math.pow(-2 * traceProgress + 2, 3) / 2
      return pathLength * (1 - eased)
    })
  }

  const mainOffset = getStrokeDashoffset(MAIN_PATH_LENGTH, TOTAL_PATH_LENGTH)
  const upperRightOffset = useTransform(progress, (p) => {
    if (p < phase2Start) return UPPER_RIGHT_PATH_LENGTH
    if (p > phase2End) return 0
    const traceProgress = (p - phase2Start) / (phase2End - phase2Start)
    // Start upper right segment after main path is 85% done
    if (traceProgress < 0.85) return UPPER_RIGHT_PATH_LENGTH
    const segmentProgress = (traceProgress - 0.85) / 0.15
    const eased = segmentProgress < 0.5
      ? 4 * segmentProgress * segmentProgress * segmentProgress
      : 1 - Math.pow(-2 * segmentProgress + 2, 3) / 2
    return UPPER_RIGHT_PATH_LENGTH * (1 - eased)
  })
  const topDotOffset = useTransform(progress, (p) => {
    if (p < phase2Start) return TOP_DOT_PATH_LENGTH
    if (p > phase2End) return 0
    const traceProgress = (p - phase2Start) / (phase2End - phase2Start)
    // Start top dot after main path is 90% done
    if (traceProgress < 0.90) return TOP_DOT_PATH_LENGTH
    const segmentProgress = (traceProgress - 0.90) / 0.10
    const eased = segmentProgress < 0.5
      ? 4 * segmentProgress * segmentProgress * segmentProgress
      : 1 - Math.pow(-2 * segmentProgress + 2, 3) / 2
    return TOP_DOT_PATH_LENGTH * (1 - eased)
  })

  // Scale: 1 → 1.08 → 1.03 (pop) → 0 (shrink)
  const scale = useTransform(progress, (p) => {
    if (p < phase2End) return 1
    if (p < phase3Start) return 1
    if (p < phase3End) {
      // Pop phase: 1 → 1.08 → 1.03
      const popProgress = (p - phase3Start) / (phase3End - phase3Start)
      if (popProgress < 0.5) {
        // Up to peak
        return 1 + 0.08 * (popProgress * 2)
      } else {
        // Overshoot back
        return 1.08 - 0.05 * ((popProgress - 0.5) * 2)
      }
    }
    // Shrink phase: 1.03 → 0
    const shrinkProgress = (p - phase4Start) / (1 - phase4Start)
    const easedShrink = 1 - Math.pow(shrinkProgress, 2) // Ease out
    return 1.03 * (1 - easedShrink)
  })

  // 3D tilt: rotateX and rotateY during pop
  const rotateX = useTransform(progress, (p) => {
    if (p < phase3Start || p > phase3End) return 0
    const popProgress = (p - phase3Start) / (phase3End - phase3Start)
    // -6deg peak at middle, back to 0
    return -6 * Math.sin(popProgress * Math.PI)
  })

  const rotateY = useTransform(progress, (p) => {
    if (p < phase3Start || p > phase3End) return 0
    const popProgress = (p - phase3Start) / (phase3End - phase3Start)
    // 6deg peak at middle, back to 0
    return 6 * Math.sin(popProgress * Math.PI)
  })

  useEffect(() => {
    // Initialize time to 0
    time.set(0)
    
    // Animate time from 0 to durationMs
    const startTime = Date.now()
    let animationFrame: number
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const currentTime = Math.min(elapsed, durationMs)
      time.set(currentTime)
      
      if (elapsed < durationMs) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        // Animation complete
        setTimeout(() => {
          setIsVisible(false)
          onComplete?.()
        }, 50)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [durationMs, time, onComplete])

  // Prevent scroll in fullscreen mode
  useEffect(() => {
    if (mode === 'fullscreen' && isVisible) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [mode, isVisible])

  if (!isVisible && mode === 'fullscreen') {
    return null
  }

  const containerClasses = clsx(
    'flex items-center justify-center',
    mode === 'fullscreen' && 'fixed inset-0 z-[100] bg-background',
    className
  )

  return (
    <div 
      className={containerClasses}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 180 120"
        className="relative"
        style={{
          opacity,
          scale,
          rotateX,
          rotateY,
        }}
      >
        <defs>
          {/* Gradient for stroke */}
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#e0f2fe" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Drop shadow */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main logo path (left side + bottom + right lower) */}
        <motion.path
          d={MAIN_PATH}
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow) url(#shadow)"
          style={{
            strokeDasharray: MAIN_PATH_LENGTH,
            strokeDashoffset: mainOffset,
          }}
        />
        
        {/* Upper right segment */}
        <motion.path
          d={UPPER_RIGHT_PATH}
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow) url(#shadow)"
          style={{
            strokeDasharray: UPPER_RIGHT_PATH_LENGTH,
            strokeDashoffset: upperRightOffset,
          }}
        />
        
        {/* Top dot */}
        <motion.path
          d={TOP_DOT_PATH}
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow) url(#shadow)"
          style={{
            strokeDasharray: TOP_DOT_PATH_LENGTH,
            strokeDashoffset: topDotOffset,
          }}
        />
      </motion.svg>
    </div>
  )
}
