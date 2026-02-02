'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui'
import { faqs } from '@/lib/constants'
import { clsx } from 'clsx'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface/30">
        <div className="section-container py-6">
          <ButtonLink href="/" variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </ButtonLink>
          <h1 className="text-h1 text-text-primary">Frequently Asked Questions</h1>
          <p className="text-body-lg text-text-secondary mt-2">
            Everything you need to know about PolyProp evaluations
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="section-container section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden bg-surface/50 backdrop-blur-sm">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className={clsx('transition-colors', isOpen && 'bg-surface-elevated/30')}>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="text-body font-medium text-text-primary pr-4">{question}</span>
        <ChevronDown
          className={clsx(
            'w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-body-sm text-text-secondary leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
