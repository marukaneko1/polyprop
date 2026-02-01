'use client'

import { motion } from 'framer-motion'
import { TrendingDown, PieChart, Activity } from 'lucide-react'
import { Section, SectionHeader, Card } from '@/components/ui'

const rules = [
  {
    icon: TrendingDown,
    title: 'Trailing Drawdown',
    description: 'Your drawdown floor follows your equity high-water mark upward, but never down.',
    details: [
      'Starts at 8% below initial balance',
      'Rises as your account grows',
      'Locks in gains permanently',
      'Optional 10% with Drawdown Shield',
    ],
    visual: <DrawdownVisual />,
  },
  {
    icon: PieChart,
    title: '40% Consistency Rule',
    description: 'No single event can contribute more than 40% of your required profit target.',
    details: [
      'Prevents lucky one-off wins',
      'Forces diversified trading',
      'Proves repeatable edge',
      'Applies to Stage 1 & 2',
    ],
    visual: <ConsistencyVisual />,
  },
  {
    icon: Activity,
    title: 'Liquidity Guard',
    description: 'Orders consume visible liquidity from live order books for realistic execution.',
    details: [
      'Uses real market depth data',
      'Weighted average fill pricing',
      'No fantasy fills on thin markets',
      'Only qualified markets tradable',
    ],
    visual: <LiquidityVisual />,
  },
]

export function Rules() {
  return (
    <Section id="rules" background="elevated">
      <SectionHeader
        title="Rules That Reward Skill"
        subtitle="Our rules exist to ensure your edge is real, repeatable, and scalable"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {rules.map((rule, index) => (
          <motion.div
            key={rule.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <rule.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-h4 text-text-primary">{rule.title}</h3>
              </div>

              <p className="text-body-sm text-text-secondary mb-4">{rule.description}</p>

              {/* Visual */}
              <div className="mb-4 p-4 bg-surface-elevated/50 rounded-xl border border-border-subtle">
                {rule.visual}
              </div>

              {/* Details */}
              <ul className="space-y-2">
                {rule.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-body-sm text-text-muted">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function DrawdownVisual() {
  return (
    <div className="h-24 relative">
      {/* Equity line */}
      <svg viewBox="0 0 200 80" className="w-full h-full">
        {/* Grid lines */}
        <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" className="text-border" strokeDasharray="2,4" />
        <line x1="0" y1="40" x2="200" y2="40" stroke="currentColor" className="text-border" strokeDasharray="2,4" />
        <line x1="0" y1="60" x2="200" y2="60" stroke="currentColor" className="text-border" strokeDasharray="2,4" />
        
        {/* Drawdown floor */}
        <path
          d="M 0 60 L 40 60 L 60 50 L 80 50 L 100 40 L 140 40 L 160 35 L 200 35"
          fill="none"
          stroke="currentColor"
          className="text-amber-500/60"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
        
        {/* Equity */}
        <path
          d="M 0 50 L 20 45 L 40 52 L 60 38 L 80 42 L 100 28 L 120 35 L 140 32 L 160 22 L 180 28 L 200 18"
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="2"
        />
        
        {/* Gradient fill */}
        <defs>
          <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 50 L 20 45 L 40 52 L 60 38 L 80 42 L 100 28 L 120 35 L 140 32 L 160 22 L 180 28 L 200 18 L 200 80 L 0 80 Z"
          fill="url(#equityGradient)"
        />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-caption text-text-muted">
        <span>Start</span>
        <span>Time →</span>
      </div>
    </div>
  )
}

function ConsistencyVisual() {
  const segments = [
    { label: 'Event A', value: 28, color: 'bg-accent' },
    { label: 'Event B', value: 24, color: 'bg-cyan-400' },
    { label: 'Event C', value: 22, color: 'bg-teal-400' },
    { label: 'Event D', value: 18, color: 'bg-emerald-400' },
    { label: 'Others', value: 8, color: 'bg-text-muted' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex h-4 rounded-full overflow-hidden">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={seg.color}
            style={{ width: `${seg.value}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {segments.slice(0, 4).map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5 text-caption text-text-muted">
            <div className={`w-2 h-2 rounded-full ${seg.color}`} />
            <span>{seg.value}%</span>
          </div>
        ))}
      </div>
      <p className="text-caption text-text-muted">Max 40% per event • All segments under limit ✓</p>
    </div>
  )
}

function LiquidityVisual() {
  const depths = [
    { price: '0.548', size: 35 },
    { price: '0.545', size: 60 },
    { price: '0.542', size: 40, current: true },
    { price: '0.540', size: 55 },
    { price: '0.538', size: 80 },
  ]

  return (
    <div className="space-y-1.5">
      {depths.map((level, i) => (
        <div key={level.price} className="flex items-center gap-2">
          <span className={`text-caption font-mono w-12 ${i < 2 ? 'text-red-400' : 'text-emerald-400'}`}>
            ${level.price}
          </span>
          <div className="flex-1 h-3 bg-surface rounded relative overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded ${i < 2 ? 'bg-red-500/30' : 'bg-emerald-500/30'} ${level.current ? 'border-r-2 border-accent' : ''}`}
              style={{ width: `${level.size}%` }}
            />
          </div>
          {level.current && (
            <span className="text-caption text-accent">← Fill</span>
          )}
        </div>
      ))}
    </div>
  )
}
