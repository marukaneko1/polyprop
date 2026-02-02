'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Shield, PieChart, AlertCircle, Lightbulb } from 'lucide-react'
import { Section, SectionHeader, Card } from '@/components/ui'

const tips = [
  {
    icon: Target,
    title: 'Start Small, Scale Gradually',
    content: 'Begin with smaller position sizes and scale up as you build confidence. The 8% trailing drawdown gives you room, but don\'t risk it all on one trade.',
  },
  {
    icon: PieChart,
    title: 'Respect the 40% Rule',
    content: 'Diversify across at least 3-4 different markets. No single event can contribute more than 40% of your profit target—plan your trades accordingly.',
  },
  {
    icon: Shield,
    title: 'Let Winners Run, Cut Losers Fast',
    content: 'The trailing drawdown locks in gains as your equity rises. Take profits on winning positions while they\'re hot, and exit losing trades quickly.',
  },
  {
    icon: TrendingUp,
    title: 'Focus on High-Liquidity Markets',
    content: 'Only markets with >$500k volume are tradable. These provide better fills and more reliable pricing through Liquidity Guard.',
  },
  {
    icon: AlertCircle,
    title: 'Track Your Drawdown Daily',
    content: 'Monitor your trailing drawdown constantly. It follows your high-water mark, so every new peak gives you more breathing room.',
  },
  {
    icon: Lightbulb,
    title: 'Use the Minimum Contract Rule Strategically',
    content: 'You need at least 10 unique contracts. Use this to force diversification—don\'t just trade 10 contracts on the same event.',
  },
]

export function University() {
  return (
    <Section id="university" background="gradient">
      <SectionHeader
        title="Tips & tricks"
        subtitle="Practical strategies to help you pass the challenge and trade profitably"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card hover className="p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-h4 text-text-primary mb-3">{tip.title}</h3>
                <p className="text-body-sm text-text-secondary leading-relaxed">{tip.content}</p>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
