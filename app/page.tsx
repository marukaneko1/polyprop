import {
  AnnouncementBar,
  Navbar,
  Hero,
  TrustBadges,
  HowItWorks,
  Features,
  Pricing,
  Rules,
  TerminalSection,
  University,
  Testimonials,
  FAQ,
  FinalCTA,
  Footer,
  HelpButton,
} from '@/components'

export default function Home() {
  return (
    <>
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Social Proof / Trust Row */}
        <TrustBadges />

        {/* How It Works Timeline */}
        <HowItWorks />

        {/* Core Differentiators Feature Grid */}
        <Features />

        {/* Pricing Section */}
        <Pricing />

        {/* Rules That Reward Skill */}
        <Rules />

        {/* Terminal Preview */}
        <TerminalSection />

        {/* University Knowledge Hub */}
        <University />

        {/* Testimonials + Community */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Help Button */}
      <HelpButton />
    </>
  )
}
