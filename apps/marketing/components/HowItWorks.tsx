'use client'

import { motion } from 'framer-motion'
import { CreditCard, Shield, Trophy } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui'
import { steps } from '@/lib/constants'

const icons = [CreditCard, Shield, Trophy]

export function HowItWorks() {
  return (
    <Section id="how-it-works" background="gradient">
      <SectionHeader
        title="Start trading"
        subtitle="Break it down into 3 simple steps"
      />

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-[calc(100%-6rem)] bg-gradient-to-b from-border via-accent/30 to-border hidden lg:block" />

        <div className="grid gap-12 lg:gap-0">
          {steps.map((step, index) => {
            const Icon = icons[index]
            if (!Icon) return null
            const isEven = index % 2 === 1

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${isEven ? 'lg:text-right' : ''}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden lg:flex">
                  <div className="w-10 h-10 rounded-full bg-surface border-2 border-accent flex items-center justify-center text-body-sm font-bold text-accent shadow-glow-sm">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:py-8 ${isEven ? 'lg:col-start-1 lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}
                >
                  <div className={`flex items-start gap-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center lg:hidden">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="hidden lg:flex flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 border border-accent/30 items-center justify-center">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent/10 text-caption font-medium text-accent mb-3 lg:hidden">
                        Step {step.step}
                      </span>
                      <h3 className="text-h3 text-text-primary mb-2">{step.title}</h3>
                      <p className="text-body text-text-secondary mb-4">{step.description}</p>
                      <ul className={`space-y-2 ${isEven ? 'lg:ml-auto lg:text-right' : ''}`}>
                        {step.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className={`flex items-start gap-2 text-body-sm text-text-muted ${isEven ? 'lg:flex-row-reverse' : ''}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
