import { Navbar, Footer } from '@/components'

export const metadata = {
  title: 'Terms of Service | PolyProp',
  description: 'Terms and conditions for using PolyProp evaluation services.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        {/* Header */}
        <div className="border-b border-border bg-surface/30">
          <div className="section-container py-12 text-center">
            <h1 className="text-h1 text-text-primary">Terms of Service</h1>
            <p className="text-body-lg text-text-secondary mt-2">
              Last updated: February 1, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="section-container section-padding">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <div className="space-y-8 text-text-secondary">
              
              <section>
                <h2 className="text-h3 text-text-primary mb-4">1. Agreement to Terms</h2>
                <p className="text-body leading-relaxed mb-4">
                  By accessing and using PolyProp's evaluation services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Services.
                </p>
                <p className="text-body leading-relaxed">
                  PolyProp operates as a simulated trading evaluation platform. All trading activity is conducted with virtual capital in a simulated environment based on real prediction market data.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">2. Eligibility</h2>
                <p className="text-body leading-relaxed mb-4">
                  You must be at least 18 years of age to use our Services. By using PolyProp, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>You are of legal age to form a binding contract</li>
                  <li>You are not prohibited from using our Services under applicable laws</li>
                  <li>All information you provide is accurate and truthful</li>
                  <li>You will maintain the accuracy of such information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">3. Account Registration</h2>
                <p className="text-body leading-relaxed mb-4">
                  To access the Services, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Immediately notify us of any unauthorized use of your account</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  <strong className="text-text-primary">One Account Policy:</strong> You are permitted only one account. Multiple accounts, whether created by you or on your behalf, are strictly prohibited and will result in immediate termination and forfeiture of any pending payouts.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">4. Evaluation Rules</h2>
                <p className="text-body leading-relaxed mb-4">
                  Your evaluation is subject to the following rules:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li><strong className="text-text-primary">Profit Targets:</strong> Stage 1 requires 15% profit, Stage 2 requires 10% profit</li>
                  <li><strong className="text-text-primary">Trailing Drawdown:</strong> 8% trailing drawdown applies at all times (10% with Drawdown Shield)</li>
                  <li><strong className="text-text-primary">Consistency Rule:</strong> No single event may contribute more than 40% of required profits</li>
                  <li><strong className="text-text-primary">Minimum Contracts:</strong> At least 10 unique contracts must be traded</li>
                  <li><strong className="text-text-primary">Qualified Markets:</strong> Only markets exceeding $500k volume threshold are tradable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">5. Subscription and Fees</h2>
                <p className="text-body leading-relaxed mb-4">
                  PolyProp operates on a monthly subscription model. By subscribing, you agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Subscription fees are charged monthly on a recurring basis</li>
                  <li>Your account remains active as long as your subscription is current</li>
                  <li>You may cancel your subscription at any time</li>
                  <li>Refunds are not provided for partial months</li>
                  <li>Failed payments may result in account suspension</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">6. Partner Status and Payouts</h2>
                <p className="text-body leading-relaxed mb-4">
                  Upon successful completion of both evaluation stages, you may be eligible for Partner status:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Partner status is subject to verification and review</li>
                  <li>Identity verification (KYC) is required before any payout</li>
                  <li>Payouts are processed after verification and compliance review</li>
                  <li>We reserve the right to deny Partner status for any violation of these Terms</li>
                  <li>Payout amounts and timing are subject to our discretion</li>
                  <li>Exceptional performance may be selected for live capital mirroring</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">7. Prohibited Activities</h2>
                <p className="text-body leading-relaxed mb-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Using automated trading systems or bots</li>
                  <li>Coordinating with other users to manipulate results</li>
                  <li>Creating multiple accounts or sharing accounts</li>
                  <li>Exploiting platform bugs or vulnerabilities</li>
                  <li>Providing false or misleading information</li>
                  <li>Engaging in any form of market manipulation</li>
                  <li>Attempting to reverse engineer or copy our platform</li>
                  <li>Using the Services for any illegal purpose</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">8. Simulated Trading Environment</h2>
                <p className="text-body leading-relaxed mb-4">
                  You acknowledge and understand that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>All trading on PolyProp is simulated with virtual capital</li>
                  <li>No real money is wagered on prediction markets during evaluation</li>
                  <li>Execution prices are based on real market depth but may differ from actual fills</li>
                  <li>Past performance in evaluation does not guarantee future results</li>
                  <li>Simulated results may not reflect real-world trading conditions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">9. Intellectual Property</h2>
                <p className="text-body leading-relaxed">
                  All content, features, and functionality of the Services, including but not limited to text, graphics, logos, software, and data, are owned by PolyProp and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">10. Termination</h2>
                <p className="text-body leading-relaxed mb-4">
                  We reserve the right to terminate or suspend your account at any time, with or without cause or notice, for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent, abusive, or illegal activity</li>
                  <li>Extended periods of inactivity</li>
                  <li>Request by law enforcement or government agency</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  Upon termination, your right to use the Services will immediately cease, and any pending payouts may be forfeited.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">11. Disclaimers and Limitation of Liability</h2>
                <p className="text-body leading-relaxed mb-4">
                  THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>We disclaim all warranties, express or implied</li>
                  <li>We do not guarantee uninterrupted or error-free service</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid by you in the past 12 months</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">12. Dispute Resolution</h2>
                <p className="text-body leading-relaxed">
                  Any disputes arising out of or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive any right to participate in a class action lawsuit or class-wide arbitration.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">13. Changes to Terms</h2>
                <p className="text-body leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by email or through the platform. Your continued use of the Services after such modifications constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">14. Contact Information</h2>
                <p className="text-body leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-body leading-relaxed mt-4">
                  Email: <a href="mailto:deegan@polyprop.co" className="text-accent hover:text-accent-hover">deegan@polyprop.co</a>
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
