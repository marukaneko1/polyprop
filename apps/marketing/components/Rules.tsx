'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isHovered, setIsHovered] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const equityPath = "M 0 50 L 20 45 L 40 52 L 60 38 L 80 42 L 100 28 L 120 35 L 140 32 L 160 22 L 180 28 L 200 18"
  const drawdownPath = "M 0 60 L 40 60 L 60 50 L 80 50 L 100 40 L 140 40 L 160 35 L 200 35"

  return (
    <div 
      className="h-24 relative cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 200 80" className="w-full h-full">
        <defs>
          <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <motion.line 
          x1="0" y1="20" x2="200" y2="20" 
          stroke="currentColor" 
          className="text-border" 
          strokeDasharray="2,4"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 0.8 : 0.3 }}
        />
        <motion.line 
          x1="0" y1="40" x2="200" y2="40" 
          stroke="currentColor" 
          className="text-border" 
          strokeDasharray="2,4"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 0.8 : 0.3 }}
        />
        <motion.line 
          x1="0" y1="60" x2="200" y2="60" 
          stroke="currentColor" 
          className="text-border" 
          strokeDasharray="2,4"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 0.8 : 0.3 }}
        />
        
        {/* Gradient fill */}
        <motion.path
          d="M 0 50 L 20 45 L 40 52 L 60 38 L 80 42 L 100 28 L 120 35 L 140 32 L 160 22 L 180 28 L 200 18 L 200 80 L 0 80 Z"
          fill="url(#equityGradient)"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        />
        
        {/* Drawdown floor */}
        <motion.path
          d={drawdownPath}
          fill="none"
          stroke="currentColor"
          className="text-amber-500"
          initial={{ opacity: 0.6, strokeWidth: 2 }}
          animate={{ 
            opacity: isHovered ? 1 : 0.6,
            strokeWidth: isHovered ? 3 : 2
          }}
          strokeDasharray="4,4"
        />
        
        {/* Equity line with animation */}
        <motion.path
          d={equityPath}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeDasharray="400"
          strokeDashoffset={400 - (animationProgress / 100) * 400}
          initial={{ strokeWidth: 2.5 }}
          animate={{ 
            strokeWidth: isHovered ? 3.5 : 2.5
          }}
          style={{ filter: isHovered ? 'drop-shadow(0 0 4px rgb(34, 211, 238))' : 'none' }}
        />
        
        {/* Animated dot at the end */}
        <motion.circle
          cx={200}
          cy={18}
          r={3}
          fill="currentColor"
          className="text-accent"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: [1, 0.5, 1]
          }}
          transition={{
            scale: { duration: 1.5, repeat: Infinity },
            opacity: { duration: 1.5, repeat: Infinity }
          }}
        />
      </svg>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 flex justify-between text-caption text-text-muted"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <span>Start</span>
        <span>Time →</span>
      </motion.div>
    </div>
  )
}

function ConsistencyVisual() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const segments = [
    { label: 'Event A', value: 28, color: 'bg-accent', hoverColor: 'bg-accent/80' },
    { label: 'Event B', value: 24, color: 'bg-cyan-400', hoverColor: 'bg-cyan-400/80' },
    { label: 'Event C', value: 22, color: 'bg-teal-400', hoverColor: 'bg-teal-400/80' },
    { label: 'Event D', value: 18, color: 'bg-emerald-400', hoverColor: 'bg-emerald-400/80' },
    { label: 'Others', value: 8, color: 'bg-text-muted', hoverColor: 'bg-text-muted/80' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex h-5 rounded-full overflow-hidden shadow-inner">
        {segments.map((seg, index) => (
          <motion.div
            key={seg.label}
            className={hoveredIndex === index ? seg.hoverColor : seg.color}
            initial={{ width: 0 }}
            animate={{ width: `${seg.value}%` }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05, y: -2 }}
            style={{ 
              width: `${seg.value}%`,
              position: 'relative'
            }}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: -25 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-surface-elevated border border-accent/30 rounded-lg px-2 py-1 whitespace-nowrap shadow-lg z-10"
                >
                  <span className="text-caption font-medium text-accent">{seg.label}: {seg.value}%</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {segments.slice(0, 4).map((seg, index) => (
          <motion.div 
            key={seg.label} 
            className="flex items-center gap-1.5 text-caption text-text-muted cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className={`w-2 h-2 rounded-full ${seg.color}`}
              animate={{
                scale: hoveredIndex === index ? 1.3 : 1,
                boxShadow: hoveredIndex === index ? '0 0 8px rgba(34, 211, 238, 0.6)' : 'none'
              }}
            />
            <span>{seg.value}%</span>
          </motion.div>
        ))}
      </div>
      <motion.p 
        className="text-caption text-emerald-400 font-medium"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Max 40% per event • All segments under limit ✓
      </motion.p>
    </div>
  )
}

function LiquidityVisual() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [fillAnimation, setFillAnimation] = useState(false)
  
  const depths = [
    { price: '0.548', size: 35, label: 'Ask' },
    { price: '0.545', size: 60, label: 'Ask' },
    { price: '0.542', size: 40, current: true, label: 'Current' },
    { price: '0.540', size: 55, label: 'Bid' },
    { price: '0.538', size: 80, label: 'Bid' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFillAnimation(true)
      setTimeout(() => setFillAnimation(false), 1000)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-1.5">
      {depths.map((level, i) => {
        const isAsk = i < 2
        const isBid = i > 2
        
        return (
          <motion.div 
            key={level.price} 
            className="flex items-center gap-2 group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ x: 2 }}
          >
            <motion.span 
              className={`text-caption font-mono w-12 ${isAsk ? 'text-red-400' : 'text-emerald-400'}`}
              animate={{
                color: hoveredIndex === i 
                  ? (isAsk ? 'rgb(248, 113, 113)' : 'rgb(52, 211, 153)')
                  : (isAsk ? 'rgb(248, 113, 113)' : 'rgb(52, 211, 153)')
              }}
            >
              ${level.price}
            </motion.span>
            <div className="flex-1 h-4 bg-surface rounded relative overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded transition-all ${
                  isAsk ? 'bg-red-500/30' : 'bg-emerald-500/30'
                } ${level.current ? 'border-r-2 border-accent' : ''}`}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${level.size}%`,
                  opacity: hoveredIndex === i ? 1 : 0.8
                }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                {level.current && fillAnimation && (
                  <motion.div
                    className="absolute inset-0 bg-accent/50"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.div>
              
              {/* Size indicator on hover */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-caption font-mono text-text-primary"
                  >
                    {level.size}%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {level.current && (
              <motion.span 
                className="text-caption text-accent font-medium"
                animate={{ 
                  x: fillAnimation ? [-2, 2, -2, 0] : 0,
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  x: { duration: 0.4 },
                  opacity: { duration: 1.5, repeat: Infinity }
                }}
              >
                ← Fill
              </motion.span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
