'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, X, MessageCircle, BookOpen, Mail } from 'lucide-react'
import { clsx } from 'clsx'

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-16 right-0 w-64 bg-surface border border-border rounded-2xl shadow-card overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h3 className="text-body font-semibold text-text-primary">Need help?</h3>
              <p className="text-caption text-text-muted mt-1">We're here to assist</p>
            </div>
            <div className="p-2">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-elevated transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#5865F2]/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[#5865F2]" />
                </div>
                <div>
                  <p className="text-body-sm font-medium text-text-primary">Discord</p>
                  <p className="text-caption text-text-muted">Join our community</p>
                </div>
              </a>
              <a
                href="#faq"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-elevated transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-body-sm font-medium text-text-primary">FAQ</p>
                  <p className="text-caption text-text-muted">Common questions</p>
                </div>
              </a>
              <a
                href="mailto:deegan@polyprop.co"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-elevated transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-body-sm font-medium text-text-primary">Contact</p>
                  <p className="text-caption text-text-muted">deegan@polyprop.co</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-card',
          isOpen
            ? 'bg-surface border border-border text-text-primary'
            : 'bg-accent text-background hover:bg-accent-hover shadow-glow-sm'
        )}
        aria-label={isOpen ? 'Close help menu' : 'Open help menu'}
      >
        {isOpen ? <X className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
      </button>
    </div>
  )
}
