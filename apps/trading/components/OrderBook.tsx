'use client'

import { useMemo } from 'react'
import { clsx } from 'clsx'

interface OrderLevel {
  price: number
  size: number
  total?: number
}

interface OrderBookProps {
  bids: OrderLevel[]
  asks: OrderLevel[]
  lastPrice: number
  spread: number
}

export function OrderBook({ bids, asks, lastPrice, spread }: OrderBookProps) {
  const maxSize = useMemo(() => {
    const allSizes = [...bids, ...asks].map(o => o.size)
    return Math.max(...allSizes, 1)
  }, [bids, asks])

  // Format price - Polymarket uses 0-1 range, display as cents or percentage
  const formatPrice = (price: number) => {
    // If price is between 0 and 1, show as cents (e.g., 0.542 -> $0.542)
    if (price > 0 && price < 1) {
      return `$${price.toFixed(3)}`
    }
    // Otherwise show as is with 3 decimals
    return `$${price.toFixed(3)}`
  }

  // Format size
  const formatSize = (size: number) => {
    if (size >= 1000) {
      return `${(size / 1000).toFixed(1)}k`
    }
    return size.toFixed(0)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="panel-header">
        <span className="panel-title">Order Book</span>
        <select className="text-xs bg-surface border border-border rounded px-2 py-1 text-text-muted">
          <option>0.001</option>
          <option>0.01</option>
          <option>0.1</option>
        </select>
      </div>

      {/* Column Headers */}
      <div className="flex items-center justify-between px-3 py-1.5 text-[10px] text-text-muted uppercase tracking-wider border-b border-border/50">
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Asks (sell orders) - reversed so lowest ask is at bottom */}
        <div className="flex-1 overflow-y-auto flex flex-col-reverse">
          {asks.length > 0 ? (
            asks.slice().reverse().map((ask, i) => (
              <div key={`ask-${i}`} className="orderbook-row">
                <div 
                  className="orderbook-bar ask" 
                  style={{ width: `${(ask.size / maxSize) * 100}%` }} 
                />
                <span className="orderbook-price ask">{formatPrice(ask.price)}</span>
                <span className="orderbook-size">{formatSize(ask.size)}</span>
                <span className="orderbook-size">{formatSize(ask.total || ask.size)}</span>
              </div>
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-muted text-xs">
              No asks
            </div>
          )}
        </div>

        {/* Spread / Last Price */}
        <div className="py-2 px-3 border-y border-border bg-surface-elevated/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-mono font-semibold text-text-primary">{formatPrice(lastPrice)}</span>
            <span className="text-xs text-text-muted">≈ {(lastPrice * 100).toFixed(1)}%</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-text-muted block">Spread</span>
            <span className="text-xs font-mono text-text-secondary">{spread.toFixed(2)}%</span>
          </div>
        </div>

        {/* Bids (buy orders) */}
        <div className="flex-1 overflow-y-auto">
          {bids.length > 0 ? (
            bids.map((bid, i) => (
              <div key={`bid-${i}`} className="orderbook-row">
                <div 
                  className="orderbook-bar bid" 
                  style={{ width: `${(bid.size / maxSize) * 100}%` }} 
                />
                <span className="orderbook-price bid">{formatPrice(bid.price)}</span>
                <span className="orderbook-size">{formatSize(bid.size)}</span>
                <span className="orderbook-size">{formatSize(bid.total || bid.size)}</span>
              </div>
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-muted text-xs">
              No bids
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
