'use client'

import { IntroLogoAnimation } from './IntroLogoAnimation'
import { useIntroOnce } from '@/hooks/useIntroOnce'

export function IntroSplash() {
  const { shouldPlay, isChecking } = useIntroOnce()

  if (isChecking || !shouldPlay) {
    return null
  }

  return (
    <IntroLogoAnimation
      mode="fullscreen"
      size={220}
      durationMs={2000}
    />
  )
}
