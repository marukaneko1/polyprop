# PolyProp Complete Production Roadmap (A-Z)

> A comprehensive guide to building the entire PolyProp platform from start to production.

**Last Updated:** February 2026  
**Estimated Timeline:** ~5 months  
**Author:** PolyProp Development Team

---

## Table of Contents

1. [Phase 0: Foundation (Current State)](#phase-0-foundation-current-state)
2. [Phase 1: Core Infrastructure](#phase-1-core-infrastructure)
3. [Phase 2: Payment & Account System](#phase-2-payment--account-system)
4. [Phase 3: Trading Platform (Core)](#phase-3-trading-platform-core)
5. [Phase 4: Evaluation Rules Engine](#phase-4-evaluation-rules-engine)
6. [Phase 5: KYC & Compliance](#phase-5-kyc--compliance)
7. [Phase 6: Payout System](#phase-6-payout-system)
8. [Phase 7: Admin Dashboard](#phase-7-admin-dashboard)
9. [Phase 8: Notifications & Communications](#phase-8-notifications--communications)
10. [Phase 9: Analytics & Reporting](#phase-9-analytics--reporting)
11. [Phase 10: Security & Compliance](#phase-10-security--compliance)
12. [Phase 11: Testing & QA](#phase-11-testing--qa)
13. [Phase 12: Launch Preparation](#phase-12-launch-preparation)
14. [Phase 13: Launch & Post-Launch](#phase-13-launch--post-launch)
15. [System Architecture](#system-architecture)
16. [Database Schema](#database-schema)
17. [Tech Stack](#tech-stack)
18. [Timeline Summary](#timeline-summary)
19. [Checklist](#checklist)

---

## Phase 0: Foundation (Current State)

**Status:** ✅ Complete

### Completed Items
- [x] Landing page (polyprop.co)
- [x] Marketing content & copy
- [x] Basic auth UI (sign in/sign up page)
- [x] Legal pages (Terms, Privacy, Risk Disclaimer)
- [x] Responsive design
- [x] SEO optimization
- [x] Social media links

### Deliverables
- Marketing website at `polyprop.co`
- Authentication page at `/auth`
- Legal pages at `/terms`, `/privacy`, `/risk-disclaimer`
- FAQ and informational pages

---

## Phase 1: Core Infrastructure

**Timeline:** Weeks 1-2  
**Priority:** Critical - Everything depends on this  
**Status:** ⚠️ In Progress (1A, 1B, 1D complete; 1C needs implementation)

### 1A. Project Setup (Week 1) ✅ COMPLETE

#### Turborepo Monorepo Structure
```
polyprop/
├── apps/
│   ├── marketing/           # Landing page (polyprop.co) - Port 3000
│   │   ├── app/
│   │   ├── components/
│   │   └── package.json
│   │
│   ├── trading/             # Trading platform (trade.polyprop.co) - Port 3001
│   │   ├── app/
│   │   ├── components/
│   │   └── package.json
│   │
│   └── admin/               # Admin dashboard (admin.polyprop.co) - Port 3002
│       ├── app/
│       ├── components/
│       └── package.json
│
├── packages/
│   ├── ui/                  # Shared UI components (Button, Card, Badge, etc.)
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── config/              # Shared configurations
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.base.json
│   │   ├── tsconfig.nextjs.json
│   │   └── package.json
│   │
│   ├── database/            # Prisma schema & client (26 tables)
│   │   ├── prisma/
│   │   ├── src/
│   │   └── package.json
│   │
│   └── types/               # Shared TypeScript types
│       ├── src/
│       └── package.json
│
├── package.json             # Root package.json (pnpm workspaces)
├── turbo.json               # Turborepo configuration
├── pnpm-workspace.yaml      # Workspace configuration
└── .github/workflows/       # CI/CD pipelines per app
```

#### Tasks ✅
- [x] Initialize Turborepo monorepo
- [x] Move existing marketing site to `apps/marketing`
- [x] Create shared packages (ui, config, types, database)
- [x] Configure TypeScript paths
- [x] Set up CI/CD workflows for each app
- [ ] Set up ESLint & Prettier (shared config) - optional
- [ ] Configure Git hooks (Husky + lint-staged) - optional

### 1B. Database Design (Week 1-2) ✅ COMPLETE

#### Database Choice
- **Primary:** PostgreSQL (hosted on Supabase, Railway, or AWS RDS)
- **ORM:** Prisma 7.x
- **Cache:** Redis (sessions, real-time data) - to be configured

#### Database Schema (26 Tables)
```
User & Auth (5 tables):
├── users                    # Core user data
├── sessions                 # Active sessions
├── oauth_accounts           # Google/OAuth providers
├── password_reset_tokens
└── email_verification_tokens

Trading (7 tables):
├── accounts                 # Evaluation accounts
├── account_snapshots        # Daily balance history
├── rule_violations          # Rule breach logs
├── markets                  # Tradeable markets
├── order_book_snapshots     # Order book history
├── trades                   # Trade history
└── positions                # Open positions

Payments (2 tables):
├── subscriptions            # Stripe subscriptions
└── transactions             # Payment history

Compliance (3 tables):
├── kyc_verifications        # KYC status
├── kyc_documents            # Uploaded documents
└── fraud_flags              # Fraud detection

Payouts (2 tables):
├── payout_requests          # Payout requests
└── payout_methods           # Saved payout methods

Notifications (4 tables):
├── notifications            # User notifications
├── announcements            # System announcements
├── support_tickets          # Support tickets
└── ticket_messages          # Ticket replies

Admin (3 tables):
├── admin_audit_logs         # Admin actions
├── system_settings          # Configuration
└── daily_stats              # Analytics
```

#### Tasks ✅
- [x] Design complete database schema (26 tables with relations)
- [x] Set up Prisma in `packages/database`
- [x] Create seed script with sample data
- [x] Export types and enums
- [ ] Set up database connections (dev/staging/prod)
- [ ] Configure connection pooling
- [ ] Set up Redis instance

### 1C. Authentication System (Week 2) ⚠️ IN PROGRESS

#### Authentication Flow
```
User Journey:
1. User visits /auth
2. Signs up with email/password OR Google OAuth
3. Email verification sent
4. User verifies email
5. User can now access platform
6. JWT stored in HTTP-only cookie
7. Cookie shared across *.polyprop.co
```

#### Implementation Details
- **Provider:** NextAuth.js (Auth.js) v5 beta
- **Methods:** 
  - Email/Password with JWT
  - Google OAuth
  - (Optional) Apple OAuth, Discord OAuth
- **Token Storage:** HTTP-only cookies with domain `.polyprop.co`
- **Session:** 7-day expiry with refresh tokens

#### Current Status
- ✅ NextAuth.js v5 installed in `apps/trading` and `apps/admin`
- ✅ Auth UI exists at `apps/marketing/app/auth/page.tsx`
- ✅ Environment variables configured in `.env` (NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, etc.)
- ❌ NextAuth.js NOT installed in `apps/marketing`
- ❌ No `auth.ts` or `auth.config.ts` configuration file
- ❌ No `/api/auth/[...nextauth]/route.ts` API routes
- ❌ Auth UI not connected to backend (forms have TODO comments)

#### Tasks
- [x] Install NextAuth.js in trading/admin apps
- [x] Create auth UI page (marketing)
- [x] Set up environment variables
- [ ] Install NextAuth.js in marketing app
- [ ] Create `auth.ts` configuration file with Prisma adapter
- [ ] Create `/api/auth/[...nextauth]/route.ts` API routes
- [ ] Implement email/password credentials provider
- [ ] Implement Google OAuth provider
- [ ] Connect auth UI forms to NextAuth.js
- [ ] Set up email verification flow
- [ ] Implement password reset flow
- [ ] Configure JWT with proper expiry
- [ ] Set up refresh token rotation
- [ ] Test cross-subdomain authentication
- [ ] Implement rate limiting on auth endpoints

### 1D. CI/CD Pipeline (Week 2) ✅ COMPLETE

#### GitHub Actions Workflows
```yaml
# .github/workflows/ci.yml
- Checkout → Setup pnpm → Setup Node.js
- Install dependencies → Generate Prisma Client
- Type check → Lint → Build verification

# .github/workflows/deploy-marketing.yml
- Deploy marketing to Vercel (polyprop.co)

# .github/workflows/deploy-trading.yml  
- Generate Prisma Client → Deploy trading to Vercel (trade.polyprop.co)

# .github/workflows/deploy-admin.yml
- Generate Prisma Client → Deploy admin to Vercel (admin.polyprop.co)
```

#### Environments
| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | localhost:3000/3001/3002 | Local development |
| Staging | staging.polyprop.co | Testing before production |
| Production | polyprop.co | Live environment |

#### Tasks ✅
- [x] Set up GitHub Actions workflows (ci.yml, deploy-*.yml)
- [x] Configure Vercel deployment workflow for each app
- [x] Configure path-based triggers for deployments
- [ ] Set up environment variables per environment (in Vercel)
- [ ] Configure preview deployments (in Vercel)
- [ ] Set up staging environment
- [ ] Configure production deployment protection

---

## Phase 2: Payment & Account System

**Timeline:** Weeks 3-4  
**Priority:** Critical - Monetization

### 2A. Stripe Integration (Week 3)

#### Pricing Tiers
| Tier | Monthly Price | Account Size | Profit Target | Drawdown |
|------|--------------|--------------|---------------|----------|
| Starter | $99 | $10,000 | 15% / 10% | 8% |
| Standard | $250 | $50,000 | 15% / 10% | 8% |
| Professional | $375 | $75,000 | 15% / 10% | 8% |
| Advanced | $500 | $100,000 | 15% / 10% | 8% |
| Elite | $750 | $150,000 | 15% / 10% | 8% |

#### Add-ons
| Add-on | Price | Description |
|--------|-------|-------------|
| Drawdown Shield | Varies by tier | Increase drawdown from 8% to 10% |
| Express Pass | Varies by tier | Skip Stage 1, start at Stage 2 |

#### Stripe Products to Create
```
Products:
├── Evaluation Tier - $10k ($99/mo subscription)
├── Evaluation Tier - $50k ($250/mo subscription)
├── Evaluation Tier - $75k ($375/mo subscription)
├── Evaluation Tier - $100k ($500/mo subscription)
├── Evaluation Tier - $150k ($750/mo subscription)
├── Drawdown Shield - $10k (one-time)
├── Drawdown Shield - $50k (one-time)
├── ... (for each tier)
├── Express Pass - $10k (one-time)
└── ... (for each tier)
```

#### Webhook Events to Handle
```
checkout.session.completed     → Create account
customer.subscription.created  → Activate subscription
customer.subscription.updated  → Handle plan changes
customer.subscription.deleted  → Handle cancellation
invoice.payment_succeeded      → Record payment
invoice.payment_failed         → Handle failed payment
```

#### Tasks
- [ ] Create Stripe account & products
- [ ] Install Stripe SDK
- [ ] Implement checkout session creation
- [ ] Create webhook endpoint
- [ ] Handle all webhook events
- [ ] Implement subscription management
- [ ] Add payment method management
- [ ] Create invoice/receipt generation
- [ ] Handle failed payments (dunning)
- [ ] Implement coupon/promo codes
- [ ] Test with Stripe test mode

### 2B. Account Creation Flow (Week 3-4)

#### User Flow
```
1. User authenticated
2. User selects tier (pricing page)
3. User selects add-ons (optional)
4. User enters payment info (Stripe Checkout)
5. Payment successful
6. Webhook received
7. Account created with:
   - Starting balance
   - Stage = 1 (or 2 if Express Pass)
   - Drawdown limit (8% or 10%)
   - Status = Active
8. User redirected to trading platform
9. Welcome email sent
```

#### Account States
```
PENDING      → Payment processing
ACTIVE       → Currently trading (Stage 1 or 2)
PASSED       → Completed both stages, pending review
PARTNER      → Verified partner, can request payouts
BREACHED     → Failed evaluation (drawdown/rules)
EXPIRED      → Subscription lapsed
SUSPENDED    → Admin suspended
```

#### Tasks
- [ ] Create account creation service
- [ ] Implement account state machine
- [ ] Create account activation flow
- [ ] Implement multiple accounts per user
- [ ] Create account reset functionality
- [ ] Build account dashboard UI
- [ ] Implement subscription pause/resume
- [ ] Handle account expiration

---

## Phase 3: Trading Platform (Core)

**Timeline:** Weeks 5-8  
**Priority:** Critical - Core Product

### 3A. Platform Architecture (Week 5)

#### Real-Time Infrastructure
```
Client (Browser)
      │
      ▼
   WebSocket
      │
      ▼
Socket.io Server ──► Redis Pub/Sub ──► Other Instances
      │
      ▼
Market Data Service
      │
      ▼
   Database
```

#### Services
| Service | Purpose |
|---------|---------|
| Market Data Service | Fetches and distributes market prices |
| Order Service | Handles order placement and execution |
| Position Service | Tracks open positions |
| P&L Service | Calculates profit/loss |
| Rules Service | Monitors rule compliance |
| Notification Service | Sends alerts |

#### Tasks
- [ ] Set up WebSocket server (Socket.io)
- [ ] Implement Redis pub/sub for scaling
- [ ] Create market data service
- [ ] Design order flow architecture
- [ ] Set up real-time price updates
- [ ] Implement connection management
- [ ] Handle reconnection logic

### 3B. Trading Interface (Weeks 5-7)

#### Dashboard Components
```
Trading Dashboard
├── Header
│   ├── Logo (link to home)
│   ├── Account selector (if multiple)
│   ├── Account balance
│   ├── Notifications bell
│   └── User menu
│
├── Sidebar
│   ├── Dashboard (overview)
│   ├── Trade (order placement)
│   ├── Positions (open positions)
│   ├── History (trade history)
│   ├── Analytics (performance)
│   ├── Settings
│   └── Support
│
├── Main Content Area
│   └── (Changes based on sidebar selection)
│
└── Status Bar
    ├── Connection status
    ├── Server time
    └── Account status
```

#### Dashboard Overview
```
┌─────────────────────────────────────────────────────────────┐
│  Account Overview                                            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Balance    │  │   P&L Today  │  │  Drawdown    │      │
│  │  $53,240.00  │  │   +$1,240    │  │  2.1% / 8%   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Equity Curve                          │  │
│  │                    (Chart)                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │  Stage Progress     │  │  Consistency Rule           │  │
│  │  ████████░░ 6.5%/15%│  │  Max: 28% (< 40% ✓)        │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Open Positions (3)                       │  │
│  │  Market              Qty    Entry    Current   P&L    │  │
│  │  US Election         500    $0.542   $0.548   +$30    │  │
│  │  Fed Rate Cut        300    $0.234   $0.228   -$18    │  │
│  │  BTC > $100k         200    $0.678   $0.695   +$34    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

#### Trade Screen
```
┌─────────────────────────────────────────────────────────────┐
│  Trade                                                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Qualified Markets                                    │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ US Election Winner        $0.542   ▲ +2.4%      │ │   │
│  │  │ Fed Rate Cut March        $0.234   ▼ -1.8%      │ │   │
│  │  │ BTC > $100k EOY           $0.678   ▲ +5.2%      │ │   │
│  │  │ GDP Growth Q2             $0.445   ▲ +0.3%      │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌───────────────────────┐  ┌─────────────────────────────┐ │
│  │  Order Book           │  │  Order Ticket               │ │
│  │  $0.552    11,200     │  │  ┌─────────┬─────────┐     │ │
│  │  $0.548     4,300     │  │  │   BUY   │  SELL   │     │ │
│  │  $0.545     9,800     │  │  └─────────┴─────────┘     │ │
│  │  ─────────────────    │  │                             │ │
│  │  $0.542     6,200 ←   │  │  Shares: [____500____]     │ │
│  │  ─────────────────    │  │  Est. Cost: $271.00        │ │
│  │  $0.540     8,420     │  │                             │ │
│  │  $0.538    12,300     │  │  ┌─────────────────────┐   │ │
│  │  $0.535     5,800     │  │  │  Liquidity Guard    │   │ │
│  │  $0.532    15,600     │  │  │  Fill: $0.5424      │   │ │
│  └───────────────────────┘  │  │  Slip: +0.07%       │   │ │
│                              │  └─────────────────────┘   │ │
│                              │                             │ │
│                              │  [   PLACE ORDER   ]       │ │
│                              └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Tasks
- [ ] Create trading app layout
- [ ] Build sidebar navigation
- [ ] Implement dashboard overview
- [ ] Create market list component
- [ ] Build order book visualization
- [ ] Create order ticket form
- [ ] Implement position list
- [ ] Build trade history table
- [ ] Create equity curve chart
- [ ] Build progress indicators
- [ ] Implement responsive design

### 3C. Liquidity Guard System (Week 7-8)

#### How It Works
```
1. User places order for 500 shares at $0.542
2. System checks order book depth:
   - Level 1: 6,200 shares at $0.542
   - Level 2: 9,800 shares at $0.545
   - Level 3: 4,300 shares at $0.548
3. Calculate fill:
   - 500 shares can fill at $0.542
   - Weighted avg: $0.5424 (slight slippage)
4. Show estimated fill to user
5. Execute simulated trade at calculated price
```

#### Implementation
```typescript
interface OrderBookLevel {
  price: number;
  size: number;
}

function calculateFill(
  orderSize: number,
  side: 'buy' | 'sell',
  orderBook: { bids: OrderBookLevel[]; asks: OrderBookLevel[] }
): { avgPrice: number; slippage: number; liquidityConsumed: number } {
  const levels = side === 'buy' ? orderBook.asks : orderBook.bids;
  let remainingSize = orderSize;
  let totalCost = 0;
  let totalLiquidity = levels.reduce((sum, l) => sum + l.size, 0);
  
  for (const level of levels) {
    const fillSize = Math.min(remainingSize, level.size);
    totalCost += fillSize * level.price;
    remainingSize -= fillSize;
    if (remainingSize <= 0) break;
  }
  
  const avgPrice = totalCost / orderSize;
  const bestPrice = levels[0].price;
  const slippage = ((avgPrice - bestPrice) / bestPrice) * 100;
  const liquidityConsumed = (orderSize / totalLiquidity) * 100;
  
  return { avgPrice, slippage, liquidityConsumed };
}
```

#### Tasks
- [ ] Design Liquidity Guard algorithm
- [ ] Integrate real market depth data
- [ ] Calculate weighted average fills
- [ ] Implement slippage calculation
- [ ] Show pre-trade estimates
- [ ] Store execution details
- [ ] Filter for qualified markets only

---

## Phase 4: Evaluation Rules Engine

**Timeline:** Weeks 8-10  
**Priority:** Critical - Core Business Logic

### 4A. Rule Implementation (Week 8-9)

#### Trailing Drawdown
```
Rules:
1. Initial drawdown floor = Starting Balance - 8%
   Example: $50,000 - 8% = $46,000 floor

2. As equity grows, floor trails up (but never down)
   Example: 
   - Equity hits $52,000 → Floor moves to $47,840
   - Equity drops to $51,000 → Floor stays at $47,840
   - Equity hits $55,000 → Floor moves to $50,600

3. If equity touches floor → BREACH

4. With Drawdown Shield: 10% instead of 8%
```

```typescript
interface DrawdownCalculation {
  currentEquity: number;
  highWaterMark: number;
  drawdownFloor: number;
  drawdownUsed: number;
  drawdownLimit: number; // 8% or 10%
  isBreached: boolean;
}

function calculateDrawdown(
  currentEquity: number,
  highWaterMark: number,
  startingBalance: number,
  hasDrawdownShield: boolean
): DrawdownCalculation {
  const drawdownLimit = hasDrawdownShield ? 0.10 : 0.08;
  const newHighWaterMark = Math.max(highWaterMark, currentEquity);
  const drawdownFloor = newHighWaterMark * (1 - drawdownLimit);
  const drawdownUsed = (newHighWaterMark - currentEquity) / newHighWaterMark;
  const isBreached = currentEquity <= drawdownFloor;
  
  return {
    currentEquity,
    highWaterMark: newHighWaterMark,
    drawdownFloor,
    drawdownUsed,
    drawdownLimit,
    isBreached
  };
}
```

#### Profit Targets
```
Stage 1: 15% profit target
- Starting: $50,000
- Target: $57,500 (+$7,500)
- Upon reaching target → Progress to Stage 2

Stage 2: 10% profit target  
- Starting: $50,000 (reset)
- Target: $55,000 (+$5,000)
- Upon reaching target → Pass evaluation
```

#### 40% Consistency Rule
```
Rule: No single event can contribute > 40% of required profit

Example (Stage 1, $50k account):
- Required profit: $7,500 (15%)
- Max per event: $3,000 (40% of $7,500)

Tracking:
- Event A profit: $2,800 ✓ (37.3%)
- Event B profit: $2,200 ✓ (29.3%)
- Event C profit: $1,500 ✓ (20.0%)
- Event D profit: $1,000 ✓ (13.3%)
- Total: $7,500 → PASS

Violation Example:
- Event A profit: $5,000 ✗ (66.7% > 40%)
- Even if total profit reached, rule violated
```

```typescript
interface ConsistencyCheck {
  eventProfits: Map<string, number>;
  totalProfit: number;
  requiredProfit: number;
  maxPerEvent: number;
  violations: string[];
  isCompliant: boolean;
}

function checkConsistency(
  trades: Trade[],
  requiredProfit: number
): ConsistencyCheck {
  const maxPerEvent = requiredProfit * 0.40;
  const eventProfits = new Map<string, number>();
  
  // Group profits by event/market
  for (const trade of trades) {
    const current = eventProfits.get(trade.marketId) || 0;
    eventProfits.set(trade.marketId, current + trade.profit);
  }
  
  const violations: string[] = [];
  for (const [marketId, profit] of eventProfits) {
    if (profit > maxPerEvent) {
      violations.push(marketId);
    }
  }
  
  return {
    eventProfits,
    totalProfit: Array.from(eventProfits.values()).reduce((a, b) => a + b, 0),
    requiredProfit,
    maxPerEvent,
    violations,
    isCompliant: violations.length === 0
  };
}
```

#### Minimum Contracts Rule
```
Rule: Must trade at least 10 unique contracts

Purpose: Prevents gaming with single large bet

Tracking:
- Count unique market IDs traded
- Display progress: "7/10 contracts traded"
- Cannot pass until requirement met
```

#### Tasks
- [ ] Implement trailing drawdown calculator
- [ ] Create high-water mark tracking
- [ ] Build profit target tracker
- [ ] Implement 40% consistency checker
- [ ] Create unique contracts counter
- [ ] Build real-time rule monitoring
- [ ] Create rule violation alerts
- [ ] Implement breach detection

### 4B. Breach Handling (Week 9)

#### Breach Flow
```
1. Rule violation detected (drawdown/consistency)
2. Account immediately frozen
3. All open positions marked (no new trades)
4. Breach reason logged
5. Email notification sent
6. Account status → BREACHED
7. User sees breach screen with:
   - Which rule was violated
   - Final account statistics
   - Option to purchase new account
```

#### Breach Types
| Type | Description | Recoverable |
|------|-------------|-------------|
| Drawdown Breach | Equity hit floor | No |
| Consistency Violation | Single event > 40% | No |
| Subscription Expired | Payment failed/cancelled | Yes (pay) |
| Manual Suspension | Admin action | Admin decision |

#### Tasks
- [ ] Create breach detection service
- [ ] Implement account freeze logic
- [ ] Build breach notification system
- [ ] Create breach summary screen
- [ ] Log breach details for audit
- [ ] Handle edge cases (simultaneous trades)

### 4C. Stage Progression (Week 9-10)

#### Progression Flow
```
Stage 1 Completion:
1. Profit target reached (15%)
2. All rules compliant
3. Minimum contracts met
4. System validates all criteria
5. Account status → STAGE_2
6. Balance reset to starting amount
7. Drawdown/HWM reset
8. Congratulations email sent
9. User continues trading

Stage 2 Completion:
1. Profit target reached (10%)
2. All rules compliant
3. Minimum contracts met
4. System validates all criteria
5. Account status → PASSED
6. Triggers KYC requirement
7. Email: "Congratulations! Complete KYC"
8. Account enters review queue
```

#### Tasks
- [ ] Implement stage completion detection
- [ ] Create account reset logic
- [ ] Build progression notifications
- [ ] Implement statistics snapshots
- [ ] Create stage completion certificates
- [ ] Trigger KYC flow automatically

---

## Phase 5: KYC & Compliance

**Timeline:** Weeks 10-12  
**Priority:** High - Required for Payouts

### 5A. KYC System (Week 10-11)

#### KYC Provider Options
| Provider | Pricing | Features |
|----------|---------|----------|
| Onfido | ~$2-5/verification | Good balance |
| Jumio | ~$5-10/verification | Enterprise-grade |
| Veriff | ~$1-3/verification | Cost-effective |
| Sumsub | ~$1-2/verification | Comprehensive |

#### Required Documents
1. **Government-Issued ID** (Passport, Driver's License, National ID)
2. **Proof of Address** (Utility bill, Bank statement - last 3 months)
3. **Selfie Verification** (Live photo matching ID)

#### KYC States
```
NOT_STARTED    → User hasn't begun KYC
IN_PROGRESS    → Documents submitted, awaiting verification
PENDING_REVIEW → Automated check done, needs manual review
APPROVED       → Verified successfully
REJECTED       → Verification failed
RESUBMIT       → Need new documents
```

#### KYC Flow
```
1. User passes Stage 2
2. Prompt to complete KYC
3. User uploads ID document
4. User uploads proof of address
5. User takes selfie
6. Documents sent to KYC provider
7. Automated verification
8. If unclear → Manual review queue
9. Approved → Account status → PARTNER
10. Rejected → User notified, can resubmit
```

#### Tasks
- [ ] Choose and integrate KYC provider
- [ ] Create document upload UI
- [ ] Implement selfie capture
- [ ] Handle KYC webhook responses
- [ ] Build manual review queue
- [ ] Create rejection/resubmit flow
- [ ] Store documents securely
- [ ] Implement document expiry checks

### 5B. Compliance Checks (Week 11)

#### Checks to Implement
1. **Sanctions Screening**
   - Check against OFAC, EU, UN lists
   - Most KYC providers include this

2. **PEP Screening** (Politically Exposed Persons)
   - Flag for enhanced due diligence
   - May require additional review

3. **Multi-Account Detection**
   ```
   Signals to check:
   - Same IP address
   - Same device fingerprint
   - Same payment method
   - Same KYC documents
   - Similar trading patterns
   - Same household address
   ```

4. **Fraud Scoring**
   - Combine multiple signals
   - Flag high-risk accounts for review

#### Tasks
- [ ] Implement sanctions screening
- [ ] Set up PEP checking
- [ ] Build device fingerprinting
- [ ] Create IP tracking system
- [ ] Implement duplicate detection
- [ ] Build fraud scoring model
- [ ] Create manual review workflow

---

## Phase 6: Payout System

**Timeline:** Weeks 11-13  
**Priority:** High - Complete User Loop

### 6A. Payout Request Flow (Week 11-12)

#### Eligibility Requirements
```
Before requesting payout, user must:
✓ Have PARTNER status
✓ Have completed KYC
✓ Have minimum payout amount (e.g., $100)
✓ Not be in payout cooldown (e.g., 14 days)
✓ Have no pending violations
✓ Have verified payment method
```

#### Payout Flow
```
1. Partner requests payout
2. System validates eligibility
3. Calculate payout amount:
   - Gross profit
   - Platform fee (e.g., 20%)
   - Net payout to trader (e.g., 80%)
   - Any processing fees
4. Request enters admin queue
5. Admin reviews:
   - Trading activity legitimate?
   - No suspicious patterns?
   - KYC still valid?
6. Approved → Process payout
7. Rejected → Notify with reason
8. Payment initiated
9. Confirmation email sent
```

#### Payout Calculation
```
Example:
- Account Balance: $58,000
- Starting Balance: $50,000
- Gross Profit: $8,000
- Platform Share (20%): $1,600
- Trader Share (80%): $6,400
- Processing Fee: $25
- Net Payout: $6,375
```

#### Tasks
- [ ] Create payout eligibility checker
- [ ] Build payout request form
- [ ] Implement payout calculation
- [ ] Create admin approval queue
- [ ] Build payout execution service
- [ ] Send confirmation emails
- [ ] Track payout history
- [ ] Implement cooldown periods

### 6B. Payout Methods (Week 12)

#### Supported Methods
| Method | Processing Time | Fees | Min/Max |
|--------|----------------|------|---------|
| Bank Transfer (Wise) | 1-3 business days | ~1% | $100 / $50,000 |
| PayPal | Instant - 1 day | 2-3% | $50 / $10,000 |
| Crypto (USDC) | ~30 minutes | Gas fees | $100 / No max |

#### Integration
- **Wise API** - For bank transfers (recommended)
- **PayPal Payouts** - Mass payments API
- **Circle/Coinbase** - For crypto payouts

#### Tasks
- [ ] Integrate Wise for bank transfers
- [ ] Set up PayPal payouts (optional)
- [ ] Implement crypto payouts (optional)
- [ ] Handle currency conversion
- [ ] Track transfer status
- [ ] Handle failed transfers

### 6C. Profit Split & Reporting (Week 12-13)

#### Profit Split Structure
```
Standard Split: 80/20 (Trader/Platform)

Tiers (Optional):
- $0-10k profit: 75/25
- $10k-50k profit: 80/20
- $50k+ profit: 85/15
```

#### Reporting Requirements
```
For Users:
- Monthly statement (P&L, payouts, fees)
- Annual tax summary
- Trade history export

For Platform:
- Revenue reports
- Payout summaries
- Tax documentation
```

#### Tasks
- [ ] Implement profit split calculation
- [ ] Create payout reports
- [ ] Generate user statements
- [ ] Build tax document generation
- [ ] Create export functionality

---

## Phase 7: Admin Dashboard

**Timeline:** Weeks 13-16  
**Priority:** High - Operations

### 7A. User Management (Week 13)

#### User List View
```
┌─────────────────────────────────────────────────────────────────┐
│  Users                                           [+ Add User]   │
├─────────────────────────────────────────────────────────────────┤
│  Search: [________________] Status: [All ▼] Sort: [Recent ▼]   │
├─────────────────────────────────────────────────────────────────┤
│  ID     Name          Email              Status    Joined      │
│  1234   John Doe      john@email.com     Active    2026-01-15  │
│  1235   Jane Smith    jane@email.com     Partner   2026-01-10  │
│  1236   Bob Wilson    bob@email.com      Suspended 2026-01-05  │
│  ...                                                             │
├─────────────────────────────────────────────────────────────────┤
│  Showing 1-50 of 1,234 users              [< Prev] [Next >]    │
└─────────────────────────────────────────────────────────────────┘
```

#### User Detail View
```
┌─────────────────────────────────────────────────────────────────┐
│  User: John Doe (#1234)                    [Actions ▼]         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  Profile                                   │
│  │    [Avatar]     │  Email: john@email.com (verified ✓)       │
│  │                 │  Phone: +1 555-123-4567                    │
│  │                 │  Joined: January 15, 2026                  │
│  └─────────────────┘  Last Login: 2 hours ago                   │
│                       KYC Status: Approved ✓                    │
├─────────────────────────────────────────────────────────────────┤
│  Tabs: [Accounts] [Trades] [Payments] [KYC] [Notes] [Logs]     │
├─────────────────────────────────────────────────────────────────┤
│  Accounts (3)                                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ #5001 - $50k - Stage 2 - Balance: $54,230 - Active      │   │
│  │ #4892 - $10k - Breached (Drawdown) - Closed             │   │
│  │ #4501 - $50k - Partner - Balance: $62,100 - Active      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### Admin Actions
- View user details
- View all user accounts
- Suspend/unsuspend user
- Reset password
- Adjust account balance
- Add internal notes
- View audit logs
- Impersonate (for support)

#### Tasks
- [ ] Create user list with search/filter
- [ ] Build user detail page
- [ ] Implement user actions
- [ ] Create notes system
- [ ] Build impersonation mode
- [ ] Implement audit logging

### 7B. Account Management (Week 13-14)

#### Account List View
```
┌─────────────────────────────────────────────────────────────────┐
│  Accounts                                                        │
├─────────────────────────────────────────────────────────────────┤
│  Filter: Status [Active ▼] Tier [All ▼] Stage [All ▼]         │
├─────────────────────────────────────────────────────────────────┤
│  ID     User          Tier   Stage  Balance   Drawdown  Status │
│  5001   John Doe      $50k   2      $54,230   3.2%      Active │
│  5002   Jane Smith    $100k  1      $98,400   5.1%      Active │
│  5003   Bob Wilson    $50k   -      $62,100   1.8%      Partner│
│  ...                                                             │
└─────────────────────────────────────────────────────────────────┘
```

#### Account Actions
- View full trade history
- View equity curve
- Check rule compliance
- Manual balance adjustment
- Force stage progression
- Reset account
- Extend subscription
- Mark as breached

#### Tasks
- [ ] Create account list view
- [ ] Build account detail page
- [ ] Implement account actions
- [ ] Create trade history viewer
- [ ] Build compliance checker view
- [ ] Implement manual overrides

### 7C. Financial Management (Week 14)

#### Revenue Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  Revenue Dashboard                        Period: [This Month]  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │     MRR      │  │   New Subs   │  │    Churn     │          │
│  │   $45,230    │  │      142     │  │    3.2%      │          │
│  │   ▲ +12%     │  │   ▲ +28      │  │   ▼ -0.5%   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  [Revenue Chart - Line graph showing MRR over time]             │
│                                                                  │
│  ┌────────────────────────────────────┐                         │
│  │  Revenue by Tier                   │                         │
│  │  $10k: $9,900 (100 subs)          │                         │
│  │  $50k: $25,000 (100 subs)         │                         │
│  │  $75k: $5,625 (15 subs)           │                         │
│  │  $100k: $3,500 (7 subs)           │                         │
│  │  $150k: $1,500 (2 subs)           │                         │
│  └────────────────────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

#### Tasks
- [ ] Create revenue dashboard
- [ ] Build subscription analytics
- [ ] Implement churn tracking
- [ ] Create financial reports
- [ ] Build refund processing
- [ ] Export to CSV/PDF

### 7D. KYC Review Queue (Week 14-15)

#### Review Interface
```
┌─────────────────────────────────────────────────────────────────┐
│  KYC Review Queue (12 pending)                                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ John Doe (#1234) - Submitted 2 hours ago                 │   │
│  │                                                           │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐            │   │
│  │ │ [ID Front] │ │ [ID Back]  │ │  [Selfie]  │            │   │
│  │ └────────────┘ └────────────┘ └────────────┘            │   │
│  │                                                           │   │
│  │ Auto-check results:                                       │   │
│  │ ✓ Document authentic                                      │   │
│  │ ✓ Selfie matches ID                                       │   │
│  │ ⚠ Address needs manual verification                       │   │
│  │                                                           │   │
│  │ [Approve] [Reject ▼] [Request More Info]                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### Tasks
- [ ] Create KYC queue interface
- [ ] Build document viewer
- [ ] Implement approve/reject workflow
- [ ] Create rejection reasons
- [ ] Build resubmission flow
- [ ] Add audit trail

### 7E. Payout Approval (Week 15)

#### Payout Queue
```
┌─────────────────────────────────────────────────────────────────┐
│  Payout Requests (5 pending)                                     │
├─────────────────────────────────────────────────────────────────┤
│  User         Account   Amount    Method      Requested         │
│  John Doe     #5001     $6,375    Bank Wire   2 hours ago       │
│  Jane Smith   #5003     $12,800   PayPal      5 hours ago       │
│  ...                                                             │
├─────────────────────────────────────────────────────────────────┤
│  [View Details] to review and approve                           │
└─────────────────────────────────────────────────────────────────┘
```

#### Payout Detail View
```
┌─────────────────────────────────────────────────────────────────┐
│  Payout Request #8901                                            │
├─────────────────────────────────────────────────────────────────┤
│  User: John Doe (#1234)                                          │
│  Account: #5001 ($50k tier, Partner)                            │
│  KYC: Approved ✓                                                 │
│                                                                  │
│  Payout Calculation:                                             │
│  Gross Profit:     $8,000                                        │
│  Platform Fee:     -$1,600 (20%)                                │
│  Processing Fee:   -$25                                          │
│  Net Payout:       $6,375                                        │
│                                                                  │
│  Payment Method: Bank Wire                                       │
│  Account: ****1234 (Verified ✓)                                 │
│                                                                  │
│  Risk Check:                                                     │
│  ✓ Trading patterns normal                                       │
│  ✓ No suspicious activity                                        │
│  ✓ KYC current                                                   │
│                                                                  │
│  [Approve & Process] [Reject] [Request Review]                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Tasks
- [ ] Create payout queue
- [ ] Build payout detail view
- [ ] Implement approval workflow
- [ ] Add risk checking
- [ ] Create rejection flow
- [ ] Build payout execution
- [ ] Track payout status

### 7F. System Settings (Week 15-16)

#### Configurable Settings
```
Trading Settings:
- Drawdown limit (default/with shield)
- Profit targets (Stage 1/Stage 2)
- Consistency rule percentage
- Minimum contracts requirement
- Market qualification threshold

Payout Settings:
- Profit split percentage
- Minimum payout amount
- Payout cooldown period
- Processing fees

Subscription Settings:
- Tier pricing
- Add-on pricing
- Trial periods
- Dunning settings
```

#### Tasks
- [ ] Create settings interface
- [ ] Implement setting storage
- [ ] Add setting validation
- [ ] Create feature flags
- [ ] Build announcement system

---

## Phase 8: Notifications & Communications

**Timeline:** Weeks 15-16  
**Priority:** Medium - User Experience

### 8A. Email System (Week 15-16)

#### Email Provider
- **Recommended:** SendGrid, Postmark, or AWS SES
- **Features needed:** Transactional email, templates, tracking

#### Email Templates
```
Authentication:
- Welcome email
- Email verification
- Password reset
- Login from new device

Account:
- Account activated
- Subscription confirmed
- Payment receipt
- Payment failed
- Subscription expiring
- Subscription cancelled

Trading:
- Stage 1 complete
- Stage 2 complete / Evaluation passed
- Account breached
- Daily summary (optional)
- Weekly report (optional)

KYC:
- KYC reminder
- KYC submitted
- KYC approved
- KYC rejected

Payouts:
- Payout requested
- Payout approved
- Payout processed
- Payout rejected
```

#### Tasks
- [ ] Set up email provider
- [ ] Create branded email templates
- [ ] Implement transactional emails
- [ ] Add email preferences
- [ ] Track open/click rates
- [ ] Handle bounces/complaints

### 8B. In-App Notifications (Week 16)

#### Notification Types
```
Real-time (WebSocket):
- Trade executed
- Position closed
- Rule warning (approaching limit)
- Breach alert

Standard (Polling):
- Account status change
- KYC update
- Payout update
- System announcements
```

#### Notification Center
```
┌────────────────────────────────┐
│ Notifications            Mark all read │
├────────────────────────────────┤
│ 🎉 Stage 1 Complete!          2h │
│ Your $50k account has...          │
│                                    │
│ ⚠️ Drawdown Warning             5h │
│ You're at 6.5% of 8%...           │
│                                    │
│ ✓ Trade Executed                 1d │
│ Bought 500 shares of...           │
└────────────────────────────────┘
```

#### Tasks
- [ ] Create notification service
- [ ] Build notification center UI
- [ ] Implement real-time delivery
- [ ] Add notification preferences
- [ ] Create mobile push (optional)

---

## Phase 9: Analytics & Reporting

**Timeline:** Weeks 16-17  
**Priority:** Medium - Insights

### 9A. User Analytics (Week 16-17)

#### Metrics to Track
```
Performance Metrics:
- Win rate
- Profit factor
- Average win/loss
- Largest win/loss
- Sharpe ratio
- Max drawdown

Trading Patterns:
- Markets traded
- Average position size
- Holding period
- Trading frequency
- Time of day patterns
```

#### Analytics Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  Performance Analytics               Period: [Last 30 days ▼]   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │Win Rate │ │ P Factor│ │Avg Win  │ │Avg Loss │ │ Sharpe  │  │
│  │  62.3%  │ │   1.85  │ │  $340   │ │  $180   │ │   1.42  │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                                  │
│  [Equity Curve Chart]                                           │
│                                                                  │
│  [Trade Distribution by Market - Pie Chart]                     │
│                                                                  │
│  [Win/Loss by Time of Day - Bar Chart]                          │
└─────────────────────────────────────────────────────────────────┘
```

#### Tasks
- [ ] Implement performance calculations
- [ ] Create analytics dashboard
- [ ] Build equity curve chart
- [ ] Add trade analysis
- [ ] Create export functionality

### 9B. Platform Analytics (Week 17)

#### Funnel Tracking
```
User Funnel:
Visitors → Signups → Paid → Stage 1 → Stage 2 → Partner

Conversion Rates:
- Visitor to Signup: 5%
- Signup to Paid: 15%
- Paid to Stage 2: 40%
- Stage 2 to Partner: 60%
- Partner to Payout: 80%
```

#### Business Metrics
```
Key Metrics:
- Monthly Active Users (MAU)
- Daily Active Users (DAU)
- Monthly Recurring Revenue (MRR)
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)
- Customer Acquisition Cost (CAC)
- Churn Rate
- Net Promoter Score (NPS)
```

#### Tasks
- [ ] Set up analytics (Mixpanel/Amplitude)
- [ ] Track funnel events
- [ ] Create business dashboards
- [ ] Implement cohort analysis
- [ ] Set up error tracking (Sentry)

---

## Phase 10: Security & Compliance

**Timeline:** Week 18  
**Priority:** Critical - Before Launch

### 10A. Security Hardening (Week 18)

#### Security Measures
```
Authentication:
- Strong password requirements
- Rate limiting on login
- Account lockout after failures
- 2FA (optional but recommended)

API Security:
- JWT with short expiry
- Refresh token rotation
- API rate limiting
- Input validation
- SQL injection prevention
- XSS prevention
- CSRF tokens

Infrastructure:
- HTTPS everywhere
- Secure headers (HSTS, CSP)
- DDoS protection (Cloudflare)
- WAF (Web Application Firewall)
- Secrets management (env vars)
```

#### Security Headers
```typescript
// next.config.js
headers: [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; ..."
  }
]
```

#### Tasks
- [ ] Implement rate limiting
- [ ] Add security headers
- [ ] Set up Cloudflare
- [ ] Configure WAF rules
- [ ] Audit authentication flow
- [ ] Penetration testing
- [ ] Security code review

### 10B. Data Protection (Week 18)

#### GDPR Compliance
```
Requirements:
- Privacy policy
- Cookie consent
- Data access request
- Data deletion request
- Data portability
- Breach notification process
```

#### Data Handling
```
Encryption:
- At rest: AES-256
- In transit: TLS 1.3
- PII encrypted in database

Retention:
- User data: Account lifetime + 5 years
- Trade data: 7 years (compliance)
- Logs: 1 year
- Deleted accounts: 30 days then purge
```

#### Tasks
- [ ] Implement data encryption
- [ ] Create data export feature
- [ ] Build account deletion flow
- [ ] Set up data retention policies
- [ ] Create backup procedures
- [ ] Document data handling

### 10C. Audit Logging (Week 18)

#### Events to Log
```
User Actions:
- Login/logout
- Password change
- Profile update
- Trade placed
- Payout requested

Admin Actions:
- User modified
- Account adjusted
- Payout approved/rejected
- Settings changed

System Events:
- Account breach
- Stage progression
- KYC status change
- Payment events
```

#### Tasks
- [ ] Implement audit logging
- [ ] Create log viewer (admin)
- [ ] Set up log aggregation
- [ ] Configure alerts
- [ ] Retention policy

---

## Phase 11: Testing & QA

**Timeline:** Weeks 19-20  
**Priority:** Critical - Before Launch

### 11A. Testing Strategy (Week 19)

#### Test Types
```
Unit Tests (Jest):
- Pure functions
- Utility helpers
- Calculations (drawdown, profit split)

Integration Tests:
- API endpoints
- Database operations
- External services

E2E Tests (Playwright):
- User signup flow
- Payment flow
- Trading flow
- Admin workflows

Load Tests (k6):
- Concurrent users
- WebSocket connections
- Order throughput
```

#### Test Coverage Goals
```
Minimum Coverage:
- Unit tests: 80%
- Integration tests: 70%
- E2E tests: Critical paths

Critical Paths:
- Authentication flow
- Payment flow
- Trading execution
- Rule calculations
- Payout process
```

#### Tasks
- [ ] Set up testing frameworks
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Write E2E tests
- [ ] Set up CI test running
- [ ] Perform load testing

### 11B. Demo/Sandbox Mode (Week 19)

#### Demo Account Features
```
- No payment required
- Limited time (e.g., 7 days)
- Full platform access
- Paper money trading
- Watermarked as "DEMO"
- Cannot request payouts
```

#### Sandbox Environment
```
- Stripe test mode
- Test market data
- Isolated database
- Demo KYC (auto-approve)
```

#### Tasks
- [ ] Create demo account type
- [ ] Implement demo limitations
- [ ] Set up sandbox environment
- [ ] Create demo onboarding

---

## Phase 12: Launch Preparation

**Timeline:** Weeks 20-21  
**Priority:** Critical

### 12A. Infrastructure (Week 20)

#### Production Setup Checklist
```
Hosting:
□ Production database (with replicas)
□ Redis cluster
□ CDN configured
□ SSL certificates
□ Domain DNS configured

Monitoring:
□ Uptime monitoring
□ Error tracking (Sentry)
□ Performance monitoring
□ Log aggregation
□ Alert configuration

Backup:
□ Database backups (daily)
□ Point-in-time recovery
□ Backup testing
□ Disaster recovery plan
```

#### Scaling Considerations
```
Expected Load:
- 1,000 concurrent users (initial)
- 10,000 WebSocket connections
- 100 trades/second peak

Infrastructure:
- Auto-scaling enabled
- Database connection pooling
- Redis clustering
- CDN for static assets
```

#### Tasks
- [ ] Set up production infrastructure
- [ ] Configure monitoring
- [ ] Set up backups
- [ ] Test disaster recovery
- [ ] Load test production

### 12B. Documentation (Week 20)

#### User Documentation
```
Getting Started:
- Account creation guide
- Platform walkthrough
- First trade tutorial
- Video tutorials

Trading Rules:
- Drawdown explained
- Consistency rule guide
- Stage progression
- Common mistakes

FAQ:
- Account questions
- Trading questions
- Payment questions
- Technical support
```

#### Internal Documentation
```
- API documentation
- Database schema docs
- Deployment procedures
- Incident response playbook
- Support procedures
```

#### Tasks
- [ ] Write user documentation
- [ ] Create video tutorials
- [ ] Document APIs
- [ ] Write runbooks
- [ ] Create support guides

### 12C. Legal Review (Week 20)

#### Final Checklist
```
□ Terms of Service (lawyer reviewed)
□ Privacy Policy (GDPR compliant)
□ Risk Disclaimer (comprehensive)
□ Cookie Policy
□ Refund Policy
□ KYC/AML compliance
□ Business registration
□ Required licenses (if any)
```

#### Tasks
- [ ] Legal review of all documents
- [ ] Compliance verification
- [ ] Update policies as needed
- [ ] Implement cookie consent

---

## Phase 13: Launch & Post-Launch

**Timeline:** Weeks 21-22+  
**Priority:** Critical

### 13A. Soft Launch (Week 21)

#### Beta Program
```
- Invite 50-100 beta users
- Discounted pricing
- Direct feedback channel
- Bug bounty program
- Daily monitoring
```

#### Focus Areas
```
- Critical bug fixes
- Performance optimization
- User feedback collection
- Support process testing
- Payment flow validation
```

#### Tasks
- [ ] Recruit beta users
- [ ] Set up feedback channels
- [ ] Monitor closely
- [ ] Fix critical issues
- [ ] Iterate based on feedback

### 13B. Public Launch (Week 22)

#### Launch Checklist
```
Pre-Launch:
□ All critical bugs fixed
□ Performance acceptable
□ Support team ready
□ Marketing materials ready
□ Social media scheduled
□ Press release (if applicable)

Launch Day:
□ Remove beta restrictions
□ Enable public signups
□ Announce on socials
□ Monitor systems
□ Support on standby
□ Celebrate! 🎉

Post-Launch:
□ Monitor metrics
□ Respond to feedback
□ Fix emerging issues
□ Iterate quickly
```

#### Tasks
- [ ] Complete pre-launch checklist
- [ ] Execute launch plan
- [ ] Monitor systems
- [ ] Provide support
- [ ] Collect feedback

### 13C. Post-Launch Operations

#### Ongoing Tasks
```
Daily:
- Monitor system health
- Review support tickets
- Check error logs
- Process payouts

Weekly:
- Review metrics
- Team sync
- Plan improvements
- Community engagement

Monthly:
- Financial review
- Feature planning
- Performance analysis
- Security audit
```

#### Iteration Priorities
```
Based on feedback:
1. Fix bugs
2. Improve UX
3. Add requested features
4. Optimize performance
5. Scale infrastructure
```

---

## System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Browser (polyprop.co)    Browser (trade.polyprop.co)    Mobile App     │
│         │                          │                         │          │
│         └──────────────────────────┼─────────────────────────┘          │
│                                    │                                     │
│                                    ▼                                     │
│                          ┌─────────────────┐                            │
│                          │   Cloudflare    │                            │
│                          │   (CDN + WAF)   │                            │
│                          └────────┬────────┘                            │
│                                   │                                      │
└───────────────────────────────────┼──────────────────────────────────────┘
                                    │
┌───────────────────────────────────┼──────────────────────────────────────┐
│                              FRONTEND                                    │
├───────────────────────────────────┼──────────────────────────────────────┤
│                                   │                                      │
│   ┌───────────────┐   ┌──────────┴───────────┐   ┌───────────────┐     │
│   │   Marketing   │   │       Trading        │   │     Admin     │     │
│   │   (Vercel)    │   │      (Vercel)        │   │   (Vercel)    │     │
│   │               │   │                      │   │               │     │
│   │ polyprop.co   │   │  trade.polyprop.co     │   │admin.polyprop │     │
│   └───────────────┘   └──────────────────────┘   └───────────────┘     │
│                                   │                                      │
└───────────────────────────────────┼──────────────────────────────────────┘
                                    │
                                    │ HTTPS / WebSocket
                                    │
┌───────────────────────────────────┼──────────────────────────────────────┐
│                              BACKEND                                     │
├───────────────────────────────────┼──────────────────────────────────────┤
│                                   │                                      │
│                    ┌──────────────┴──────────────┐                      │
│                    │        Load Balancer        │                      │
│                    │         (nginx)             │                      │
│                    └──────────────┬──────────────┘                      │
│                                   │                                      │
│            ┌──────────────────────┼──────────────────────┐              │
│            │                      │                      │              │
│   ┌────────┴────────┐  ┌─────────┴─────────┐  ┌────────┴────────┐     │
│   │   API Server    │  │   API Server      │  │  WebSocket      │     │
│   │   (Node.js)     │  │   (Node.js)       │  │  Server         │     │
│   │   Instance 1    │  │   Instance 2      │  │  (Socket.io)    │     │
│   └────────┬────────┘  └─────────┬─────────┘  └────────┬────────┘     │
│            │                      │                      │              │
│            └──────────────────────┼──────────────────────┘              │
│                                   │                                      │
│                    ┌──────────────┴──────────────┐                      │
│                    │      Background Jobs        │                      │
│                    │      (Bull / BullMQ)        │                      │
│                    └──────────────┬──────────────┘                      │
│                                   │                                      │
└───────────────────────────────────┼──────────────────────────────────────┘
                                    │
┌───────────────────────────────────┼──────────────────────────────────────┐
│                            DATA LAYER                                    │
├───────────────────────────────────┼──────────────────────────────────────┤
│                                   │                                      │
│   ┌───────────────┐   ┌──────────┴───────────┐   ┌───────────────┐     │
│   │  PostgreSQL   │   │       Redis          │   │  File Storage │     │
│   │   (Primary)   │   │   (Cache/Pub-Sub)    │   │     (S3)      │     │
│   │               │◄──┤                      │   │               │     │
│   │  - Users      │   │  - Sessions          │   │  - KYC docs   │     │
│   │  - Accounts   │   │  - Real-time data    │   │  - Exports    │     │
│   │  - Trades     │   │  - Job queues        │   │  - Backups    │     │
│   │  - Payouts    │   │  - Rate limiting     │   │               │     │
│   └───────────────┘   └──────────────────────┘   └───────────────┘     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────┼──────────────────────────────────────┐
│                        EXTERNAL SERVICES                                 │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│   │   Stripe    │  │  SendGrid   │  │   Onfido    │  │    Wise     │   │
│   │  (Payments) │  │  (Email)    │  │   (KYC)     │  │  (Payouts)  │   │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                          │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│   │   Sentry    │  │  Datadog    │  │   Mixpanel  │  │ Market Data │   │
│   │  (Errors)   │  │ (Monitoring)│  │ (Analytics) │  │    Feed     │   │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Core Tables

```sql
-- =============================================
-- USERS & AUTHENTICATION
-- =============================================

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  email_verified  BOOLEAN DEFAULT FALSE,
  password_hash   VARCHAR(255),
  name            VARCHAR(255),
  phone           VARCHAR(50),
  avatar_url      VARCHAR(500),
  status          VARCHAR(50) DEFAULT 'active', -- active, suspended, banned
  role            VARCHAR(50) DEFAULT 'user',   -- user, admin, support
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  token           VARCHAR(500) NOT NULL,
  refresh_token   VARCHAR(500),
  expires_at      TIMESTAMP NOT NULL,
  ip_address      VARCHAR(45),
  user_agent      TEXT,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE oauth_accounts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  provider        VARCHAR(50) NOT NULL,  -- google, discord, etc.
  provider_id     VARCHAR(255) NOT NULL,
  access_token    TEXT,
  refresh_token   TEXT,
  expires_at      TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider, provider_id)
);

-- =============================================
-- EVALUATION ACCOUNTS
-- =============================================

CREATE TABLE accounts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  account_number      SERIAL UNIQUE,
  
  -- Tier Info
  tier                VARCHAR(50) NOT NULL,    -- 10k, 50k, 75k, 100k, 150k
  starting_balance    DECIMAL(15,2) NOT NULL,
  
  -- Current State
  balance             DECIMAL(15,2) NOT NULL,
  high_water_mark     DECIMAL(15,2) NOT NULL,
  stage               INTEGER DEFAULT 1,       -- 1, 2, or null (passed)
  status              VARCHAR(50) DEFAULT 'pending', -- pending, active, passed, partner, breached, expired
  
  -- Rules Config
  drawdown_limit      DECIMAL(5,4) DEFAULT 0.08,  -- 8% or 10% with shield
  profit_target_1     DECIMAL(5,4) DEFAULT 0.15,  -- 15%
  profit_target_2     DECIMAL(5,4) DEFAULT 0.10,  -- 10%
  
  -- Add-ons
  has_drawdown_shield BOOLEAN DEFAULT FALSE,
  has_express_pass    BOOLEAN DEFAULT FALSE,
  
  -- Breach Info
  breach_type         VARCHAR(100),
  breach_reason       TEXT,
  breached_at         TIMESTAMP,
  
  -- Timestamps
  activated_at        TIMESTAMP,
  stage_2_started_at  TIMESTAMP,
  passed_at           TIMESTAMP,
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW()
);

CREATE TABLE account_snapshots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id      UUID REFERENCES accounts(id) ON DELETE CASCADE,
  balance         DECIMAL(15,2) NOT NULL,
  equity          DECIMAL(15,2) NOT NULL,
  high_water_mark DECIMAL(15,2) NOT NULL,
  drawdown_used   DECIMAL(5,4) NOT NULL,
  snapshot_date   DATE NOT NULL,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- TRADING
-- =============================================

CREATE TABLE markets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id     VARCHAR(255) UNIQUE NOT NULL,
  name            VARCHAR(255) NOT NULL,
  description     TEXT,
  category        VARCHAR(100),
  volume          DECIMAL(20,2),
  is_qualified    BOOLEAN DEFAULT FALSE,
  resolution_date TIMESTAMP,
  status          VARCHAR(50) DEFAULT 'active',
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trades (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id      UUID REFERENCES accounts(id) ON DELETE CASCADE,
  market_id       UUID REFERENCES markets(id),
  
  -- Trade Details
  side            VARCHAR(10) NOT NULL,    -- buy, sell
  quantity        DECIMAL(15,4) NOT NULL,
  entry_price     DECIMAL(15,6) NOT NULL,
  exit_price      DECIMAL(15,6),
  
  -- Liquidity Guard
  estimated_price DECIMAL(15,6),
  actual_slippage DECIMAL(10,6),
  liquidity_consumed DECIMAL(10,6),
  
  -- P&L
  realized_pnl    DECIMAL(15,2),
  fees            DECIMAL(15,2) DEFAULT 0,
  
  -- Status
  status          VARCHAR(50) DEFAULT 'open', -- open, closed
  closed_at       TIMESTAMP,
  
  -- Timestamps
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE positions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id      UUID REFERENCES accounts(id) ON DELETE CASCADE,
  market_id       UUID REFERENCES markets(id),
  
  side            VARCHAR(10) NOT NULL,
  quantity        DECIMAL(15,4) NOT NULL,
  avg_entry_price DECIMAL(15,6) NOT NULL,
  current_price   DECIMAL(15,6),
  unrealized_pnl  DECIMAL(15,2),
  
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(account_id, market_id)
);

-- =============================================
-- PAYMENTS & SUBSCRIPTIONS
-- =============================================

CREATE TABLE subscriptions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  account_id          UUID REFERENCES accounts(id),
  
  stripe_subscription_id  VARCHAR(255) UNIQUE,
  stripe_customer_id      VARCHAR(255),
  
  tier                VARCHAR(50) NOT NULL,
  price_amount        DECIMAL(10,2) NOT NULL,
  currency            VARCHAR(3) DEFAULT 'USD',
  
  status              VARCHAR(50) DEFAULT 'active', -- active, past_due, cancelled, expired
  current_period_start TIMESTAMP,
  current_period_end   TIMESTAMP,
  cancelled_at         TIMESTAMP,
  
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  account_id          UUID REFERENCES accounts(id),
  subscription_id     UUID REFERENCES subscriptions(id),
  
  stripe_payment_intent_id VARCHAR(255),
  stripe_invoice_id        VARCHAR(255),
  
  type                VARCHAR(50) NOT NULL,  -- subscription, addon, refund
  amount              DECIMAL(10,2) NOT NULL,
  currency            VARCHAR(3) DEFAULT 'USD',
  status              VARCHAR(50) NOT NULL,  -- succeeded, failed, pending, refunded
  
  description         TEXT,
  metadata            JSONB,
  
  created_at          TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- KYC & COMPLIANCE
-- =============================================

CREATE TABLE kyc_verifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  
  provider        VARCHAR(50) NOT NULL,     -- onfido, jumio, etc.
  provider_id     VARCHAR(255),
  
  status          VARCHAR(50) DEFAULT 'not_started', 
  -- not_started, in_progress, pending_review, approved, rejected
  
  first_name      VARCHAR(255),
  last_name       VARCHAR(255),
  date_of_birth   DATE,
  nationality     VARCHAR(100),
  address_line_1  VARCHAR(255),
  address_line_2  VARCHAR(255),
  city            VARCHAR(100),
  state           VARCHAR(100),
  postal_code     VARCHAR(50),
  country         VARCHAR(100),
  
  rejection_reason TEXT,
  approved_at     TIMESTAMP,
  rejected_at     TIMESTAMP,
  expires_at      TIMESTAMP,
  
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE kyc_documents (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kyc_verification_id UUID REFERENCES kyc_verifications(id) ON DELETE CASCADE,
  
  type                VARCHAR(50) NOT NULL, -- id_front, id_back, proof_of_address, selfie
  file_url            VARCHAR(500) NOT NULL,
  file_name           VARCHAR(255),
  
  verification_result VARCHAR(50), -- passed, failed, unclear
  verification_notes  TEXT,
  
  created_at          TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- PAYOUTS
-- =============================================

CREATE TABLE payout_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  account_id      UUID REFERENCES accounts(id),
  
  gross_amount    DECIMAL(15,2) NOT NULL,
  platform_fee    DECIMAL(15,2) NOT NULL,
  processing_fee  DECIMAL(15,2) DEFAULT 0,
  net_amount      DECIMAL(15,2) NOT NULL,
  
  payout_method   VARCHAR(50) NOT NULL,    -- bank_transfer, paypal, crypto
  payout_details  JSONB,                   -- bank account, paypal email, wallet address
  
  status          VARCHAR(50) DEFAULT 'pending', 
  -- pending, approved, processing, completed, rejected
  
  reviewed_by     UUID REFERENCES users(id),
  reviewed_at     TIMESTAMP,
  rejection_reason TEXT,
  
  processed_at    TIMESTAMP,
  external_ref    VARCHAR(255),            -- Wise transfer ID, etc.
  
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payout_methods (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  
  type            VARCHAR(50) NOT NULL,    -- bank_account, paypal, crypto_wallet
  is_default      BOOLEAN DEFAULT FALSE,
  is_verified     BOOLEAN DEFAULT FALSE,
  
  details         JSONB NOT NULL,
  -- Bank: { bank_name, account_number, routing_number, swift, iban }
  -- PayPal: { email }
  -- Crypto: { wallet_address, network }
  
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- ADMIN & AUDIT
-- =============================================

CREATE TABLE admin_audit_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id        UUID REFERENCES users(id),
  action          VARCHAR(100) NOT NULL,
  entity_type     VARCHAR(100),
  entity_id       UUID,
  changes         JSONB,
  ip_address      VARCHAR(45),
  user_agent      TEXT,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE announcements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           VARCHAR(255) NOT NULL,
  content         TEXT NOT NULL,
  type            VARCHAR(50) DEFAULT 'info', -- info, warning, maintenance
  is_active       BOOLEAN DEFAULT TRUE,
  starts_at       TIMESTAMP,
  ends_at         TIMESTAMP,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE support_tickets (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  subject         VARCHAR(255) NOT NULL,
  description     TEXT NOT NULL,
  category        VARCHAR(100),
  priority        VARCHAR(50) DEFAULT 'normal',
  status          VARCHAR(50) DEFAULT 'open',
  assigned_to     UUID REFERENCES users(id),
  resolved_at     TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_status ON accounts(status);
CREATE INDEX idx_trades_account_id ON trades(account_id);
CREATE INDEX idx_trades_market_id ON trades(market_id);
CREATE INDEX idx_trades_created_at ON trades(created_at);
CREATE INDEX idx_positions_account_id ON positions(account_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_kyc_user_id ON kyc_verifications(user_id);
CREATE INDEX idx_payout_requests_user_id ON payout_requests(user_id);
CREATE INDEX idx_payout_requests_status ON payout_requests(status);
CREATE INDEX idx_audit_logs_admin_id ON admin_audit_logs(admin_id);
CREATE INDEX idx_audit_logs_created_at ON admin_audit_logs(created_at);
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| TanStack Query | Server state management |
| Zustand | Client state management |
| Socket.io Client | Real-time communication |
| Recharts | Charting library |
| React Hook Form | Form handling |
| Zod | Schema validation |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express/Fastify | HTTP framework |
| Socket.io | WebSocket server |
| Prisma | ORM |
| PostgreSQL | Primary database |
| Redis | Cache & pub/sub |
| BullMQ | Job queues |
| JWT | Authentication |
| bcrypt | Password hashing |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Railway/Render | Backend hosting |
| Supabase/AWS RDS | Database hosting |
| Upstash/Redis Cloud | Redis hosting |
| Cloudflare | CDN & security |
| AWS S3 | File storage |

### External Services
| Service | Purpose |
|---------|---------|
| Stripe | Payments |
| SendGrid/Postmark | Email |
| Onfido/Veriff | KYC |
| Wise | Payouts |
| Sentry | Error tracking |
| Mixpanel | Analytics |

---

## Timeline Summary

| Phase | Description | Duration | Cumulative |
|-------|-------------|----------|------------|
| 0 | Foundation (Done) | - | - |
| 1 | Core Infrastructure | 2 weeks | Week 2 |
| 2 | Payments & Accounts | 2 weeks | Week 4 |
| 3 | Trading Platform | 4 weeks | Week 8 |
| 4 | Rules Engine | 2 weeks | Week 10 |
| 5 | KYC & Compliance | 2 weeks | Week 12 |
| 6 | Payout System | 1 week | Week 13 |
| 7 | Admin Dashboard | 3 weeks | Week 16 |
| 8 | Notifications | 1 week | Week 17 |
| 9 | Analytics | 1 week | Week 18 |
| 10 | Security | 1 week | Week 19 |
| 11 | Testing | 1 week | Week 20 |
| 12 | Launch Prep | 1 week | Week 21 |
| 13 | Launch | 1 week | Week 22 |
| **Total** | | **~5.5 months** | |

---

## Checklist

### Phase 1: Core Infrastructure ⚠️ ~80% COMPLETE
- [x] Set up Turborepo monorepo
- [x] Design database schema (26 tables with enums and relations)
- [x] Configure Prisma with client exports and seed script
- [x] Create apps (marketing, trading, admin)
- [x] Create shared packages (ui, config, database, types)
- [x] Set up CI/CD pipelines (ci.yml + 3 deploy workflows)
- [x] NextAuth.js installed in trading/admin apps
- [x] Auth UI created at marketing/app/auth/page.tsx
- [ ] Install NextAuth.js in marketing app
- [ ] Create auth configuration file (`auth.ts`)
- [ ] Create auth API routes (`/api/auth/[...nextauth]`)
- [ ] Connect auth UI to NextAuth.js backend
- [ ] Implement email/password + Google OAuth providers
- [ ] Set up email verification flow
- [ ] Set up PostgreSQL (production - Supabase/Railway/Neon)
- [ ] Set up Redis (sessions, real-time)

### Phase 2: Payment & Accounts
- [ ] Integrate Stripe
- [ ] Create subscription products
- [ ] Implement webhook handling
- [ ] Build checkout flow
- [ ] Create account system
- [ ] Handle subscription lifecycle

### Phase 3: Trading Platform
- [ ] Set up WebSocket server
- [ ] Build trading dashboard
- [ ] Create market list
- [ ] Implement order book
- [ ] Build order ticket
- [ ] Create position management
- [ ] Implement Liquidity Guard

### Phase 4: Rules Engine
- [ ] Implement trailing drawdown
- [ ] Create profit target tracking
- [ ] Build consistency rule checker
- [ ] Implement breach detection
- [ ] Create stage progression
- [ ] Build notifications

### Phase 5: KYC & Compliance
- [ ] Integrate KYC provider
- [ ] Create document upload flow
- [ ] Build verification status tracking
- [ ] Implement manual review queue
- [ ] Create fraud detection

### Phase 6: Payout System
- [ ] Build payout request flow
- [ ] Implement approval workflow
- [ ] Integrate payout methods
- [ ] Create payout tracking
- [ ] Build reporting

### Phase 7: Admin Dashboard
- [ ] Create user management
- [ ] Build account management
- [ ] Create financial dashboard
- [ ] Implement KYC review queue
- [ ] Build payout approval
- [ ] Create settings management

### Phase 8: Notifications
- [ ] Set up email provider
- [ ] Create email templates
- [ ] Implement transactional emails
- [ ] Build notification center
- [ ] Add real-time alerts

### Phase 9: Analytics
- [ ] Implement user analytics
- [ ] Create platform dashboards
- [ ] Set up event tracking
- [ ] Build reporting tools

### Phase 10: Security
- [ ] Implement rate limiting
- [ ] Set up security headers
- [ ] Configure DDoS protection
- [ ] Audit authentication
- [ ] Penetration testing

### Phase 11: Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Write E2E tests
- [ ] Perform load testing
- [ ] Create demo mode

### Phase 12: Launch Prep
- [ ] Set up production infrastructure
- [ ] Configure monitoring
- [ ] Write documentation
- [ ] Complete legal review

### Phase 13: Launch
- [ ] Execute soft launch
- [ ] Collect feedback
- [ ] Fix issues
- [ ] Public launch
- [ ] Monitor & iterate

---

## Next Steps

**Phase 1 is ~80% complete. Remaining tasks:**

### Immediate Priority: Complete Phase 1C (Authentication)
1. Install NextAuth.js in `apps/marketing`:
   ```bash
   pnpm add next-auth@5.0.0-beta.30 @auth/core @auth/prisma-adapter --filter marketing
   ```

2. Create `packages/database/src/auth.ts` - shared auth configuration:
   - Configure Prisma adapter for NextAuth
   - Set up credentials provider (email/password)
   - Set up Google OAuth provider
   - Configure JWT with proper expiry and subdomain cookies

3. Create auth API routes in each app:
   - `apps/marketing/app/api/auth/[...nextauth]/route.ts`
   - `apps/trading/app/api/auth/[...nextauth]/route.ts`  
   - `apps/admin/app/api/auth/[...nextauth]/route.ts`

4. Connect `apps/marketing/app/auth/page.tsx` forms to NextAuth.js signIn/signUp

5. Implement email verification and password reset flows

### After Authentication is Complete:
- **Phase 2**: Integrate Stripe payments and subscription system
- **Phase 3**: Build out the trading platform UI

### Running the Project

```bash
# Install dependencies (first time)
pnpm install

# Generate Prisma client
pnpm db:generate

# Run all apps in development
pnpm dev

# Run individual apps
pnpm dev:marketing    # http://localhost:3000 (polyprop.co)
pnpm dev:trading      # http://localhost:3001 (trade.polyprop.co)
pnpm dev:admin        # http://localhost:3002 (admin.polyprop.co)

# Database commands
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed sample data
```

### Subdomains Configuration

| Subdomain | App | Port | Purpose |
|-----------|-----|------|---------|
| polyprop.co | marketing | 3000 | Landing page, pricing, legal |
| trade.polyprop.co | trading | 3001 | Trading platform |
| admin.polyprop.co | admin | 3002 | Admin dashboard |

---

*Document maintained by PolyProp Development Team*  
*Version 1.2 - February 2026*  
*Last Updated: Phase 1C Authentication in progress*
