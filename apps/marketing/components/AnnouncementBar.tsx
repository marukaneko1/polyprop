'use client'

import { ArrowRight } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="bg-accent/10 border-b border-accent/20">
      <div className="section-container">
        <a
          href="#pricing"
          className="flex items-center justify-center gap-2 py-2.5 text-caption text-accent hover:text-accent-hover transition-colors group"
        >
          <span className="hidden sm:inline">Now onboarding early testers</span>
          <span className="hidden sm:inline text-accent/50">•</span>
          <span>Liquidity-anchored fills</span>
          <span className="text-accent/50">•</span>
          <span className="hidden sm:inline">Payout-eligible simulations</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}
