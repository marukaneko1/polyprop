'use client'

import { useState } from 'react'
import { 
  TrendingUp, TrendingDown, Maximize2, Settings, 
  BarChart2, CandlestickChart, LineChart, Minus, Plus 
} from 'lucide-react'
import { clsx } from 'clsx'

interface ChartPanelProps {
  symbol: string
  name?: string
  price: number
  change: number
  high: number
  low: number
  volume: string
}

type ChartType = 'candle' | 'line' | 'bar'
type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'

export function ChartPanel({ symbol, name, price, change, high, low, volume }: ChartPanelProps) {
  const [chartType, setChartType] = useState<ChartType>('candle')
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1h')

  const timeFrames: TimeFrame[] = ['1m', '5m', '15m', '1h', '4h', '1d', '1w']

  return (
    <div className="h-full flex flex-col bg-panel border border-border">
      {/* Chart Header - Row 1: Market Info */}
      <div className="px-3 py-2 border-b border-border">
        {/* Top: Market name and price */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="min-w-0 flex-1">
            <h2 className="font-medium text-text-primary text-sm leading-tight line-clamp-2" title={name || symbol}>
              {name || symbol}
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xl font-mono font-semibold text-text-primary">
              {(price * 100).toFixed(1)}%
            </span>
            <span className={clsx(
              'flex items-center gap-0.5 text-xs font-mono',
              change >= 0 ? 'text-success' : 'text-error'
            )}>
              {change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Bottom: Stats + Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Yes/No + Stats */}
          <div className="flex items-center gap-4 text-xs overflow-x-auto">
            <span className="flex-shrink-0">
              <span className="text-success font-mono">Yes {(price * 100).toFixed(0)}¢</span>
              <span className="text-text-muted mx-1">•</span>
              <span className="text-error font-mono">No {((1 - price) * 100).toFixed(0)}¢</span>
            </span>
            <span className="text-text-muted flex-shrink-0">|</span>
            <span className="text-text-muted flex-shrink-0">H: <span className="font-mono text-text-secondary">{(high * 100).toFixed(0)}¢</span></span>
            <span className="text-text-muted flex-shrink-0">L: <span className="font-mono text-text-secondary">{(low * 100).toFixed(0)}¢</span></span>
            <span className="text-text-muted flex-shrink-0">Vol: <span className="font-mono text-text-secondary">{volume}</span></span>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Time Frame Selector */}
            <div className="hidden sm:flex bg-surface rounded p-0.5">
              {timeFrames.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFrame(tf)}
                  className={clsx(
                    'px-2 py-1 text-xs font-medium rounded transition-colors',
                    timeFrame === tf 
                      ? 'bg-surface-elevated text-text-primary' 
                      : 'text-text-muted hover:text-text-secondary'
                  )}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Type */}
            <div className="hidden sm:flex bg-surface rounded p-0.5">
              <button
                onClick={() => setChartType('candle')}
                className={clsx(
                  'p-1.5 rounded transition-colors',
                  chartType === 'candle' ? 'bg-surface-elevated text-text-primary' : 'text-text-muted hover:text-text-secondary'
                )}
              >
                <CandlestickChart className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartType('line')}
                className={clsx(
                  'p-1.5 rounded transition-colors',
                  chartType === 'line' ? 'bg-surface-elevated text-text-primary' : 'text-text-muted hover:text-text-secondary'
                )}
              >
                <LineChart className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={clsx(
                  'p-1.5 rounded transition-colors',
                  chartType === 'bar' ? 'bg-surface-elevated text-text-primary' : 'text-text-muted hover:text-text-secondary'
                )}
              >
                <BarChart2 className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <button className="p-1.5 text-text-muted hover:text-text-primary transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-text-muted hover:text-text-primary transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Area - Placeholder */}
      <div className="flex-1 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Placeholder Chart Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-surface-elevated/50 flex items-center justify-center">
              <CandlestickChart className="w-8 h-8 text-accent/50" />
            </div>
            <p className="text-text-muted text-sm">Chart visualization</p>
            <p className="text-text-muted/50 text-xs mt-1">Coming soon</p>
          </div>
        </div>

        {/* Price Scale (Right) */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-surface/50 border-l border-border flex flex-col justify-between py-4 text-[10px] font-mono text-text-muted">
          <span className="px-2">${Math.min(1, price * 1.1).toFixed(3)}</span>
          <span className="px-2">${Math.min(1, price * 1.05).toFixed(3)}</span>
          <span className="px-2 text-accent">${price.toFixed(3)}</span>
          <span className="px-2">${Math.max(0, price * 0.95).toFixed(3)}</span>
          <span className="px-2">${Math.max(0, price * 0.9).toFixed(3)}</span>
        </div>

        {/* Time Scale (Bottom) */}
        <div className="absolute bottom-0 left-0 right-16 h-6 bg-surface/50 border-t border-border flex items-center justify-between px-4 text-[10px] font-mono text-text-muted">
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
          <span>21:00</span>
        </div>
      </div>
    </div>
  )
}
