// Database package - exports Prisma client and types

export { db } from './client'

// Re-export all Prisma types
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

// Re-export all enums
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
