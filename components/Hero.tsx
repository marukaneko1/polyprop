'use client'

import { motion } from 'framer-motion'
import { Shield, BarChart3, Wallet } from 'lucide-react'
import { ButtonLink } from '@/components/ui'
import { TerminalPreview } from './TerminalPreview'

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-h1 sm:text-display text-text-primary tracking-tight text-balance"
            >
              The Prop Firm for{' '}
              <span className="text-accent">Prediction Markets</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-body-lg text-text-secondary max-w-xl"
            >
              Paid evaluations with institutional-grade execution. Hit your targets, 
              earn Partner status, and receive real payouts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <ButtonLink href="#pricing" size="lg">
                Start Challenge
              </ButtonLink>
              <ButtonLink href="#pricing" variant="secondary" size="lg">
                View Pricing
              </ButtonLink>
            </motion.div>

            {/* Trust Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            >
              <TrustItem icon={Shield} text="Liquidity-anchored execution" />
              <TrustItem icon={BarChart3} text="Consistency rules" />
              <TrustItem icon={Wallet} text="KYC at payout" />
            </motion.div>
          </motion.div>

          {/* Right Column - Terminal Preview */}
          <div className="lg:pl-8">
            <TerminalPreview variant="hero" className="w-full max-w-md mx-auto lg:max-w-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustItem({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 text-body-sm text-text-muted">
      <Icon className="w-4 h-4 text-accent/70" />
      <span>{text}</span>
    </div>
  )
}
