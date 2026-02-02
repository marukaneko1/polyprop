'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, Star, TrendingUp, TrendingDown, Plus, RefreshCw, LayoutGrid, List } from 'lucide-react'
import { clsx } from 'clsx'

export interface Market {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  isFavorite?: boolean
}

interface MarketsListProps {
  markets: Market[]
  selectedMarket: string | null
  onSelectMarket: (id: string) => void
  onToggleFavorite?: (id: string) => void
  onRefresh?: () => void
  isLoading?: boolean
  isLoadingMore?: boolean
  totalCount?: number
}

type ViewMode = 'compact' | 'detailed'

export function MarketsList({ markets, selectedMarket, onSelectMarket, onToggleFavorite, onRefresh, isLoading, isLoadingMore, totalCount }: MarketsListProps) {
  const [search, setSearch] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [localFavorites, setLocalFavorites] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<ViewMode>('detailed')

  // Persist view mode preference
  useEffect(() => {
    const saved = localStorage.getItem('marketsViewMode') as ViewMode
    if (saved) setViewMode(saved)
  }, [])

  const toggleViewMode = () => {
    const newMode = viewMode === 'compact' ? 'detailed' : 'compact'
    setViewMode(newMode)
    localStorage.setItem('marketsViewMode', newMode)
  }

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(id)
    } else {
      // Local state fallback
      setLocalFavorites(prev => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }
  }

  const isFavorite = (market: Market) => market.isFavorite || localFavorites.has(market.id)

  const filteredMarkets = useMemo(() => {
    const searchLower = search.toLowerCase().trim()
    
    return markets.filter(m => {
      // Search filter
      if (searchLower) {
        const matchesSearch = 
          m.symbol.toLowerCase().includes(searchLower) ||
          m.name.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }
      
      // Favorites filter
      if (showFavorites) {
        const isFav = m.isFavorite || localFavorites.has(m.id)
        if (!isFav) return false
      }
      
      return true
    })
  }, [markets, search, showFavorites, localFavorites])

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#18181b] border border-border rounded pl-8 pr-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tabs + View Toggle */}
      <div className="flex items-center border-b border-border">
        <button 
          onClick={() => setShowFavorites(false)}
          className={clsx(
            'flex-1 px-3 py-2 text-xs font-medium transition-colors',
            !showFavorites ? 'text-text-primary border-b-2 border-accent' : 'text-text-muted hover:text-text-secondary'
          )}
        >
          All Markets
          {totalCount !== undefined && (
            <span className="ml-1 text-text-muted">({totalCount})</span>
          )}
        </button>
        <button 
          onClick={() => setShowFavorites(true)}
          className={clsx(
            'flex-1 px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1',
            showFavorites ? 'text-text-primary border-b-2 border-accent' : 'text-text-muted hover:text-text-secondary'
          )}
        >
          <Star className="w-3 h-3" />
          Watchlist
        </button>
        {/* View Mode Toggle */}
        <button
          onClick={toggleViewMode}
          className="px-2 py-2 text-text-muted hover:text-text-primary transition-colors"
          title={viewMode === 'compact' ? 'Switch to detailed view' : 'Switch to compact view'}
        >
          {viewMode === 'compact' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
        </button>
      </div>

      {/* Loading more indicator */}
      {isLoadingMore && (
        <div className="px-3 py-1.5 bg-accent/10 border-b border-border flex items-center justify-center gap-2">
          <RefreshCw className="w-3 h-3 text-accent animate-spin" />
          <span className="text-xs text-accent">Loading more markets...</span>
        </div>
      )}

      {/* Column Headers - Compact View Only */}
      {viewMode === 'compact' && (
        <div className="flex items-center justify-between px-3 py-2 text-[10px] text-text-muted uppercase tracking-wider border-b border-border/50 bg-surface-elevated/30">
          <span>Market</span>
          <div className="flex items-center gap-4">
            <span className="w-16 text-right">Price</span>
            <span className="w-14 text-right">Chg%</span>
          </div>
        </div>
      )}

      {/* Markets List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMarkets.length === 0 ? (
          <div className="p-4 text-center text-text-muted text-sm">
            {search ? 'No markets found' : 'No markets available'}
          </div>
        ) : viewMode === 'compact' ? (
          // Compact View - Ticker Style
          filteredMarkets.map((market) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market.id)}
              className={clsx(
                'market-row',
                selectedMarket === market.id && 'selected'
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <button 
                  className="text-text-muted hover:text-warning transition-colors"
                  onClick={(e) => handleToggleFavorite(market.id, e)}
                >
                  <Star className={clsx('w-3.5 h-3.5', isFavorite(market) && 'fill-warning text-warning')} />
                </button>
                <div className="min-w-0">
                  <p className="market-symbol truncate">{market.symbol}</p>
                  <p className="text-[10px] text-text-muted truncate max-w-[120px]">{market.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="market-price w-16 text-right">{(market.price * 100).toFixed(0)}¢</span>
                <span className={clsx(
                  'market-change w-14 text-right flex items-center justify-end gap-0.5',
                  market.change >= 0 ? 'positive' : 'negative'
                )}>
                  {market.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {market.change >= 0 ? '+' : ''}{market.change.toFixed(1)}%
                </span>
              </div>
            </div>
          ))
        ) : (
          // Detailed View - Full Question
          filteredMarkets.map((market) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market.id)}
              className={clsx(
                'px-3 py-3 border-b border-border/50 cursor-pointer transition-colors hover:bg-surface-elevated/50',
                selectedMarket === market.id && 'bg-accent/10 border-l-2 border-l-accent'
              )}
            >
              {/* Top row: Star + Question */}
              <div className="flex items-start gap-2 mb-2">
                <button 
                  className="text-text-muted hover:text-warning transition-colors mt-0.5 flex-shrink-0"
                  onClick={(e) => handleToggleFavorite(market.id, e)}
                >
                  <Star className={clsx('w-3.5 h-3.5', isFavorite(market) && 'fill-warning text-warning')} />
                </button>
                <p className="text-sm text-text-primary leading-tight line-clamp-2">
                  {market.name}
                </p>
              </div>
              
              {/* Bottom row: Price + Volume */}
              <div className="flex items-center justify-between pl-5">
                <div className="flex items-center gap-3">
                  {/* Yes Price as probability */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-text-muted">Yes:</span>
                    <span className={clsx(
                      'text-sm font-mono font-medium px-1.5 py-0.5 rounded',
                      market.price >= 0.5 ? 'bg-success/10 text-success' : 'bg-surface text-text-primary'
                    )}>
                      {(market.price * 100).toFixed(0)}¢
                    </span>
                  </div>
                  {/* No Price */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-text-muted">No:</span>
                    <span className={clsx(
                      'text-sm font-mono font-medium px-1.5 py-0.5 rounded',
                      market.price < 0.5 ? 'bg-error/10 text-error' : 'bg-surface text-text-primary'
                    )}>
                      {((1 - market.price) * 100).toFixed(0)}¢
                    </span>
                  </div>
                </div>
                <span className="text-xs text-text-muted">{market.volume}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer with refresh */}
      <div className="p-3 border-t border-border flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-text-muted hover:text-accent border border-dashed border-border hover:border-accent/50 rounded transition-colors">
          <Plus className="w-4 h-4" />
          Add Market
        </button>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-text-muted hover:text-accent border border-border hover:border-accent/50 rounded transition-colors disabled:opacity-50"
            title="Refresh markets"
          >
            <RefreshCw className={clsx('w-4 h-4', isLoading && 'animate-spin')} />
          </button>
        )}
      </div>
    </div>
  )
}
