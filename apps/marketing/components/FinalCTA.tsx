'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui'

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-h1 sm:text-display text-text-primary mb-6">
            Ready to Prove Your Edge?
          </h2>
          
          <p className="text-body-lg text-text-secondary mb-8">
            Join the growing community of funded prediction market traders. 
            Start your evaluation today and show us what you can do.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/auth" size="lg">
              Start Challenge
              <ArrowRight className="w-5 h-5" />
            </ButtonLink>
            <ButtonLink href="/rules" variant="ghost" size="lg">
              Read the Rules
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
