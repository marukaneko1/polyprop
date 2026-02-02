'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, TrendingDown, DollarSign, Target, Shield, 
  BarChart3, Activity, ArrowRight, Clock, AlertTriangle,
  CheckCircle, Bell, Loader2
} from 'lucide-react'
import { clsx } from 'clsx'
import { AppHeader } from '@/components'
import { useMarkets } from '@/lib/usePolymarket'

// Mock data - will be replaced with real data from database
const accountData = {
  balance: 50000,
  equity: 53420.50,
  unrealizedPnl: 420.50,
  realizedPnl: 3000,
  stage: 1,
  profitProgress: 6.84,
  profitTarget: 15,
  drawdownUsed: 2.1,
  drawdownLimit: 8,
  consistencyMax: 28,
  consistencyLimit: 40,
  totalTrades: 47,
  winRate: 63.8,
  avgWin: 124.50,
  avgLoss: 78.20,
  profitFactor: 1.82,
}

const positions = [
  { id: '1', symbol: 'WKB', name: 'Will Keegan Bradley win...', side: 'long', size: 500, entry: 0.0075, current: 0.0082, pnl: 3.50, pnlPercent: 9.33 },
  { id: '2', symbol: 'BTC', name: 'BTC > $100k EOY', side: 'long', size: 300, entry: 0.678, current: 0.685, pnl: 2.10, pnlPercent: 1.03 },
]

const recentTrades = [
  { id: '1', symbol: 'USELEC', side: 'buy', size: 500, price: 0.542, pnl: 12.50, time: '2 hours ago' },
  { id: '2', symbol: 'FEDMAR', side: 'sell', size: 300, price: 0.234, pnl: -5.20, time: '5 hours ago' },
  { id: '3', symbol: 'GDP', side: 'buy', size: 400, price: 0.445, pnl: 8.80, time: '1 day ago' },
]

const notifications = [
  { id: '1', type: 'success', message: 'Order filled: Buy 500 USELEC @ $0.542', time: '2 hours ago' },
  { id: '2', type: 'warning', message: 'Approaching 50% of drawdown limit', time: '1 day ago' },
  { id: '3', type: 'info', message: 'New market available: Fed Rate Cut March', time: '2 days ago' },
]

export default function DashboardPage() {
  const { markets: polyMarkets, loading: marketsLoading } = useMarkets(10)
  
  // Get top 5 markets by volume for "Hot Markets"
  const hotMarkets = polyMarkets.slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader 
        accountBalance={accountData.balance}
        accountEquity={accountData.equity}
        unrealizedPnl={accountData.unrealizedPnl}
      />

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Welcome back, Trader</h1>
          <p className="text-text-muted">
            You're in <span className="text-accent font-medium">Stage {accountData.stage}</span> of your evaluation. 
            Keep trading to hit your {accountData.profitTarget}% profit target.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            iconColor="text-accent"
            iconBg="bg-accent/10"
            label="Account Equity"
            value={`$${accountData.equity.toLocaleString()}`}
            subValue={
              <span className={accountData.unrealizedPnl >= 0 ? 'text-success' : 'text-error'}>
                {accountData.unrealizedPnl >= 0 ? '+' : ''}${accountData.unrealizedPnl.toFixed(2)} unrealized
              </span>
            }
          />
          <StatCard
            icon={<Target className="w-5 h-5" />}
            iconColor="text-success"
            iconBg="bg-success/10"
            label="Profit Progress"
            value={`${accountData.profitProgress}%`}
            progress={{ value: accountData.profitProgress, max: accountData.profitTarget, color: 'bg-success' }}
            subValue={`Target: ${accountData.profitTarget}%`}
          />
          <StatCard
            icon={<Shield className="w-5 h-5" />}
            iconColor="text-warning"
            iconBg="bg-warning/10"
            label="Drawdown Used"
            value={`${accountData.drawdownUsed}%`}
            progress={{ value: accountData.drawdownUsed, max: accountData.drawdownLimit, color: 'bg-warning' }}
            subValue={`Limit: ${accountData.drawdownLimit}%`}
          />
          <StatCard
            icon={<BarChart3 className="w-5 h-5" />}
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10"
            label="Win Rate"
            value={`${accountData.winRate}%`}
            subValue={`${accountData.totalTrades} total trades`}
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Open Positions */}
          <div className="lg:col-span-2 bg-panel border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-text-primary">Open Positions</h2>
              <Link href="/trade" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
                Trade <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {positions.length > 0 ? (
                positions.map(pos => (
                  <div key={pos.id} className="px-4 py-3 flex items-center justify-between hover:bg-surface-elevated/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={clsx(
                        'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase',
                        pos.side === 'long' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      )}>
                        {pos.side}
                      </span>
                      <div>
                        <p className="font-medium text-text-primary">{pos.symbol}</p>
                        <p className="text-xs text-text-muted truncate max-w-[200px]">{pos.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={clsx('font-mono', pos.pnl >= 0 ? 'text-success' : 'text-error')}>
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                      </p>
                      <p className="text-xs text-text-muted">{pos.size} shares</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-text-muted">
                  No open positions
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-panel border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="font-semibold text-text-primary">Quick Actions</h2>
              </div>
              <div className="p-3 space-y-2">
                <Link href="/trade" className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors group">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-accent" />
                    <span className="text-sm">Open Trading Terminal</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </Link>
                <Link href="/history" className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors group">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">View Trade History</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </Link>
                <Link href="/analytics" className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors group">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">Performance Analytics</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-panel border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="font-semibold text-text-primary">Recent Activity</h2>
              </div>
              <div className="divide-y divide-border">
                {notifications.map(notif => (
                  <div key={notif.id} className="px-4 py-3 flex items-start gap-3">
                    {notif.type === 'success' && <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />}
                    {notif.type === 'warning' && <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />}
                    {notif.type === 'info' && <Bell className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-secondary">{notif.message}</p>
                      <p className="text-xs text-text-muted mt-0.5">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="mt-6 bg-panel border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-text-primary">Recent Trades</h2>
            <Link href="/history" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-elevated/30">
                  <th className="text-left py-2 px-4 text-text-muted font-medium">Symbol</th>
                  <th className="text-left py-2 px-4 text-text-muted font-medium">Side</th>
                  <th className="text-right py-2 px-4 text-text-muted font-medium">Size</th>
                  <th className="text-right py-2 px-4 text-text-muted font-medium">Price</th>
                  <th className="text-right py-2 px-4 text-text-muted font-medium">P&L</th>
                  <th className="text-right py-2 px-4 text-text-muted font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map(trade => (
                  <tr key={trade.id} className="border-b border-border/50 hover:bg-surface-elevated/30">
                    <td className="py-2.5 px-4 font-medium">{trade.symbol}</td>
                    <td className="py-2.5 px-4">
                      <span className={clsx(
                        'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase',
                        trade.side === 'buy' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      )}>
                        {trade.side}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono">{trade.size}</td>
                    <td className="py-2.5 px-4 text-right font-mono">${trade.price.toFixed(3)}</td>
                    <td className={clsx('py-2.5 px-4 text-right font-mono', trade.pnl >= 0 ? 'text-success' : 'text-error')}>
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-4 text-right text-text-muted">{trade.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hot Markets from Polymarket */}
        <div className="mt-6 bg-panel border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-text-primary">Hot Markets</h2>
            <Link href="/trade" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
              Trade Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {marketsLoading ? (
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-accent animate-spin" />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {hotMarkets.map(market => (
                <Link 
                  key={market.id} 
                  href="/trade"
                  className="px-4 py-3 flex items-center justify-between hover:bg-surface-elevated/30 transition-colors block"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="font-medium text-text-primary truncate">{market.name}</p>
                    <p className="text-xs text-text-muted">{market.volume} volume</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-text-primary">${market.price.toFixed(3)}</p>
                    <p className="text-xs text-text-muted">{(market.price * 100).toFixed(1)}% probability</p>
                  </div>
                </Link>
              ))}
              {hotMarkets.length === 0 && !marketsLoading && (
                <div className="px-4 py-8 text-center text-text-muted">
                  No markets available
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ 
  icon, 
  iconColor, 
  iconBg, 
  label, 
  value, 
  subValue, 
  progress 
}: { 
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  label: string
  value: string
  subValue?: React.ReactNode
  progress?: { value: number; max: number; color: string }
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
      {progress && (
        <div className="mt-2 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
          <div 
            className={clsx('h-full rounded-full transition-all', progress.color)}
            style={{ width: `${Math.min((progress.value / progress.max) * 100, 100)}%` }}
          />
        </div>
      )}
      {subValue && <p className="text-xs text-text-muted mt-1">{subValue}</p>}
    </div>
  )
}
