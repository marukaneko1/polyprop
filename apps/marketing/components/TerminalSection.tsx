'use client'

import { Section, SectionHeader } from '@/components/ui'
import { TerminalPreview } from './TerminalPreview'

export function TerminalSection() {
  return (
    <Section id="terminal">
      <SectionHeader
        title="Pro-Grade Terminal"
        subtitle="Everything you need to analyze, execute, and manage risk in one interface"
      />

      <TerminalPreview variant="full" />
    </Section>
  )
}
