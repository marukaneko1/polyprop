'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  TradingHeader, 
  MarketsList, 
  OrderBook, 
  OrderEntry, 
  RiskPanel, 
  PositionsPanel,
  ChartPanel,
  type Market 
} from '@/components'
import { useMarkets, useOrderBook, type Market as PolyMarket } from '@/lib/usePolymarket'
import { Loader2 } from 'lucide-react'

// Sample positions data (would come from user's account)
const samplePositions = [
  { id: '1', symbol: 'USELEC', side: 'long' as const, size: 500, entryPrice: 0.538, currentPrice: 0.542, pnl: 2.00, pnlPercent: 0.74 },
]

const sampleOrders: { id: string; symbol: string; side: 'buy' | 'sell'; type: 'market' | 'limit' | 'stop'; size: number; price: number; status: 'pending' | 'partial' | 'filled'; filledSize: number; createdAt: string }[] = []

const sampleTrades: { id: string; symbol: string; side: 'buy' | 'sell'; size: number; price: number; pnl: number; time: string }[] = []

export default function TradePage() {
  const { 
    markets: polyMarkets, 
    loading: marketsLoading, 
    loadingMore: marketsLoadingMore,
    error: marketsError, 
    totalLoaded,
    refresh: refreshMarkets 
  } = useMarkets(100)
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Transform Polymarket data to our Market format
  const markets: Market[] = useMemo(() => {
    return polyMarkets.map(m => ({
      id: m.id,
      symbol: m.symbol,
      name: m.name,
      price: m.price,
      change: m.change,
      volume: m.volume,
      isFavorite: favorites.has(m.id),
    }))
  }, [polyMarkets, favorites])

  // Auto-select first market when loaded
  useEffect(() => {
    const firstMarket = markets[0]
    if (firstMarket && !selectedMarketId) {
      setSelectedMarketId(firstMarket.id)
    }
  }, [markets, selectedMarketId])

  // Get selected market data
  const selectedMarket = useMemo(() => {
    return polyMarkets.find(m => m.id === selectedMarketId)
  }, [polyMarkets, selectedMarketId])

  // Fetch orderbook for selected market
  const { orderBook, loading: orderBookLoading } = useOrderBook(selectedMarket?.tokenId || null)

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Loading state
  if (marketsLoading && markets.length === 0) {
    return (
      <div className="trading-layout">
        <TradingHeader 
          accountBalance={50000}
          accountEquity={50000}
          unrealizedPnl={0}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
            <p className="text-text-muted">Loading markets from Polymarket...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (marketsError && markets.length === 0) {
    return (
      <div className="trading-layout">
        <TradingHeader 
          accountBalance={50000}
          accountEquity={50000}
          unrealizedPnl={0}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-error mb-2">Failed to load markets</p>
            <p className="text-text-muted text-sm">{marketsError}</p>
          </div>
        </div>
      </div>
    )
  }

  const displayMarket = selectedMarket ? {
    symbol: selectedMarket.symbol,
    name: selectedMarket.name,
    price: orderBook?.lastPrice || selectedMarket.price,
    change: selectedMarket.change,
    high: Math.min(1, (orderBook?.lastPrice || selectedMarket.price) * 1.05),
    low: Math.max(0, (orderBook?.lastPrice || selectedMarket.price) * 0.95),
    volume: selectedMarket.volume,
  } : null

  return (
    <div className="trading-layout">
      {/* Header */}
      <TradingHeader 
        accountBalance={50000}
        accountEquity={50245.90}
        unrealizedPnl={245.90}
      />

      {/* Main Trading Area */}
      <div className="trading-main">
        {/* Left Sidebar - Markets List */}
        <aside className="trading-sidebar">
          <MarketsList 
            markets={markets}
            selectedMarket={selectedMarketId}
            onSelectMarket={setSelectedMarketId}
            onToggleFavorite={toggleFavorite}
            onRefresh={refreshMarkets}
            isLoading={marketsLoading}
            isLoadingMore={marketsLoadingMore}
            totalCount={totalLoaded}
          />
        </aside>

        {/* Center Content */}
        <div className="trading-content">
          {/* Top Row - Chart + Order Book */}
          <div className="flex-1 flex min-h-0">
            {/* Chart */}
            <div className="flex-1 min-w-0">
              {displayMarket ? (
                <ChartPanel 
                  symbol={displayMarket.symbol}
                  name={displayMarket.name}
                  price={displayMarket.price}
                  change={displayMarket.change}
                  high={displayMarket.high}
                  low={displayMarket.low}
                  volume={displayMarket.volume}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-panel border border-border">
                  <p className="text-text-muted">Select a market to view chart</p>
                </div>
              )}
            </div>

            {/* Order Book */}
            <div className="w-64 flex-shrink-0 border-l border-border">
              {orderBook ? (
                <OrderBook 
                  bids={orderBook.bids}
                  asks={orderBook.asks}
                  lastPrice={orderBook.lastPrice}
                  spread={orderBook.spread}
                />
              ) : (
                <div className="h-full flex flex-col bg-panel">
                  <div className="panel-header">
                    <span className="panel-title">Order Book</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    {orderBookLoading ? (
                      <Loader2 className="w-5 h-5 text-accent animate-spin" />
                    ) : (
                      <p className="text-text-muted text-sm">Select a market</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row - Positions */}
          <div className="h-48 flex-shrink-0 border-t border-border">
            <PositionsPanel 
              positions={samplePositions}
              orders={sampleOrders}
              trades={sampleTrades}
            />
          </div>
        </div>

        {/* Right Sidebar - Order Entry + Risk */}
        <aside className="w-72 flex-shrink-0 border-l border-border flex flex-col bg-panel">
          {/* Order Entry */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <OrderEntry 
              marketSymbol={selectedMarket?.symbol || 'N/A'}
              marketName={selectedMarket?.name}
              marketPrice={orderBook?.lastPrice || selectedMarket?.price || 0}
              accountBalance={50000}
            />
          </div>

          {/* Risk Panel */}
          <div className="h-72 flex-shrink-0 border-t border-border overflow-hidden">
            <RiskPanel 
              drawdownUsed={2.1}
              drawdownLimit={8}
              profitProgress={6.48}
              profitTarget={15}
              consistencyMax={28}
              consistencyLimit={40}
              stage={1}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
