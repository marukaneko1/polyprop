/**
 * Polymarket API Integration
 * 
 * APIs:
 * - Gamma API: Market discovery, metadata, events (via local proxy)
 * - CLOB API: Order management, prices, orderbooks (via local proxy)
 * - WebSocket: Real-time orderbook and price updates (direct connection)
 */

// Local API proxy routes (to avoid CORS issues)
export const LOCAL_API = '/api/polymarket'

// Direct WebSocket URL (WebSocket doesn't have CORS restrictions)
export const WS_URL = 'wss://ws-subscriptions-clob.polymarket.com/ws/'

// Types
export interface PolymarketEvent {
  id: string
  slug: string
  title: string
  description: string
  startDate: string
  endDate: string
  image: string
  icon: string
  active: boolean
  closed: boolean
  archived: boolean
  new: boolean
  featured: boolean
  restricted: boolean
  liquidity: number
  volume: number
  openInterest: number
  competitionState: string
  markets: PolymarketMarket[]
}

export interface PolymarketMarket {
  id: string
  question: string
  conditionId: string
  slug: string
  resolutionSource: string
  endDate: string
  liquidity: string
  startDate: string
  image: string
  icon: string
  description: string
  outcomes: string[]
  outcomePrices: string[]
  volume: string
  active: boolean
  closed: boolean
  archived: boolean
  new: boolean
  featured: boolean
  restricted: boolean
  groupItemTitle: string
  groupItemThreshold: string
  questionID: string
  enableOrderBook: boolean
  orderPriceMinTickSize: number
  orderMinSize: number
  volumeNum: number
  liquidityNum: number
  clobTokenIds: string[]
  acceptingOrders: boolean
  acceptingOrderTimestamp: string
  negRisk: boolean
  negRiskMarketID: string
  negRiskRequestID: string
}

export interface OrderBookLevel {
  price: string
  size: string
}

export interface OrderBook {
  market: string
  asset_id: string
  timestamp: string
  bids: OrderBookLevel[]
  asks: OrderBookLevel[]
  hash: string
}

export interface MarketPrice {
  token_id: string
  price: string
}

// Fetch markets via local API proxy
export async function fetchMarkets(params?: {
  limit?: number
  offset?: number
  active?: boolean
  closed?: boolean
  order?: string
  ascending?: boolean
}): Promise<PolymarketMarket[]> {
  const searchParams = new URLSearchParams()
  
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.offset) searchParams.set('offset', params.offset.toString())
  if (params?.active !== undefined) searchParams.set('active', params.active.toString())
  if (params?.closed !== undefined) searchParams.set('closed', params.closed.toString())
  if (params?.order) searchParams.set('order', params.order)
  if (params?.ascending !== undefined) searchParams.set('ascending', params.ascending.toString())
  
  const url = `${LOCAL_API}/markets?${searchParams.toString()}`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `Failed to fetch markets: ${response.status}`)
  }
  
  return response.json()
}

// Fetch order book via local API proxy
export async function fetchOrderBook(tokenId: string): Promise<OrderBook> {
  const response = await fetch(`${LOCAL_API}/orderbook?token_id=${tokenId}`, {
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store',
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `Failed to fetch orderbook: ${response.status}`)
  }
  
  return response.json()
}

// Fetch price via local API proxy
export async function fetchPrice(tokenId: string): Promise<MarketPrice> {
  const response = await fetch(`${LOCAL_API}/price?token_id=${tokenId}`, {
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store',
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `Failed to fetch price: ${response.status}`)
  }
  
  return response.json()
}

// Helper to safely parse JSON strings from API
function safeParseJson<T>(value: string | T[] | undefined, fallback: T[]): T[] {
  if (!value) return fallback
  if (Array.isArray(value)) return value
  try {
    const parsed = JSON.parse(value as string)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

// Helper to transform Polymarket market to our internal format
export function transformMarket(market: PolymarketMarket) {
  // Parse JSON string fields
  const outcomePrices = safeParseJson<string>(market.outcomePrices as unknown as string, ['0', '1'])
  const outcomes = safeParseJson<string>(market.outcomes as unknown as string, ['Yes', 'No'])
  const clobTokenIds = safeParseJson<string>(market.clobTokenIds as unknown as string, [])
  
  const prices = outcomePrices.map(p => parseFloat(p) || 0)
  const yesPrice = prices[0] || 0
  
  // Generate a shorter symbol from the slug
  const symbol = market.slug
    ?.split('-')
    .slice(0, 3)
    .map(w => w.charAt(0).toUpperCase())
    .join('') || market.id.slice(0, 6).toUpperCase()
  
  return {
    id: market.id,
    symbol,
    name: market.question,
    price: yesPrice,
    change: 0, // Would need historical data for this
    volume: `$${formatVolume(market.volumeNum || parseFloat(market.volume) || 0)}`,
    liquidity: market.liquidityNum || parseFloat(market.liquidity) || 0,
    tokenId: clobTokenIds[0] || '',
    outcomes,
    outcomePrices: prices,
    active: market.active && !market.closed,
    isFavorite: false,
  }
}

// Helper to format volume
function formatVolume(volume: number): string {
  if (volume >= 1_000_000) {
    return `${(volume / 1_000_000).toFixed(1)}M`
  }
  if (volume >= 1_000) {
    return `${(volume / 1_000).toFixed(0)}k`
  }
  return volume.toFixed(0)
}
