// =============================================================================
// PolyProp Type Definitions
// Re-export Prisma types and define application-specific types
// =============================================================================

// Export all Prisma types
export type {
  User,
  Session,
  OAuthAccount,
  PasswordResetToken,
  EmailVerificationToken,
  Account,
  AccountSnapshot,
  RuleViolation,
  Market,
  OrderBookSnapshot,
  Trade,
  Position,
  Subscription,
  Transaction,
  KycVerification,
  KycDocument,
  FraudFlag,
  PayoutRequest,
  PayoutMethod_ as PayoutMethodRecord,
  Notification,
  Announcement,
  SupportTicket,
  TicketMessage,
  AdminAuditLog,
  SystemSetting,
  DailyStats,
} from '@prisma/client'

// Export all enums
export {
  UserStatus,
  UserRole,
  AccountStatus,
  AccountTier,
  BreachType,
  TradeSide,
  TradeStatus,
  SubscriptionStatus,
  TransactionType,
  TransactionStatus,
  KycStatus,
  KycDocumentType,
  PayoutMethod,
  PayoutStatus,
  NotificationType,
  TicketStatus,
  TicketPriority,
} from '@prisma/client'

// =============================================================================
// Application-Specific Types
// =============================================================================

/**
 * Tier configuration with pricing
 */
export interface TierConfig {
  tier: string
  displayName: string
  accountSize: number
  monthlyPrice: number
  profitTarget1: number
  profitTarget2: number
  drawdownLimit: number
  minContracts: number
}

export const TIER_CONFIGS: Record<string, TierConfig> = {
  TIER_10K: {
    tier: 'TIER_10K',
    displayName: '$10k Evaluation',
    accountSize: 10000,
    monthlyPrice: 99,
    profitTarget1: 0.15,
    profitTarget2: 0.10,
    drawdownLimit: 0.08,
    minContracts: 10,
  },
  TIER_50K: {
    tier: 'TIER_50K',
    displayName: '$50k Evaluation',
    accountSize: 50000,
    monthlyPrice: 250,
    profitTarget1: 0.15,
    profitTarget2: 0.10,
    drawdownLimit: 0.08,
    minContracts: 10,
  },
  TIER_75K: {
    tier: 'TIER_75K',
    displayName: '$75k Evaluation',
    accountSize: 75000,
    monthlyPrice: 375,
    profitTarget1: 0.15,
    profitTarget2: 0.10,
    drawdownLimit: 0.08,
    minContracts: 10,
  },
  TIER_100K: {
    tier: 'TIER_100K',
    displayName: '$100k Evaluation',
    accountSize: 100000,
    monthlyPrice: 500,
    profitTarget1: 0.15,
    profitTarget2: 0.10,
    drawdownLimit: 0.08,
    minContracts: 10,
  },
  TIER_150K: {
    tier: 'TIER_150K',
    displayName: '$150k Evaluation',
    accountSize: 150000,
    monthlyPrice: 750,
    profitTarget1: 0.15,
    profitTarget2: 0.10,
    drawdownLimit: 0.08,
    minContracts: 10,
  },
}

/**
 * Order book level for Liquidity Guard
 */
export interface OrderBookLevel {
  price: number
  size: number
}

/**
 * Order book snapshot
 */
export interface OrderBook {
  bids: OrderBookLevel[]
  asks: OrderBookLevel[]
  spread: number
  midPrice: number
}

/**
 * Liquidity Guard fill calculation result
 */
export interface FillCalculation {
  avgPrice: number
  slippage: number
  liquidityConsumed: number
  canFill: boolean
  partialFill?: number
}

/**
 * Drawdown calculation result
 */
export interface DrawdownCalculation {
  currentEquity: number
  highWaterMark: number
  drawdownFloor: number
  drawdownUsed: number
  drawdownLimit: number
  drawdownRemaining: number
  isBreached: boolean
  isWarning: boolean
}

/**
 * Consistency rule check result
 */
export interface ConsistencyCheck {
  eventProfits: Record<string, number>
  totalProfit: number
  requiredProfit: number
  maxPerEvent: number
  violations: string[]
  isCompliant: boolean
  largestEventPercent: number
}

/**
 * Stage progress calculation
 */
export interface StageProgress {
  stage: 1 | 2
  currentBalance: number
  startingBalance: number
  targetBalance: number
  profitRequired: number
  currentProfit: number
  progressPercent: number
  isComplete: boolean
}

/**
 * Account dashboard summary
 */
export interface AccountSummary {
  account: {
    id: string
    accountNumber: number
    tier: string
    status: string
    stage: number
  }
  balance: {
    current: number
    starting: number
    equity: number
    unrealizedPnl: number
  }
  progress: StageProgress
  drawdown: DrawdownCalculation
  consistency: {
    maxEventPercent: number
    isCompliant: boolean
  }
  trading: {
    totalTrades: number
    winRate: number
    uniqueContracts: number
    minContractsRequired: number
  }
}

/**
 * Payout calculation
 */
export interface PayoutCalculation {
  grossProfit: number
  platformFeePercent: number
  platformFee: number
  processingFee: number
  netPayout: number
  isEligible: boolean
  ineligibilityReason?: string
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasMore: boolean
}
