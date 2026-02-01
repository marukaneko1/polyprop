'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { trustBadges } from '@/lib/constants'

export function TrustBadges() {
  return (
    <section className="py-12 border-y border-border/50 bg-surface/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-2 text-body-sm text-text-muted"
            >
              <Check className="w-4 h-4 text-accent" />
              <span>{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
