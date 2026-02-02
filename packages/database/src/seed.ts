import { PrismaClient, AccountTier, AccountStatus, TradeSide, TradeStatus, KycStatus, NotificationType } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // ============================================================================
  // SYSTEM SETTINGS
  // ============================================================================
  console.log('📋 Creating system settings...')
  
  const settings = [
    { key: 'drawdown_limit_default', value: 0.08, description: 'Default trailing drawdown limit (8%)' },
    { key: 'drawdown_limit_shield', value: 0.10, description: 'Drawdown limit with shield (10%)' },
    { key: 'profit_target_stage1', value: 0.15, description: 'Stage 1 profit target (15%)' },
    { key: 'profit_target_stage2', value: 0.10, description: 'Stage 2 profit target (10%)' },
    { key: 'consistency_limit', value: 0.40, description: 'Max profit from single event (40%)' },
    { key: 'min_contracts', value: 10, description: 'Minimum unique contracts required' },
    { key: 'payout_split_trader', value: 0.80, description: 'Trader profit split (80%)' },
    { key: 'payout_split_platform', value: 0.20, description: 'Platform profit split (20%)' },
    { key: 'min_payout_amount', value: 100, description: 'Minimum payout amount ($100)' },
    { key: 'payout_cooldown_days', value: 14, description: 'Days between payouts' },
    { key: 'market_volume_threshold', value: 500000, description: 'Minimum volume for qualified markets ($500k)' },
  ]

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, description: setting.description },
      create: setting,
    })
  }

  // ============================================================================
  // DEMO ADMIN USER
  // ============================================================================
  console.log('👤 Creating demo admin user...')
  
  const adminPassword = await hash('admin123!', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@polyprop.co' },
    update: {},
    create: {
      email: 'admin@polyprop.co',
      emailVerified: new Date(),
      passwordHash: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })
  console.log(`  ✓ Admin user: ${adminUser.email}`)

  // ============================================================================
  // DEMO TEST USER
  // ============================================================================
  console.log('👤 Creating demo test user...')
  
  const testPassword = await hash('test123!', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'demo@polyprop.co' },
    update: {},
    create: {
      email: 'demo@polyprop.co',
      emailVerified: new Date(),
      passwordHash: testPassword,
      name: 'Demo Trader',
      phone: '+1 555-123-4567',
      role: 'USER',
      status: 'ACTIVE',
    },
  })
  console.log(`  ✓ Test user: ${testUser.email}`)

  // ============================================================================
  // SAMPLE MARKETS
  // ============================================================================
  console.log('📊 Creating sample markets...')
  
  const markets = [
    {
      externalId: 'us-election-2024',
      name: 'US Presidential Election 2024 Winner',
      description: 'Which party will win the 2024 US Presidential Election?',
      category: 'Politics',
      currentPrice: 0.542,
      previousClose: 0.529,
      change24h: 0.024,
      volume24h: 1200000,
      totalVolume: 45000000,
      liquidity: 2500000,
      isQualified: true,
      qualifiedAt: new Date(),
    },
    {
      externalId: 'fed-rate-march-2026',
      name: 'Fed Rate Cut March 2026',
      description: 'Will the Federal Reserve cut interest rates in March 2026?',
      category: 'Economics',
      currentPrice: 0.234,
      previousClose: 0.238,
      change24h: -0.018,
      volume24h: 890000,
      totalVolume: 12000000,
      liquidity: 1500000,
      isQualified: true,
      qualifiedAt: new Date(),
    },
    {
      externalId: 'btc-100k-eoy',
      name: 'BTC > $100k End of Year',
      description: 'Will Bitcoin exceed $100,000 by December 31, 2026?',
      category: 'Crypto',
      currentPrice: 0.678,
      previousClose: 0.645,
      change24h: 0.052,
      volume24h: 2100000,
      totalVolume: 78000000,
      liquidity: 4200000,
      isQualified: true,
      qualifiedAt: new Date(),
    },
    {
      externalId: 'gdp-growth-q2',
      name: 'US GDP Growth Q2 2026 > 2%',
      description: 'Will US GDP growth exceed 2% in Q2 2026?',
      category: 'Economics',
      currentPrice: 0.445,
      previousClose: 0.442,
      change24h: 0.003,
      volume24h: 540000,
      totalVolume: 8500000,
      liquidity: 890000,
      isQualified: true,
      qualifiedAt: new Date(),
    },
    {
      externalId: 'eth-merge-success',
      name: 'ETH Shanghai Upgrade Success',
      description: 'Will Ethereum complete the Shanghai upgrade without major issues?',
      category: 'Crypto',
      currentPrice: 0.891,
      previousClose: 0.885,
      change24h: 0.007,
      volume24h: 1800000,
      totalVolume: 32000000,
      liquidity: 2800000,
      isQualified: true,
      qualifiedAt: new Date(),
    },
    {
      externalId: 'ai-regulation-2026',
      name: 'US AI Regulation Passed 2026',
      description: 'Will the US pass comprehensive AI regulation in 2026?',
      category: 'Politics',
      currentPrice: 0.312,
      previousClose: 0.298,
      change24h: 0.047,
      volume24h: 620000,
      totalVolume: 9200000,
      liquidity: 1100000,
      isQualified: true,
      qualifiedAt: new Date(),
    },
    {
      externalId: 'unqualified-small-market',
      name: 'Will it rain tomorrow in NYC?',
      description: 'A low-liquidity market for testing',
      category: 'Weather',
      currentPrice: 0.55,
      volume24h: 15000,
      totalVolume: 45000,
      liquidity: 12000,
      isQualified: false, // Below threshold
    },
  ]

  for (const market of markets) {
    await prisma.market.upsert({
      where: { externalId: market.externalId },
      update: market,
      create: market,
    })
  }
  console.log(`  ✓ Created ${markets.length} markets`)

  // ============================================================================
  // SAMPLE ACCOUNT FOR TEST USER
  // ============================================================================
  console.log('💼 Creating sample account...')
  
  const demoAccount = await prisma.account.create({
    data: {
      userId: testUser.id,
      tier: AccountTier.TIER_50K,
      startingBalance: 50000,
      balance: 53240,
      highWaterMark: 54100,
      unrealizedPnl: 180,
      stage: 1,
      status: AccountStatus.ACTIVE,
      drawdownLimit: 0.08,
      profitTarget1: 0.15,
      profitTarget2: 0.10,
      consistencyLimit: 0.40,
      minContracts: 10,
      hasDrawdownShield: false,
      hasExpressPass: false,
      totalProfit: 4520,
      totalLoss: 1280,
      totalTrades: 28,
      uniqueContracts: 6,
      winningTrades: 18,
      losingTrades: 10,
      activatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
  })
  console.log(`  ✓ Created demo account #${demoAccount.accountNumber}`)

  // Create subscription for the account
  await prisma.subscription.create({
    data: {
      userId: testUser.id,
      accountId: demoAccount.id,
      tier: AccountTier.TIER_50K,
      priceAmount: 250,
      currency: 'USD',
      status: 'ACTIVE',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })
  console.log(`  ✓ Created subscription for account`)

  // ============================================================================
  // SAMPLE TRADES
  // ============================================================================
  console.log('📈 Creating sample trades...')
  
  const btcMarket = await prisma.market.findUnique({ where: { externalId: 'btc-100k-eoy' } })
  const electionMarket = await prisma.market.findUnique({ where: { externalId: 'us-election-2024' } })
  const fedMarket = await prisma.market.findUnique({ where: { externalId: 'fed-rate-march-2026' } })
  
  if (btcMarket && electionMarket && fedMarket) {
    const trades = [
      // Closed winning trade
      {
        accountId: demoAccount.id,
        marketId: btcMarket.id,
        side: TradeSide.BUY,
        quantity: 200,
        requestedPrice: 0.645,
        entryPrice: 0.6458,
        exitPrice: 0.678,
        estimatedFill: 0.6456,
        actualSlippage: 0.0003,
        liquidityConsumed: 0.008,
        realizedPnl: 644,
        fees: 0,
        status: TradeStatus.CLOSED,
        closedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      // Open position - Election
      {
        accountId: demoAccount.id,
        marketId: electionMarket.id,
        side: TradeSide.BUY,
        quantity: 500,
        requestedPrice: 0.540,
        entryPrice: 0.5424,
        estimatedFill: 0.5420,
        actualSlippage: 0.0007,
        liquidityConsumed: 0.022,
        status: TradeStatus.OPEN,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      // Closed losing trade
      {
        accountId: demoAccount.id,
        marketId: fedMarket.id,
        side: TradeSide.BUY,
        quantity: 300,
        requestedPrice: 0.256,
        entryPrice: 0.2568,
        exitPrice: 0.234,
        estimatedFill: 0.2564,
        actualSlippage: 0.0016,
        liquidityConsumed: 0.015,
        realizedPnl: -684,
        fees: 0,
        status: TradeStatus.CLOSED,
        closedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
    ]

    for (const trade of trades) {
      await prisma.trade.create({ data: trade })
    }
    console.log(`  ✓ Created ${trades.length} sample trades`)

    // Create open position for the election market trade
    await prisma.position.create({
      data: {
        accountId: demoAccount.id,
        marketId: electionMarket.id,
        side: TradeSide.BUY,
        quantity: 500,
        avgEntryPrice: 0.5424,
        currentPrice: 0.542,
        unrealizedPnl: -2,
        totalBought: 500,
        totalSold: 0,
      },
    })
    console.log(`  ✓ Created open position`)
  }

  // ============================================================================
  // SAMPLE ACCOUNT SNAPSHOTS
  // ============================================================================
  console.log('📸 Creating account snapshots...')
  
  const snapshots = []
  for (let i = 13; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)
    
    // Simulate gradual growth with some volatility
    const baseGrowth = (13 - i) * 250
    const volatility = Math.random() * 500 - 250
    const balance = 50000 + baseGrowth + volatility
    
    snapshots.push({
      accountId: demoAccount.id,
      balance: balance,
      equity: balance + Math.random() * 200,
      highWaterMark: Math.max(50000, balance + 500),
      drawdownUsed: Math.random() * 0.04,
      drawdownFloor: 46000 + (i * 100),
      profitTarget: 0.15,
      currentProgress: (balance - 50000) / 50000,
      maxEventProfit: 0.28 + Math.random() * 0.1,
      snapshotDate: date,
    })
  }

  for (const snapshot of snapshots) {
    await prisma.accountSnapshot.upsert({
      where: {
        accountId_snapshotDate: {
          accountId: snapshot.accountId,
          snapshotDate: snapshot.snapshotDate,
        },
      },
      update: snapshot,
      create: snapshot,
    })
  }
  console.log(`  ✓ Created ${snapshots.length} account snapshots`)

  // ============================================================================
  // SAMPLE NOTIFICATIONS
  // ============================================================================
  console.log('🔔 Creating sample notifications...')
  
  const notifications = [
    {
      userId: testUser.id,
      type: NotificationType.SUCCESS,
      title: 'Welcome to PolyProp!',
      message: 'Your account has been activated. Start trading and prove your edge.',
      read: true,
      readAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      userId: testUser.id,
      type: NotificationType.INFO,
      title: 'Trade Executed',
      message: 'Bought 500 shares of US Election Winner at $0.5424',
      link: '/trading/positions',
      read: true,
      readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      userId: testUser.id,
      type: NotificationType.WARNING,
      title: 'Drawdown Alert',
      message: 'You are at 5.2% drawdown. Your limit is 8%. Trade carefully.',
      read: false,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
    {
      userId: testUser.id,
      type: NotificationType.SUCCESS,
      title: 'Milestone Reached',
      message: 'Congratulations! You have reached 6% profit. Keep going to hit 15%!',
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ]

  for (const notification of notifications) {
    await prisma.notification.create({ data: notification })
  }
  console.log(`  ✓ Created ${notifications.length} notifications`)

  // ============================================================================
  // SAMPLE ANNOUNCEMENT
  // ============================================================================
  console.log('📢 Creating sample announcement...')
  
  await prisma.announcement.create({
    data: {
      title: 'Welcome to PolyProp Beta',
      content: 'Thank you for joining our beta program! We are constantly improving the platform based on your feedback. Please report any issues through the support chat.',
      type: 'info',
      isActive: true,
      isPinned: true,
      createdBy: adminUser.id,
    },
  })
  console.log(`  ✓ Created welcome announcement`)

  // ============================================================================
  // DONE
  // ============================================================================
  console.log('')
  console.log('✅ Database seeded successfully!')
  console.log('')
  console.log('Demo accounts:')
  console.log('  Admin: admin@polyprop.co / admin123!')
  console.log('  Trader: demo@polyprop.co / test123!')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
