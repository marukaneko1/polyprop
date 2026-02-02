'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Download, Calendar,
  TrendingUp, TrendingDown, ArrowUpDown
} from 'lucide-react'
import { clsx } from 'clsx'
import { AppHeader } from '@/components'

// Mock trade history data
const tradeHistory = [
  { id: '1', symbol: 'USELEC', name: 'US Election Winner', side: 'buy', type: 'market', size: 500, price: 0.542, total: 271.00, pnl: 12.50, pnlPercent: 4.61, status: 'filled', date: '2026-02-02', time: '14:32:15' },
  { id: '2', symbol: 'FEDMAR', name: 'Fed Rate Cut March', side: 'sell', type: 'limit', size: 300, price: 0.234, total: 70.20, pnl: -5.20, pnlPercent: -7.41, status: 'filled', date: '2026-02-02', time: '09:15:42' },
  { id: '3', symbol: 'BTC100K', name: 'BTC > $100k EOY', side: 'buy', type: 'market', size: 400, price: 0.678, total: 271.20, pnl: 8.80, pnlPercent: 3.24, status: 'filled', date: '2026-02-01', time: '16:45:23' },
  { id: '4', symbol: 'GDP', name: 'GDP Growth Q2', side: 'buy', type: 'limit', size: 250, price: 0.445, total: 111.25, pnl: 15.30, pnlPercent: 13.75, status: 'filled', date: '2026-02-01', time: '11:22:08' },
  { id: '5', symbol: 'NFLX', name: 'Netflix > 500', side: 'sell', type: 'market', size: 600, price: 0.312, total: 187.20, pnl: -8.40, pnlPercent: -4.49, status: 'filled', date: '2026-01-31', time: '15:58:31' },
  { id: '6', symbol: 'TSLA', name: 'Tesla > 250', side: 'buy', type: 'market', size: 350, price: 0.589, total: 206.15, pnl: 22.10, pnlPercent: 10.72, status: 'filled', date: '2026-01-31', time: '10:12:55' },
  { id: '7', symbol: 'AAPL', name: 'Apple > 200', side: 'sell', type: 'limit', size: 450, price: 0.723, total: 325.35, pnl: 18.60, pnlPercent: 5.72, status: 'filled', date: '2026-01-30', time: '14:05:17' },
  { id: '8', symbol: 'SPX', name: 'SPX New ATH Q1', side: 'buy', type: 'market', size: 200, price: 0.456, total: 91.20, pnl: -3.20, pnlPercent: -3.51, status: 'filled', date: '2026-01-30', time: '09:30:00' },
  { id: '9', symbol: 'USELEC', name: 'US Election Winner', side: 'sell', type: 'limit', size: 300, price: 0.538, total: 161.40, pnl: 9.80, pnlPercent: 6.07, status: 'filled', date: '2026-01-29', time: '16:20:45' },
  { id: '10', symbol: 'ETH', name: 'ETH > $5k EOY', side: 'buy', type: 'market', size: 500, price: 0.412, total: 206.00, pnl: -12.50, pnlPercent: -6.07, status: 'filled', date: '2026-01-29', time: '11:45:30' },
]

type SortField = 'date' | 'symbol' | 'pnl' | 'size' | 'price'
type SortOrder = 'asc' | 'desc'

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [sideFilter, setSideFilter] = useState<'all' | 'buy' | 'sell'>('all')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const filteredTrades = tradeHistory
    .filter(trade => {
      if (search && !trade.symbol.toLowerCase().includes(search.toLowerCase()) && 
          !trade.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (sideFilter !== 'all' && trade.side !== sideFilter) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'date':
          comparison = new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()
          break
        case 'symbol':
          comparison = a.symbol.localeCompare(b.symbol)
          break
        case 'pnl':
          comparison = b.pnl - a.pnl
          break
        case 'size':
          comparison = b.size - a.size
          break
        case 'price':
          comparison = b.price - a.price
          break
      }
      return sortOrder === 'desc' ? comparison : -comparison
    })

  const totalPnl = filteredTrades.reduce((sum, t) => sum + t.pnl, 0)
  const totalTrades = filteredTrades.length
  const winningTrades = filteredTrades.filter(t => t.pnl > 0).length
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Symbol', 'Name', 'Side', 'Size', 'Entry Price', 'Exit Price', 'P&L']
    const rows = filteredTrades.map(trade => [
      trade.date,
      trade.time,
      trade.symbol,
      trade.name,
      trade.side,
      trade.size,
      trade.price.toFixed(3),
      trade.exitPrice.toFixed(3),
      trade.pnl.toFixed(2)
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `trade_history_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader showStats={false} />

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Trade History</h1>
          <p className="text-text-muted">View and analyze your past trades</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-panel border border-border rounded-xl p-4">
            <p className="text-sm text-text-muted mb-1">Total Trades</p>
            <p className="text-2xl font-semibold font-mono">{totalTrades}</p>
          </div>
          <div className="bg-panel border border-border rounded-xl p-4">
            <p className="text-sm text-text-muted mb-1">Win Rate</p>
            <p className="text-2xl font-semibold font-mono">{winRate.toFixed(1)}%</p>
          </div>
          <div className="bg-panel border border-border rounded-xl p-4">
            <p className="text-sm text-text-muted mb-1">Total P&L</p>
            <p className={clsx('text-2xl font-semibold font-mono', totalPnl >= 0 ? 'text-success' : 'text-error')}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
            </p>
          </div>
          <div className="bg-panel border border-border rounded-xl p-4">
            <p className="text-sm text-text-muted mb-1">Avg Trade Size</p>
            <p className="text-2xl font-semibold font-mono">
              {totalTrades > 0 ? Math.round(filteredTrades.reduce((sum, t) => sum + t.size, 0) / totalTrades) : 0}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-panel border border-border rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search by symbol or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
              />
            </div>

            {/* Side Filter */}
            <div className="flex bg-surface rounded-lg p-0.5">
              {(['all', 'buy', 'sell'] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setSideFilter(side)}
                  className={clsx(
                    'px-3 py-1.5 text-sm font-medium rounded capitalize transition-colors',
                    sideFilter === side 
                      ? 'bg-surface-elevated text-text-primary' 
                      : 'text-text-muted hover:text-text-secondary'
                  )}
                >
                  {side}
                </button>
              ))}
            </div>

            {/* Date Range */}
            <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors">
              <Calendar className="w-4 h-4" />
              Last 30 days
            </button>

            {/* Export */}
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Trades Table */}
        <div className="bg-panel border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-elevated/30">
                  <th 
                    className="text-left py-3 px-4 text-text-muted font-medium cursor-pointer hover:text-text-primary"
                    onClick={() => handleSort('date')}
                  >
                    <span className="flex items-center gap-1">
                      Date/Time
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-text-muted font-medium cursor-pointer hover:text-text-primary"
                    onClick={() => handleSort('symbol')}
                  >
                    <span className="flex items-center gap-1">
                      Market
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Side</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Type</th>
                  <th 
                    className="text-right py-3 px-4 text-text-muted font-medium cursor-pointer hover:text-text-primary"
                    onClick={() => handleSort('size')}
                  >
                    <span className="flex items-center justify-end gap-1">
                      Size
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th 
                    className="text-right py-3 px-4 text-text-muted font-medium cursor-pointer hover:text-text-primary"
                    onClick={() => handleSort('price')}
                  >
                    <span className="flex items-center justify-end gap-1">
                      Price
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="text-right py-3 px-4 text-text-muted font-medium">Total</th>
                  <th 
                    className="text-right py-3 px-4 text-text-muted font-medium cursor-pointer hover:text-text-primary"
                    onClick={() => handleSort('pnl')}
                  >
                    <span className="flex items-center justify-end gap-1">
                      P&L
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="text-center py-3 px-4 text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map(trade => (
                  <tr key={trade.id} className="border-b border-border/50 hover:bg-surface-elevated/30 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-text-primary">{trade.date}</p>
                      <p className="text-xs text-text-muted">{trade.time}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-text-primary">{trade.symbol}</p>
                      <p className="text-xs text-text-muted truncate max-w-[150px]">{trade.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={clsx(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
                        trade.side === 'buy' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      )}>
                        {trade.side === 'buy' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {trade.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary capitalize">{trade.type}</td>
                    <td className="py-3 px-4 text-right font-mono">{trade.size.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono">${trade.price.toFixed(3)}</td>
                    <td className="py-3 px-4 text-right font-mono">${trade.total.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={clsx('font-mono', trade.pnl >= 0 ? 'text-success' : 'text-error')}>
                        {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                      </span>
                      <span className={clsx('block text-xs', trade.pnlPercent >= 0 ? 'text-success/70' : 'text-error/70')}>
                        {trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded capitalize">
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTrades.length === 0 && (
            <div className="py-12 text-center text-text-muted">
              No trades found matching your filters
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
