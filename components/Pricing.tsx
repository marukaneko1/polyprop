'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Shield, Zap, Info } from 'lucide-react'
import { Section, SectionHeader, Card, Button, Badge, Tooltip } from '@/components/ui'
import { pricingTiers, addons } from '@/lib/constants'
import { clsx } from 'clsx'

export function Pricing() {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const getAddonPrice = (basePrice: number) => {
    // Both addons have variable pricing, so just return base price
    // Actual addon prices would be calculated separately
    return basePrice
  }

  return (
    <Section id="pricing" background="gradient">
      <SectionHeader
        title="Choose Your Challenge"
        subtitle="Select an evaluation tier that matches your trading capital needs"
      />

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 mb-12">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.size}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card
              className={clsx(
                'relative p-5 h-full flex flex-col',
                tier.popular && 'border-accent/50 shadow-glow'
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="accent">Most Popular</Badge>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-5 pt-2">
                <h3 className="text-h2 text-text-primary mb-1">{tier.size}</h3>
                <p className="text-caption text-text-muted">Evaluation Account</p>
              </div>

              {/* Price */}
              <div className="text-center mb-5 pb-5 border-b border-border">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-h2 text-text-primary font-bold">
                    ${getAddonPrice(tier.price)}
                  </span>
                  <span className="text-body-sm text-text-muted">/mo</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                <PricingFeature>
                  Stage 1: {tier.profitTarget1} target
                </PricingFeature>
                <PricingFeature>
                  Stage 2: {tier.profitTarget2} target
                </PricingFeature>
                <PricingFeature>
                  {tier.drawdown} trailing drawdown
                </PricingFeature>
                <PricingFeature>
                  Min {tier.minContracts} contracts
                </PricingFeature>
                <PricingFeature>
                  40% consistency rule
                </PricingFeature>
              </ul>

              {/* CTA */}
              <Button
                variant={tier.popular ? 'primary' : 'secondary'}
                className="w-full"
              >
                Start {tier.size} Challenge
              </Button>

              {/* Best For */}
              <p className="mt-3 text-caption text-text-muted text-center">
                {tier.bestFor}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add-ons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto mb-16"
      >
        <h3 className="text-h4 text-text-primary text-center mb-4">Optional Add-ons</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {addons.map((addon) => (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={clsx(
                'flex items-start gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer',
                selectedAddons.includes(addon.id)
                  ? 'bg-accent/10 border-accent/30'
                  : 'bg-surface/50 border-border hover:border-accent/20'
              )}
            >
              <div
                className={clsx(
                  'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                  selectedAddons.includes(addon.id)
                    ? 'bg-accent border-accent'
                    : 'border-border'
                )}
              >
                {selectedAddons.includes(addon.id) && (
                  <Check className="w-3 h-3 text-background" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {addon.id === 'drawdown-shield' ? (
                    <Shield className="w-4 h-4 text-accent" />
                  ) : (
                    <Zap className="w-4 h-4 text-accent" />
                  )}
                  <span className="text-body-sm font-medium text-text-primary">
                    {addon.name}
                  </span>
                  <span className="text-body-sm text-accent">
                    {addon.price !== null ? `+$${addon.price}` : 'Price varies'}
                  </span>
                </div>
                <p className="text-caption text-text-muted mt-1">{addon.description}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-h4 text-text-primary text-center mb-6">Compare All Tiers</h3>
        
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-elevated/50">
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-text-primary">
                  Tier
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-text-primary">
                  Monthly
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-text-primary">
                  <div className="flex items-center gap-1.5">
                    Targets
                    <Tooltip content="Stage 1 / Stage 2 profit targets" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-text-primary">
                  <div className="flex items-center gap-1.5">
                    Drawdown
                    <Tooltip content="Trailing drawdown limit" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-text-primary">
                  Min Contracts
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-text-primary">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pricingTiers.map((tier) => (
                <tr
                  key={tier.size}
                  className={clsx(
                    'transition-colors hover:bg-surface/50',
                    tier.popular && 'bg-accent/5'
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-body font-semibold text-text-primary">
                        {tier.size}
                      </span>
                      {tier.popular && <Badge variant="accent">Popular</Badge>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-body text-text-primary font-mono">
                    ${tier.price}
                  </td>
                  <td className="px-6 py-4 text-body-sm text-text-secondary">
                    {tier.profitTarget1} / {tier.profitTarget2}
                  </td>
                  <td className="px-6 py-4 text-body-sm text-text-secondary">
                    {tier.drawdown}
                  </td>
                  <td className="px-6 py-4 text-body-sm text-text-secondary">
                    {tier.minContracts}
                  </td>
                  <td className="px-6 py-4 text-body-sm text-text-muted">
                    {tier.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.size}
              className={clsx(
                'p-4 rounded-xl border',
                tier.popular
                  ? 'border-accent/30 bg-accent/5'
                  : 'border-border bg-surface/50'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-h4 text-text-primary">{tier.size}</span>
                  {tier.popular && <Badge variant="accent">Popular</Badge>}
                </div>
                <span className="text-body font-mono text-text-primary">
                  ${tier.price}/mo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-body-sm">
                <div>
                  <span className="text-text-muted">Targets: </span>
                  <span className="text-text-secondary">
                    {tier.profitTarget1} / {tier.profitTarget2}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Drawdown: </span>
                  <span className="text-text-secondary">{tier.drawdown}</span>
                </div>
                <div>
                  <span className="text-text-muted">Min: </span>
                  <span className="text-text-secondary">{tier.minContracts} contracts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
      <span className="text-body-sm text-text-secondary">{children}</span>
    </li>
  )
}
