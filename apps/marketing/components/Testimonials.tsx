'use client'

import { motion } from 'framer-motion'
import { Quote, MessageCircle, Users } from 'lucide-react'
import { Section, SectionHeader, Card, ButtonLink } from '@/components/ui'
import { testimonials } from '@/lib/constants'

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        title="Trusted by Traders"
        subtitle="Join hundreds of prediction market traders building their edge with PolyProp"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="p-5 h-full flex flex-col">
              <Quote className="w-8 h-8 text-accent/30 mb-3" />
              
              <p className="text-body-sm text-text-secondary flex-1 mb-4">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-body-sm font-semibold text-accent">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-body-sm font-medium text-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-caption text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Discord CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="p-8 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/30 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-7 h-7 text-[#5865F2]" />
          </div>
          
          <h3 className="text-h3 text-text-primary mb-2">Join the Community</h3>
          
          <p className="text-body text-text-secondary mb-6 max-w-md mx-auto">
            Get live support, market recaps, trading tips, giveaways, and connect with other prediction market traders.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-body-sm text-text-muted">
              <Users className="w-4 h-4" />
              <span>2,400+ members</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="text-body-sm text-text-muted">Active daily</span>
          </div>
          
          <ButtonLink
            href="#"
            className="bg-[#5865F2] hover:bg-[#4752C4] shadow-none hover:shadow-none"
          >
            <MessageCircle className="w-4 h-4" />
            Join Discord
          </ButtonLink>
        </Card>
      </motion.div>
    </Section>
  )
}
