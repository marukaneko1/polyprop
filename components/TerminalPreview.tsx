'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Shield, Activity } from 'lucide-react'
import { clsx } from 'clsx'

interface TerminalPreviewProps {
  variant?: 'hero' | 'full'
  className?: string
}

export function TerminalPreview({ variant = 'hero', className }: TerminalPreviewProps) {
  if (variant === 'hero') {
    return <HeroTerminal className={className} />
  }
  return <FullTerminal className={className} />
}

function HeroTerminal({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      className={clsx(
        'relative bg-surface/80 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-card',
        className
      )}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-elevated/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-caption text-text-muted font-mono ml-2">PolyProp Terminal</span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Account Equity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">Account Equity</span>
            <span className="text-body-sm font-mono text-accent">$53,240.00</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '66.5%' }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-accent to-cyan-400 rounded-full"
            />
          </div>
        </div>

        {/* Profit Target */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">Stage 1 Progress</span>
            <span className="text-body-sm font-mono text-emerald-400">6.48% / 15%</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '43.2%' }}
              transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            />
          </div>
        </div>

        {/* Drawdown Gauge */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">Trailing Drawdown</span>
            <span className="text-body-sm font-mono text-amber-400">2.1% / 8%</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '26.25%' }}
              transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
            />
          </div>
        </div>

        {/* Liquidity Guard Module */}
        <div className="mt-5 p-3 bg-surface-elevated/50 border border-border-subtle rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-accent" />
            <span className="text-caption font-medium text-text-primary">Liquidity Guard</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-caption text-text-muted">Est. Fill Price</p>
              <p className="text-body-sm font-mono text-text-primary">$0.542</p>
            </div>
            <div>
              <p className="text-caption text-text-muted">Available Liq.</p>
              <p className="text-body-sm font-mono text-text-primary">$24.8k</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FullTerminal({ className }: { className?: string }) {
  const markets = [
    { name: 'US Election Winner', price: 0.542, change: 2.4, volume: '$1.2M' },
    { name: 'Fed Rate Cut March', price: 0.234, change: -1.8, volume: '$890k' },
    { name: 'BTC > $100k EOY', price: 0.678, change: 5.2, volume: '$2.1M' },
    { name: 'GDP Growth Q2', price: 0.445, change: 0.3, volume: '$540k' },
  ]

  const orderBook = {
    bids: [
      { price: 0.540, size: 8420 },
      { price: 0.538, size: 12300 },
      { price: 0.535, size: 5800 },
      { price: 0.532, size: 15600 },
    ],
    asks: [
      { price: 0.542, size: 6200 },
      { price: 0.545, size: 9800 },
      { price: 0.548, size: 4300 },
      { price: 0.552, size: 11200 },
    ],
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={clsx(
        'bg-surface/80 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-card',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-elevated/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-caption text-text-muted font-mono ml-2">PolyProp Terminal v2.0</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-caption text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connected
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Market List */}
        <div className="p-4">
          <h4 className="text-caption font-medium text-text-muted mb-3">QUALIFIED MARKETS</h4>
          <div className="space-y-2">
            {markets.map((market) => (
              <div
                key={market.name}
                className="p-2.5 rounded-lg bg-surface-elevated/30 hover:bg-surface-elevated/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-sm text-text-primary truncate">{market.name}</span>
                  <span className="text-body-sm font-mono text-text-primary">${market.price.toFixed(3)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-caption text-text-muted">{market.volume}</span>
                  <span className={clsx(
                    'text-caption font-mono flex items-center gap-0.5',
                    market.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                  )}>
                    {market.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {market.change >= 0 ? '+' : ''}{market.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Book */}
        <div className="p-4">
          <h4 className="text-caption font-medium text-text-muted mb-3">ORDER BOOK DEPTH</h4>
          <div className="space-y-4">
            {/* Asks */}
            <div className="space-y-1">
              {orderBook.asks.reverse().map((ask, i) => (
                <div key={i} className="relative flex items-center justify-between text-caption font-mono py-1">
                  <div
                    className="absolute inset-0 bg-red-500/10 rounded"
                    style={{ width: `${(ask.size / 16000) * 100}%` }}
                  />
                  <span className="relative text-red-400">${ask.price.toFixed(3)}</span>
                  <span className="relative text-text-muted">{ask.size.toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            {/* Spread */}
            <div className="text-center py-2 border-y border-border">
              <span className="text-body font-mono text-accent">$0.542</span>
              <span className="text-caption text-text-muted ml-2">spread: 0.4%</span>
            </div>

            {/* Bids */}
            <div className="space-y-1">
              {orderBook.bids.map((bid, i) => (
                <div key={i} className="relative flex items-center justify-between text-caption font-mono py-1">
                  <div
                    className="absolute inset-0 bg-emerald-500/10 rounded"
                    style={{ width: `${(bid.size / 16000) * 100}%` }}
                  />
                  <span className="relative text-emerald-400">${bid.price.toFixed(3)}</span>
                  <span className="relative text-text-muted">{bid.size.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Ticket + Risk */}
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-caption font-medium text-text-muted mb-3">ORDER TICKET</h4>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-3 bg-emerald-500/20 text-emerald-400 rounded-lg text-body-sm font-medium border border-emerald-500/30">
                  BUY
                </button>
                <button className="flex-1 py-2 px-3 bg-surface-elevated text-text-muted rounded-lg text-body-sm font-medium border border-border">
                  SELL
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-surface-elevated/50 rounded-lg border border-border">
                  <span className="text-caption text-text-muted">Shares</span>
                  <span className="text-body-sm font-mono text-text-primary">500</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-surface-elevated/50 rounded-lg border border-border">
                  <span className="text-caption text-text-muted">Est. Cost</span>
                  <span className="text-body-sm font-mono text-text-primary">$271.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liquidity Guard Estimate */}
          <div className="p-3 bg-accent/5 border border-accent/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-caption font-medium text-accent">Liquidity Guard</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">Est. Fill Price</span>
                <span className="text-caption font-mono text-text-primary">$0.5424</span>
              </div>
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">Slippage</span>
                <span className="text-caption font-mono text-amber-400">+0.07%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">Liq. Consumed</span>
                <span className="text-caption font-mono text-text-primary">2.2%</span>
              </div>
            </div>
          </div>

          {/* Risk Status */}
          <div className="p-3 bg-surface-elevated/50 rounded-xl border border-border">
            <h4 className="text-caption font-medium text-text-muted mb-2">RISK STATUS</h4>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">DD Used</span>
                <span className="text-caption font-mono text-emerald-400">2.1% / 8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">Consistency</span>
                <span className="text-caption font-mono text-emerald-400">28% max</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
