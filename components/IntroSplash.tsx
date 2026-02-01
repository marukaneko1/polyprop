'use client'

import { useState, useEffect } from 'react'
import { IntroLogoAnimation } from './IntroLogoAnimation'
import { useIntroOnce } from '@/hooks/useIntroOnce'

// Set to false to disable intro animation
const INTRO_ENABLED = true

export function IntroSplash() {
  const { shouldPlay, isChecking } = useIntroOnce()
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (INTRO_ENABLED && !isChecking && shouldPlay) {
      setShowAnimation(true)
    }
  }, [isChecking, shouldPlay])

  const handleComplete = () => {
    setShowAnimation(false)
    // Ensure body overflow is restored
    document.body.style.overflow = ''
  }

  // Don't render anything if disabled, checking, or not playing
  if (!INTRO_ENABLED || isChecking || !shouldPlay || !showAnimation) {
    return null
  }

  return (
    <IntroLogoAnimation
      mode="fullscreen"
      size={220}
      durationMs={2000}
      onComplete={handleComplete}
    />
  )
}
