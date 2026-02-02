'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [equity, setEquity] = useState(53240)
  const [stage1Progress, setStage1Progress] = useState(6.48)
  const [drawdown, setDrawdown] = useState(2.1)
  const [animateValues, setAnimateValues] = useState(false)

  // Simulate live updates every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateValues(true)
      setEquity(prev => prev + Math.floor(Math.random() * 200 - 50))
      setStage1Progress(prev => Math.min(15, prev + (Math.random() * 0.3)))
      setDrawdown(prev => Math.max(0, Math.min(8, prev + (Math.random() * 0.4 - 0.2))))
      
      setTimeout(() => setAnimateValues(false), 600)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  const equityPercent = (equity / 80000) * 100
  const stage1Percent = (stage1Progress / 15) * 100
  const drawdownPercent = (drawdown / 8) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      className={clsx(
        'relative bg-surface/80 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300',
        className
      )}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-accent/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-elevated/50">
        <div className="flex gap-1.5">
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-red-500/60"
            whileHover={{ scale: 1.3 }}
          />
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"
            whileHover={{ scale: 1.3 }}
          />
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-green-500/60"
            whileHover={{ scale: 1.3 }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className="text-caption text-text-muted font-mono ml-2">PolyProp Terminal</span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Account Equity */}
        <motion.div 
          className="space-y-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">Account Equity</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={equity}
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: animateValues ? [1, 1.1, 1] : 1,
                  color: animateValues ? ['#22d3ee', '#06b6d4', '#22d3ee'] : '#22d3ee'
                }}
                exit={{ opacity: 0, y: 10 }}
                className="text-body-sm font-mono text-accent"
              >
                ${equity.toLocaleString()}.00
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${equityPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-accent to-cyan-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Profit Target */}
        <motion.div 
          className="space-y-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">Stage 1 Progress</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={stage1Progress.toFixed(2)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: animateValues ? [1, 1.1, 1] : 1
                }}
                exit={{ opacity: 0, y: 10 }}
                className="text-body-sm font-mono text-emerald-400"
              >
                {stage1Progress.toFixed(2)}% / 15%
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${stage1Percent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Drawdown Gauge */}
        <motion.div 
          className="space-y-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">Trailing Drawdown</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={drawdown.toFixed(1)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: animateValues ? [1, 1.1, 1] : 1
                }}
                exit={{ opacity: 0, y: 10 }}
                className="text-body-sm font-mono text-amber-400"
              >
                {drawdown.toFixed(1)}% / 8%
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${drawdownPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Liquidity Guard Module */}
        <motion.div 
          className="mt-5 p-3 bg-surface-elevated/50 border border-border-subtle rounded-xl hover:bg-surface-elevated/70 hover:border-accent/20 transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Activity className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-caption font-medium text-text-primary">Liquidity Guard</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-caption text-text-muted">Est. Fill Price</p>
              <motion.p 
                className="text-body-sm font-mono text-text-primary"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                $0.542
              </motion.p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-caption text-text-muted">Available Liq.</p>
              <p className="text-body-sm font-mono text-text-primary">$24.8k</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function FullTerminal({ className }: { className?: string }) {
  const [selectedMarket, setSelectedMarket] = useState(0)
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy')
  const [shares, setShares] = useState(500)
  const [animatePrice, setAnimatePrice] = useState(false)

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

  const currentMarket = markets[selectedMarket]
  const estimatedCost = (shares * currentMarket.price).toFixed(2)
  const fillPrice = (currentMarket.price * 1.0007).toFixed(4)
  const slippage = ((parseFloat(fillPrice) / currentMarket.price - 1) * 100).toFixed(2)

  // Animate price changes periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatePrice(true)
      setTimeout(() => setAnimatePrice(false), 600)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
            {markets.map((market, index) => (
              <motion.div
                key={market.name}
                onClick={() => setSelectedMarket(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  'p-2.5 rounded-lg transition-all cursor-pointer',
                  selectedMarket === index 
                    ? 'bg-accent/10 border border-accent/30' 
                    : 'bg-surface-elevated/30 hover:bg-surface-elevated/50 border border-transparent'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-sm text-text-primary truncate">{market.name}</span>
                  <motion.span 
                    className="text-body-sm font-mono text-text-primary"
                    animate={animatePrice ? { scale: [1, 1.1, 1], color: ['#fafafa', '#22d3ee', '#fafafa'] } : {}}
                  >
                    ${market.price.toFixed(3)}
                  </motion.span>
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
              </motion.div>
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
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative flex items-center justify-between text-caption font-mono py-1 rounded hover:bg-red-500/5 cursor-pointer transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-red-500/10 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${(ask.size / 16000) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                  <span className="relative text-red-400">${ask.price.toFixed(3)}</span>
                  <span className="relative text-text-muted">{ask.size.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Spread */}
            <div className="text-center py-2 border-y border-border">
              <motion.span 
                className="text-body font-mono text-accent"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                $0.542
              </motion.span>
              <span className="text-caption text-text-muted ml-2">spread: 0.4%</span>
            </div>

            {/* Bids */}
            <div className="space-y-1">
              {orderBook.bids.map((bid, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 4) * 0.05 }}
                  className="relative flex items-center justify-between text-caption font-mono py-1 rounded hover:bg-emerald-500/5 cursor-pointer transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-emerald-500/10 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${(bid.size / 16000) * 100}%` }}
                    transition={{ duration: 0.8, delay: (i + 4) * 0.05 }}
                  />
                  <span className="relative text-emerald-400">${bid.price.toFixed(3)}</span>
                  <span className="relative text-text-muted">{bid.size.toLocaleString()}</span>
                </motion.div>
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
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOrderSide('buy')}
                  className={clsx(
                    'flex-1 py-2 px-3 rounded-lg text-body-sm font-medium border transition-all',
                    orderSide === 'buy'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-surface-elevated text-text-muted border-border hover:border-emerald-500/20'
                  )}
                >
                  BUY
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOrderSide('sell')}
                  className={clsx(
                    'flex-1 py-2 px-3 rounded-lg text-body-sm font-medium border transition-all',
                    orderSide === 'sell'
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-surface-elevated text-text-muted border-border hover:border-red-500/20'
                  )}
                >
                  SELL
                </motion.button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-surface-elevated/50 rounded-lg border border-border hover:border-accent/30 transition-colors cursor-pointer group">
                  <span className="text-caption text-text-muted">Shares</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShares(Math.max(100, shares - 100))}
                      className="w-5 h-5 flex items-center justify-center rounded bg-surface hover:bg-accent/20 text-text-muted hover:text-accent transition-all opacity-0 group-hover:opacity-100"
                    >
                      −
                    </button>
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={shares}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-body-sm font-mono text-text-primary min-w-[3rem] text-center"
                      >
                        {shares}
                      </motion.span>
                    </AnimatePresence>
                    <button 
                      onClick={() => setShares(shares + 100)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-surface hover:bg-accent/20 text-text-muted hover:text-accent transition-all opacity-0 group-hover:opacity-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-surface-elevated/50 rounded-lg border border-border">
                  <span className="text-caption text-text-muted">Est. Cost</span>
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={estimatedCost}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-body-sm font-mono text-text-primary"
                    >
                      ${estimatedCost}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Liquidity Guard Estimate */}
          <motion.div 
            className="p-3 bg-accent/5 border border-accent/20 rounded-xl hover:bg-accent/10 hover:border-accent/30 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-caption font-medium text-accent">Liquidity Guard</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">Est. Fill Price</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={fillPrice}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-caption font-mono text-text-primary"
                  >
                    ${fillPrice}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">Slippage</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={slippage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-caption font-mono text-amber-400"
                  >
                    +{slippage}%
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex justify-between">
                <span className="text-caption text-text-muted">Liq. Consumed</span>
                <span className="text-caption font-mono text-text-primary">2.2%</span>
              </div>
            </div>
          </motion.div>

          {/* Risk Status */}
          <motion.div 
            className="p-3 bg-surface-elevated/50 rounded-xl border border-border hover:border-accent/20 transition-all cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
