'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

interface Position {
  id: string
  symbol: string
  side: 'long' | 'short'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

interface Order {
  id: string
  symbol: string
  side: 'buy' | 'sell'
  type: 'market' | 'limit' | 'stop'
  size: number
  price: number
  status: 'pending' | 'partial' | 'filled'
  filledSize: number
  createdAt: string
}

interface Trade {
  id: string
  symbol: string
  side: 'buy' | 'sell'
  size: number
  price: number
  pnl: number
  time: string
}

interface PositionsPanelProps {
  positions: Position[]
  orders: Order[]
  trades: Trade[]
  onClosePosition?: (positionId: string) => void
  onCancelOrder?: (orderId: string) => void
}

type Tab = 'positions' | 'orders' | 'history'

export function PositionsPanel({ positions, orders, trades, onClosePosition, onCancelOrder }: PositionsPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('positions')

  return (
    <div className="h-full flex flex-col bg-panel">
      {/* Tabs */}
      <div className="tab-list">
        <button 
          onClick={() => setActiveTab('positions')}
          className={clsx('tab-item', activeTab === 'positions' && 'active')}
        >
          Positions
          {positions.length > 0 && <span className="tab-count">{positions.length}</span>}
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={clsx('tab-item', activeTab === 'orders' && 'active')}
        >
          Orders
          {orders.filter(o => o.status !== 'filled').length > 0 && (
            <span className="tab-count">{orders.filter(o => o.status !== 'filled').length}</span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={clsx('tab-item', activeTab === 'history' && 'active')}
        >
          Trade History
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'positions' && (
          <PositionsTable positions={positions} onClosePosition={onClosePosition} />
        )}
        {activeTab === 'orders' && (
          <OrdersTable orders={orders} onCancelOrder={onCancelOrder} />
        )}
        {activeTab === 'history' && (
          <TradesTable trades={trades} />
        )}
      </div>
    </div>
  )
}

function PositionsTable({ positions, onClosePosition }: { positions: Position[], onClosePosition?: (id: string) => void }) {
  const [closingId, setClosingId] = useState<string | null>(null)

  const handleClose = async (id: string) => {
    setClosingId(id)
    if (onClosePosition) {
      onClosePosition(id)
    } else {
      // Simulated close
      await new Promise(resolve => setTimeout(resolve, 500))
      alert(`Position ${id} closed (demo mode)`)
    }
    setClosingId(null)
  }

  if (positions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted text-sm">
        No open positions
      </div>
    )
  }

  return (
    <table className="positions-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Side</th>
          <th className="text-right">Size</th>
          <th className="text-right">Entry</th>
          <th className="text-right">Current</th>
          <th className="text-right">P&L</th>
          <th className="text-right">P&L %</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {positions.map((pos) => (
          <tr key={pos.id}>
            <td className="font-medium text-text-primary">{pos.symbol}</td>
            <td>
              <span className={clsx(
                'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase',
                pos.side === 'long' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              )}>
                {pos.side}
              </span>
            </td>
            <td className="text-right">{pos.size.toLocaleString()}</td>
            <td className="text-right">${pos.entryPrice.toFixed(3)}</td>
            <td className="text-right">${pos.currentPrice.toFixed(3)}</td>
            <td className={clsx('text-right', pos.pnl >= 0 ? 'text-success' : 'text-error')}>
              {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
            </td>
            <td className={clsx('text-right', pos.pnlPercent >= 0 ? 'text-success' : 'text-error')}>
              {pos.pnlPercent >= 0 ? '+' : ''}{pos.pnlPercent.toFixed(2)}%
            </td>
            <td className="text-right">
              <button 
                onClick={() => handleClose(pos.id)}
                disabled={closingId === pos.id}
                className="p-1 text-text-muted hover:text-error transition-colors disabled:opacity-50"
                title="Close position"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function OrdersTable({ orders, onCancelOrder }: { orders: Order[], onCancelOrder?: (id: string) => void }) {
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const pendingOrders = orders.filter(o => o.status !== 'filled')

  const handleCancel = async (id: string) => {
    setCancellingId(id)
    if (onCancelOrder) {
      onCancelOrder(id)
    } else {
      // Simulated cancel
      await new Promise(resolve => setTimeout(resolve, 500))
      alert(`Order ${id} cancelled (demo mode)`)
    }
    setCancellingId(null)
  }

  if (pendingOrders.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted text-sm">
        No pending orders
      </div>
    )
  }

  return (
    <table className="positions-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Side</th>
          <th>Type</th>
          <th className="text-right">Size</th>
          <th className="text-right">Price</th>
          <th className="text-right">Filled</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pendingOrders.map((order) => (
          <tr key={order.id}>
            <td className="font-medium text-text-primary">{order.symbol}</td>
            <td>
              <span className={clsx(
                'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase',
                order.side === 'buy' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              )}>
                {order.side}
              </span>
            </td>
            <td className="text-text-secondary capitalize">{order.type}</td>
            <td className="text-right">{order.size.toLocaleString()}</td>
            <td className="text-right">${order.price.toFixed(3)}</td>
            <td className="text-right">{order.filledSize}/{order.size}</td>
            <td>
              <span className={clsx(
                'px-1.5 py-0.5 rounded text-[10px] font-medium',
                order.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
              )}>
                {order.status}
              </span>
            </td>
            <td className="text-right">
              <button 
                onClick={() => handleCancel(order.id)}
                disabled={cancellingId === order.id}
                className="p-1 text-text-muted hover:text-error transition-colors disabled:opacity-50"
                title="Cancel order"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TradesTable({ trades }: { trades: Trade[] }) {
  if (trades.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted text-sm">
        No trade history
      </div>
    )
  }

  return (
    <table className="positions-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Symbol</th>
          <th>Side</th>
          <th className="text-right">Size</th>
          <th className="text-right">Price</th>
          <th className="text-right">P&L</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => (
          <tr key={trade.id}>
            <td className="text-text-muted">{trade.time}</td>
            <td className="font-medium text-text-primary">{trade.symbol}</td>
            <td>
              <span className={clsx(
                'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase',
                trade.side === 'buy' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              )}>
                {trade.side}
              </span>
            </td>
            <td className="text-right">{trade.size.toLocaleString()}</td>
            <td className="text-right">${trade.price.toFixed(3)}</td>
            <td className={clsx('text-right', trade.pnl >= 0 ? 'text-success' : 'text-error')}>
              {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
