'use client'

import { useState, useEffect } from 'react'
import { IntroLogoAnimation } from './IntroLogoAnimation'
import { useIntroOnce } from '@/hooks/useIntroOnce'

export function IntroSplash() {
  const { shouldPlay, isChecking } = useIntroOnce()
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (!isChecking && shouldPlay) {
      setShowAnimation(true)
    }
  }, [isChecking, shouldPlay])

  const handleComplete = () => {
    setShowAnimation(false)
  }

  if (isChecking || !shouldPlay || !showAnimation) {
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
