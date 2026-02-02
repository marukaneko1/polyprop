'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

interface OrderEntryProps {
  marketSymbol: string
  marketName?: string
  marketPrice: number
  accountBalance: number
  onPlaceOrder?: (order: {
    symbol: string
    side: 'buy' | 'sell'
    type: string
    shares: number
    price: number
    limitPrice?: number
    stopPrice?: number
  }) => void
}

type OrderType = 'market' | 'limit' | 'stop' | 'stop-limit'
type OrderSide = 'buy' | 'sell'

export function OrderEntry({ marketSymbol, marketName, marketPrice, accountBalance, onPlaceOrder }: OrderEntryProps) {
  const [orderType, setOrderType] = useState<OrderType>('market')
  const [orderSide, setOrderSide] = useState<OrderSide>('buy')
  const [shares, setShares] = useState<string>('500')
  const [limitPrice, setLimitPrice] = useState<string>('')
  const [stopPrice, setStopPrice] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderStatus, setOrderStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const sharesNum = parseInt(shares) || 0
  const estimatedCost = sharesNum * marketPrice
  const fillPrice = marketPrice > 0 ? marketPrice * (orderSide === 'buy' ? 1.002 : 0.998) : 0
  const slippage = marketPrice > 0 ? Math.abs((fillPrice / marketPrice - 1) * 100) : 0
  
  // Liquidity estimation
  const liquidityConsumed = accountBalance > 0 ? (estimatedCost / accountBalance) * 100 : 0
  const hasLiquidityWarning = liquidityConsumed > 10

  useEffect(() => {
    setLimitPrice(marketPrice.toFixed(3))
  }, [marketPrice])

  // Clear order status after 3 seconds
  useEffect(() => {
    if (orderStatus) {
      const timer = setTimeout(() => setOrderStatus(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [orderStatus])

  const handleSubmitOrder = async () => {
    if (!marketSymbol || marketSymbol === 'N/A' || sharesNum <= 0) {
      setOrderStatus({ type: 'error', message: 'Please select a market and enter valid shares' })
      return
    }

    setIsSubmitting(true)
    setOrderStatus(null)

    try {
      // Simulate order submission (in production, this would call an API)
      if (onPlaceOrder) {
        onPlaceOrder({
          symbol: marketSymbol,
          side: orderSide,
          type: orderType,
          shares: sharesNum,
          price: marketPrice,
          limitPrice: orderType.includes('limit') ? parseFloat(limitPrice) : undefined,
          stopPrice: orderType.includes('stop') ? parseFloat(stopPrice) : undefined,
        })
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))

      setOrderStatus({ 
        type: 'success', 
        message: `${orderSide.toUpperCase()} order for ${sharesNum} shares placed successfully` 
      })
      
      // Reset form
      setShares('500')
    } catch (error) {
      setOrderStatus({ 
        type: 'error', 
        message: 'Failed to place order. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="panel-header flex-col items-start gap-1">
        <div className="flex items-center justify-between w-full">
          <span className="panel-title">Order Entry</span>
          <span className="text-xs font-mono text-accent">{(marketPrice * 100).toFixed(0)}¢</span>
        </div>
        {marketName && (
          <p className="text-xs text-text-muted line-clamp-2 leading-tight">{marketName}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Order Type Tabs */}
        <div className="flex bg-surface rounded p-0.5">
          {(['market', 'limit', 'stop', 'stop-limit'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={clsx(
                'flex-1 py-1.5 text-xs font-medium rounded transition-colors capitalize',
                orderType === type 
                  ? 'bg-surface-elevated text-text-primary' 
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Buy/Sell Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setOrderSide('buy')}
            className={clsx('order-btn buy', orderSide === 'buy' && 'active')}
          >
            BUY
          </button>
          <button
            onClick={() => setOrderSide('sell')}
            className={clsx('order-btn sell', orderSide === 'sell' && 'active')}
          >
            SELL
          </button>
        </div>

        {/* Shares Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase tracking-wide">Shares</label>
          <div className="order-input-group">
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="0"
            />
            <span className="suffix">Shares</span>
          </div>
          <div className="flex gap-1">
            {[100, 250, 500, 1000].map((preset) => (
              <button
                key={preset}
                onClick={() => setShares(preset.toString())}
                className={clsx(
                  'flex-1 py-1 text-xs rounded transition-colors',
                  shares === preset.toString()
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'bg-surface text-text-muted hover:text-text-secondary border border-border'
                )}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Limit Price (if applicable) */}
        {(orderType === 'limit' || orderType === 'stop-limit') && (
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted uppercase tracking-wide">Limit Price</label>
            <div className="order-input-group">
              <span className="suffix border-r border-l-0">$</span>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                step="0.001"
              />
            </div>
          </div>
        )}

        {/* Stop Price (if applicable) */}
        {(orderType === 'stop' || orderType === 'stop-limit') && (
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted uppercase tracking-wide">Stop Price</label>
            <div className="order-input-group">
              <span className="suffix border-r border-l-0">$</span>
              <input
                type="number"
                value={stopPrice}
                onChange={(e) => setStopPrice(e.target.value)}
                step="0.001"
              />
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="space-y-2 py-3 border-y border-border">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Est. Cost</span>
            <span className="font-mono text-text-primary">${estimatedCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Available</span>
            <span className="font-mono text-text-secondary">${accountBalance.toLocaleString()}</span>
          </div>
        </div>

        {/* Liquidity Guard */}
        <div className={clsx(
          'p-3 rounded-lg border',
          hasLiquidityWarning 
            ? 'bg-warning/5 border-warning/20' 
            : 'bg-accent/5 border-accent/20'
        )}>
          <div className="flex items-center gap-2 mb-2">
            <Shield className={clsx('w-4 h-4', hasLiquidityWarning ? 'text-warning' : 'text-accent')} />
            <span className={clsx('text-xs font-medium', hasLiquidityWarning ? 'text-warning' : 'text-accent')}>
              Liquidity Guard
            </span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Est. Fill Price</span>
              <span className="font-mono text-text-primary">${fillPrice.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Slippage</span>
              <span className={clsx('font-mono', slippage > 0.1 ? 'text-warning' : 'text-success')}>
                +{slippage.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Liq. Consumed</span>
              <span className={clsx('font-mono', hasLiquidityWarning ? 'text-warning' : 'text-text-primary')}>
                {liquidityConsumed.toFixed(1)}%
              </span>
            </div>
          </div>
          {hasLiquidityWarning && (
            <div className="flex items-start gap-2 mt-2 pt-2 border-t border-warning/20">
              <AlertCircle className="w-3.5 h-3.5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-warning/80">
                Large order may experience higher slippage. Consider splitting into smaller orders.
              </p>
            </div>
          )}
        </div>

        {/* Order Status */}
        {orderStatus && (
          <div className={clsx(
            'flex items-center gap-2 p-2 rounded-lg text-xs',
            orderStatus.type === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          )}>
            {orderStatus.type === 'success' ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{orderStatus.message}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmitOrder}
          disabled={isSubmitting || !marketSymbol || marketSymbol === 'N/A' || sharesNum <= 0}
          className={clsx(
            'w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2',
            orderSide === 'buy'
              ? 'bg-success hover:bg-success/90 text-background disabled:bg-success/50'
              : 'bg-error hover:bg-error/90 text-white disabled:bg-error/50',
            (isSubmitting || !marketSymbol || marketSymbol === 'N/A') && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Placing Order...
            </>
          ) : (
            <>
              {orderSide === 'buy' ? 'Buy' : 'Sell'} {sharesNum.toLocaleString()} Shares
            </>
          )}
        </button>
      </div>
    </div>
  )
}
