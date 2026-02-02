'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, TrendingDown, DollarSign, 
  Target, Activity, BarChart3, PieChart, Calendar,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react'
import { clsx } from 'clsx'
import { AppHeader } from '@/components'

// Mock analytics data
const performanceData = {
  totalPnl: 3420.50,
  totalPnlPercent: 6.84,
  winRate: 63.8,
  totalTrades: 47,
  avgWin: 124.50,
  avgLoss: 78.20,
  profitFactor: 1.82,
  sharpeRatio: 1.45,
  maxDrawdown: 4.2,
  avgHoldTime: '4.2 hours',
  bestTrade: 342.50,
  worstTrade: -156.20,
}

const dailyPnl = [
  { date: 'Mon', pnl: 125.50 },
  { date: 'Tue', pnl: -45.20 },
  { date: 'Wed', pnl: 234.80 },
  { date: 'Thu', pnl: 89.30 },
  { date: 'Fri', pnl: -28.40 },
  { date: 'Sat', pnl: 156.70 },
  { date: 'Sun', pnl: 67.80 },
]

const marketBreakdown = [
  { name: 'US Election', trades: 12, pnl: 856.40, winRate: 75 },
  { name: 'Crypto Markets', trades: 15, pnl: 1234.20, winRate: 60 },
  { name: 'Economic Data', trades: 8, pnl: 456.80, winRate: 62.5 },
  { name: 'Sports', trades: 7, pnl: 523.10, winRate: 71.4 },
  { name: 'Other', trades: 5, pnl: 350.00, winRate: 60 },
]

const recentPerformance = [
  { period: 'Today', pnl: 125.50, trades: 3, winRate: 66.7 },
  { period: 'This Week', pnl: 600.50, trades: 12, winRate: 66.7 },
  { period: 'This Month', pnl: 2145.80, trades: 32, winRate: 62.5 },
  { period: 'All Time', pnl: 3420.50, trades: 47, winRate: 63.8 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month')

  const maxPnl = Math.max(...dailyPnl.map(d => Math.abs(d.pnl)))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader showStats={false} />

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Performance Analytics</h1>
            <p className="text-text-muted">Track your trading performance and identify patterns</p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex bg-surface border border-border rounded-lg p-0.5">
            {(['week', 'month', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={clsx(
                  'px-4 py-1.5 text-sm font-medium rounded capitalize transition-colors',
                  timeRange === range 
                    ? 'bg-surface-elevated text-text-primary' 
                    : 'text-text-muted hover:text-text-secondary'
                )}
              >
                {range === 'all' ? 'All Time' : `This ${range}`}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            icon={<DollarSign className="w-5 h-5" />}
            iconColor="text-accent"
            iconBg="bg-accent/10"
            label="Total P&L"
            value={`$${performanceData.totalPnl.toLocaleString()}`}
            change={performanceData.totalPnlPercent}
            changeLabel="return"
          />
          <MetricCard
            icon={<Target className="w-5 h-5" />}
            iconColor="text-success"
            iconBg="bg-success/10"
            label="Win Rate"
            value={`${performanceData.winRate}%`}
            subValue={`${performanceData.totalTrades} total trades`}
          />
          <MetricCard
            icon={<Activity className="w-5 h-5" />}
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10"
            label="Profit Factor"
            value={performanceData.profitFactor.toFixed(2)}
            subValue="Risk-adjusted return"
          />
          <MetricCard
            icon={<TrendingDown className="w-5 h-5" />}
            iconColor="text-warning"
            iconBg="bg-warning/10"
            label="Max Drawdown"
            value={`${performanceData.maxDrawdown}%`}
            subValue="Peak to trough"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Daily P&L Chart */}
          <div className="lg:col-span-2 bg-panel border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="font-semibold text-text-primary">Daily P&L</h2>
            </div>
            <div className="p-4">
              <div className="flex items-end justify-between h-48 gap-2">
                {dailyPnl.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full h-32 flex items-end justify-center">
                      <div
                        className={clsx(
                          'w-full max-w-[40px] rounded-t transition-all',
                          day.pnl >= 0 ? 'bg-success' : 'bg-error'
                        )}
                        style={{ height: `${(Math.abs(day.pnl) / maxPnl) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-muted">{day.date}</span>
                    <span className={clsx(
                      'text-xs font-mono',
                      day.pnl >= 0 ? 'text-success' : 'text-error'
                    )}>
                      {day.pnl >= 0 ? '+' : ''}${day.pnl.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-panel border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="font-semibold text-text-primary">Performance Summary</h2>
            </div>
            <div className="p-4 space-y-4">
              {recentPerformance.map((period, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-primary">{period.period}</p>
                    <p className="text-xs text-text-muted">{period.trades} trades • {period.winRate}% win</p>
                  </div>
                  <span className={clsx(
                    'font-mono font-medium',
                    period.pnl >= 0 ? 'text-success' : 'text-error'
                  )}>
                    {period.pnl >= 0 ? '+' : ''}${period.pnl.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Market Breakdown */}
          <div className="bg-panel border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="font-semibold text-text-primary">Performance by Market</h2>
            </div>
            <div className="divide-y divide-border">
              {marketBreakdown.map((market, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{market.name}</p>
                    <p className="text-xs text-text-muted">{market.trades} trades • {market.winRate}% win rate</p>
                  </div>
                  <span className={clsx(
                    'font-mono',
                    market.pnl >= 0 ? 'text-success' : 'text-error'
                  )}>
                    {market.pnl >= 0 ? '+' : ''}${market.pnl.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Stats */}
          <div className="bg-panel border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="font-semibold text-text-primary">Trading Statistics</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <StatItem label="Average Win" value={`$${performanceData.avgWin.toFixed(2)}`} positive />
              <StatItem label="Average Loss" value={`$${performanceData.avgLoss.toFixed(2)}`} positive={false} />
              <StatItem label="Best Trade" value={`$${performanceData.bestTrade.toFixed(2)}`} positive />
              <StatItem label="Worst Trade" value={`$${performanceData.worstTrade.toFixed(2)}`} positive={false} />
              <StatItem label="Sharpe Ratio" value={performanceData.sharpeRatio.toFixed(2)} />
              <StatItem label="Avg Hold Time" value={performanceData.avgHoldTime} />
              <StatItem label="Win/Loss Ratio" value={(performanceData.avgWin / performanceData.avgLoss).toFixed(2)} />
              <StatItem label="Expectancy" value={`$${((performanceData.winRate / 100 * performanceData.avgWin) - ((100 - performanceData.winRate) / 100 * performanceData.avgLoss)).toFixed(2)}`} positive />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function MetricCard({ 
  icon, 
  iconColor, 
  iconBg, 
  label, 
  value, 
  change,
  changeLabel,
  subValue 
}: { 
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  label: string
  value: string
  change?: number
  changeLabel?: string
  subValue?: string
}) {
  return (
    <div className="bg-panel border border-border rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', iconBg)}>
          <span className={iconColor}>{icon}</span>
        </div>
        <span className="text-sm text-text-muted">{label}</span>
      </div>
      <p className="text-2xl font-semibold font-mono text-text-primary">{value}</p>
      {change !== undefined && (
        <p className={clsx('text-sm mt-1 flex items-center gap-1', change >= 0 ? 'text-success' : 'text-error')}>
          {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {change >= 0 ? '+' : ''}{change}% {changeLabel}
        </p>
      )}
      {subValue && <p className="text-xs text-text-muted mt-1">{subValue}</p>}
    </div>
  )
}

function StatItem({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="p-3 bg-surface rounded-lg">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className={clsx(
        'text-lg font-mono font-medium',
        positive === true ? 'text-success' : positive === false ? 'text-error' : 'text-text-primary'
      )}>
        {value}
      </p>
    </div>
  )
}
