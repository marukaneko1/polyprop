'use client'

import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Clock } from 'lucide-react'
import { Section, SectionHeader, Card, ButtonLink } from '@/components/ui'
import { universityArticles } from '@/lib/constants'

export function University() {
  return (
    <Section id="university" background="gradient">
      <SectionHeader
        title="PolyProp University"
        subtitle="Learn the strategies and mindset needed to pass the challenge and trade profitably"
      />

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {universityArticles.map((article, index) => (
          <motion.a
            key={article.title}
            href={article.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <Card hover className="p-6 h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              
              <h3 className="text-h4 text-text-primary mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              
              <p className="text-body-sm text-text-secondary mb-4 flex-1">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="flex items-center gap-1.5 text-caption text-text-muted">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1 text-body-sm text-accent group-hover:gap-2 transition-all">
                  Read
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Card>
          </motion.a>
        ))}
      </div>

      <div className="text-center">
        <ButtonLink href="#" variant="secondary">
          Explore University
          <ArrowRight className="w-4 h-4" />
        </ButtonLink>
      </div>
    </Section>
  )
}
