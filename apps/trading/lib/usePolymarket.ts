'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { 
  fetchEvents, 
  fetchMarkets, 
  fetchOrderBook, 
  fetchPrice,
  transformMarket,
  WS_URL,
  type PolymarketMarket,
  type PolymarketEvent,
  type OrderBook 
} from './polymarket'

// Types for our internal market format
export interface Market {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  liquidity: number
  tokenId: string
  outcomes: string[]
  outcomePrices: number[]
  active: boolean
  isFavorite: boolean
}

export interface OrderBookData {
  bids: { price: number; size: number; total: number }[]
  asks: { price: number; size: number; total: number }[]
  lastPrice: number
  spread: number
}

// Hook to fetch and manage ALL markets with pagination
export function useMarkets(initialLimit = 100) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalLoaded, setTotalLoaded] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  // Load all markets by paginating through the API
  const loadAllMarkets = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const allMarkets: Market[] = []
      let offset = 0
      const batchSize = 100
      let hasMoreData = true
      
      // Fetch all pages
      while (hasMoreData) {
        const data = await fetchMarkets({
          limit: batchSize,
          offset,
          active: true,
          closed: false,
          order: 'volume',
          ascending: false,
        })
        
        if (data.length === 0) {
          hasMoreData = false
          break
        }
        
        const transformed = data
          .filter(m => m.enableOrderBook && m.clobTokenIds?.length > 0)
          .map(transformMarket)
        
        allMarkets.push(...transformed)
        offset += batchSize
        
        // Update state periodically so user sees progress
        if (allMarkets.length % 200 === 0) {
          setMarkets([...allMarkets])
          setTotalLoaded(allMarkets.length)
        }
        
        // If we got less than batchSize, we've reached the end
        if (data.length < batchSize) {
          hasMoreData = false
        }
        
        // Safety limit - don't fetch more than 5000 markets to avoid infinite loops
        if (offset >= 5000) {
          hasMoreData = false
        }
      }
      
      setMarkets(allMarkets)
      setTotalLoaded(allMarkets.length)
      setHasMore(false)
    } catch (err) {
      console.error('Failed to fetch markets:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch markets')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load with just the first batch for fast display
  const loadInitialMarkets = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await fetchMarkets({
        limit: initialLimit,
        offset: 0,
        active: true,
        closed: false,
        order: 'volume',
        ascending: false,
      })
      
      const transformed = data
        .filter(m => m.enableOrderBook && m.clobTokenIds?.length > 0)
        .map(transformMarket)
      
      setMarkets(transformed)
      setTotalLoaded(transformed.length)
      setHasMore(data.length === initialLimit)
      setLoading(false)
      
      // Then load all remaining markets in the background
      if (data.length === initialLimit) {
        loadMoreInBackground(initialLimit)
      }
    } catch (err) {
      console.error('Failed to fetch markets:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch markets')
      setLoading(false)
    }
  }, [initialLimit])

  // Load more markets in the background
  const loadMoreInBackground = async (startOffset: number) => {
    setLoadingMore(true)
    const batchSize = 100
    let offset = startOffset
    let hasMoreData = true
    const additionalMarkets: Market[] = []
    
    try {
      while (hasMoreData) {
        const data = await fetchMarkets({
          limit: batchSize,
          offset,
          active: true,
          closed: false,
          order: 'volume',
          ascending: false,
        })
        
        if (data.length === 0) {
          hasMoreData = false
          break
        }
        
        const transformed = data
          .filter(m => m.enableOrderBook && m.clobTokenIds?.length > 0)
          .map(transformMarket)
        
        additionalMarkets.push(...transformed)
        offset += batchSize
        
        // Update state with new markets
        setMarkets(prev => [...prev, ...transformed])
        setTotalLoaded(prev => prev + transformed.length)
        
        if (data.length < batchSize) {
          hasMoreData = false
        }
        
        // Safety limit
        if (offset >= 5000) {
          hasMoreData = false
        }
      }
      
      setHasMore(false)
    } catch (err) {
      console.error('Failed to load more markets:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    loadInitialMarkets()
    
    // Refresh markets every 5 minutes (since we're loading all)
    const interval = setInterval(loadInitialMarkets, 300000)
    return () => clearInterval(interval)
  }, [loadInitialMarkets])

  return { 
    markets, 
    loading, 
    loadingMore, 
    error, 
    totalLoaded,
    hasMore,
    refresh: loadInitialMarkets,
    loadAll: loadAllMarkets
  }
}

// Hook to fetch orderbook for a specific token
export function useOrderBook(tokenId: string | null) {
  const [orderBook, setOrderBook] = useState<OrderBookData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch initial orderbook
  const fetchBook = useCallback(async () => {
    if (!tokenId) {
      setOrderBook(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const data = await fetchOrderBook(tokenId)
      
      // Transform orderbook data
      let runningBidTotal = 0
      let runningAskTotal = 0
      
      const bids = (data.bids || [])
        .slice(0, 10)
        .map(level => {
          const size = parseFloat(level.size)
          runningBidTotal += size
          return {
            price: parseFloat(level.price),
            size,
            total: runningBidTotal,
          }
        })
      
      const asks = (data.asks || [])
        .slice(0, 10)
        .map(level => {
          const size = parseFloat(level.size)
          runningAskTotal += size
          return {
            price: parseFloat(level.price),
            size,
            total: runningAskTotal,
          }
        })
      
      const bestBid = bids[0]?.price || 0
      const bestAsk = asks[0]?.price || 1
      const lastPrice = (bestBid + bestAsk) / 2
      const spread = bestAsk > 0 ? ((bestAsk - bestBid) / bestAsk) * 100 : 0
      
      setOrderBook({ bids, asks, lastPrice, spread })
    } catch (err) {
      console.error('Failed to fetch orderbook:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch orderbook')
    } finally {
      setLoading(false)
    }
  }, [tokenId])

  // Connect to WebSocket for real-time updates
  const connectWebSocket = useCallback(() => {
    if (!tokenId) return

    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close()
    }

    try {
      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        // Subscribe to market channel
        ws.send(JSON.stringify({
          type: 'subscribe',
          channel: 'market',
          assets_ids: [tokenId],
        }))
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.event_type === 'book' && data.asset_id === tokenId) {
            // Update orderbook with new data
            let runningBidTotal = 0
            let runningAskTotal = 0
            
            const bids = (data.bids || [])
              .slice(0, 10)
              .map((level: { price: string; size: string }) => {
                const size = parseFloat(level.size)
                runningBidTotal += size
                return {
                  price: parseFloat(level.price),
                  size,
                  total: runningBidTotal,
                }
              })
            
            const asks = (data.asks || [])
              .slice(0, 10)
              .map((level: { price: string; size: string }) => {
                const size = parseFloat(level.size)
                runningAskTotal += size
                return {
                  price: parseFloat(level.price),
                  size,
                  total: runningAskTotal,
                }
              })
            
            const bestBid = bids[0]?.price || 0
            const bestAsk = asks[0]?.price || 1
            const lastPrice = (bestBid + bestAsk) / 2
            const spread = bestAsk > 0 ? ((bestAsk - bestBid) / bestAsk) * 100 : 0
            
            setOrderBook({ bids, asks, lastPrice, spread })
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected')
        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket()
        }, 5000)
      }
    } catch (err) {
      console.error('Failed to connect WebSocket:', err)
    }
  }, [tokenId])

  // Initial fetch and WebSocket connection
  useEffect(() => {
    fetchBook()
    connectWebSocket()

    // Cleanup on unmount or tokenId change
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [fetchBook, connectWebSocket])

  // Refresh orderbook periodically as fallback
  useEffect(() => {
    if (!tokenId) return
    
    const interval = setInterval(fetchBook, 10000) // Refresh every 10 seconds
    return () => clearInterval(interval)
  }, [tokenId, fetchBook])

  return { orderBook, loading, error, refresh: fetchBook }
}

// Hook to fetch and track price for a market
export function usePrice(tokenId: string | null) {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!tokenId) {
      setPrice(null)
      return
    }

    const fetchPriceData = async () => {
      try {
        setLoading(true)
        const data = await fetchPrice(tokenId)
        setPrice(parseFloat(data.price))
      } catch (err) {
        console.error('Failed to fetch price:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPriceData()
    
    // Refresh price every 5 seconds
    const interval = setInterval(fetchPriceData, 5000)
    return () => clearInterval(interval)
  }, [tokenId])

  return { price, loading }
}
