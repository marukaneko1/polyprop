'use client'

import { motion } from 'framer-motion'
import { Activity, Filter, TrendingDown, PieChart, Terminal, Wallet } from 'lucide-react'
import { Section, SectionHeader, Card } from '@/components/ui'
import { features } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Activity,
  Filter,
  TrendingDown,
  PieChart,
  Terminal,
  Wallet,
}

export function Features() {
  return (
    <Section id="features">
      <SectionHeader
        title="Built Different"
        subtitle="Institutional-grade infrastructure for prediction market trading"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon]
          if (!Icon) return null
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card variant="feature" hover className="h-full p-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-h4 text-text-primary mb-2">{feature.title}</h3>
                <p className="text-body-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
