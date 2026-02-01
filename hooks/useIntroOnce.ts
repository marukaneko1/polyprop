'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'polyprop_intro_played'

export function useIntroOnce() {
  const [shouldPlay, setShouldPlay] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if intro has been played this session
    const played = sessionStorage.getItem(STORAGE_KEY) === 'true'
    
    if (!played) {
      setShouldPlay(true)
      // Mark as played immediately
      sessionStorage.setItem(STORAGE_KEY, 'true')
    }
    
    setIsChecking(false)
  }, [])

  return { shouldPlay, isChecking }
}
