'use client'

import { useState, useEffect } from 'react'
import { IntroLogoAnimation } from './IntroLogoAnimation'

// Set to false to disable intro animation entirely
const INTRO_ENABLED = true

// Set to true to play only once per session, false to play on every page load
const PLAY_ONCE_PER_SESSION = false

const STORAGE_KEY = 'polyprop_intro_played'

export function IntroSplash() {
  const [showIntro, setShowIntro] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (!INTRO_ENABLED) {
      return
    }

    // Check if we should play
    if (PLAY_ONCE_PER_SESSION) {
      const hasPlayed = sessionStorage.getItem(STORAGE_KEY) === 'true'
      if (hasPlayed) {
        return
      }
      sessionStorage.setItem(STORAGE_KEY, 'true')
    }

    // Show the intro
    setShowIntro(true)
  }, [])

  const handleComplete = () => {
    setShowIntro(false)
  }

  // Don't render on server or if not mounted yet
  if (!mounted) {
    return null
  }

  // Don't render if intro is disabled or already completed
  if (!showIntro) {
    return null
  }

  return (
    <IntroLogoAnimation
      mode="fullscreen"
      size={200}
      durationMs={2000}
      onComplete={handleComplete}
    />
  )
}
