import { Navbar, Footer } from '@/components'

export const metadata = {
  title: 'Risk Disclaimer | PolyProp',
  description: 'Important risk disclosure and disclaimer for PolyProp evaluation services.',
}

export default function RiskDisclaimerPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        {/* Header */}
        <div className="border-b border-border bg-surface/30">
          <div className="section-container py-12 text-center">
            <h1 className="text-h1 text-text-primary">Risk Disclaimer</h1>
            <p className="text-body-lg text-text-secondary mt-2">
              Last updated: February 1, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="section-container section-padding">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <div className="space-y-8 text-text-secondary">
              
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <p className="text-body leading-relaxed text-amber-200">
                  <strong className="text-amber-400">⚠ IMPORTANT:</strong> Please read this Risk Disclaimer carefully before using PolyProp's evaluation services. Trading prediction markets involves substantial risk and is not suitable for all individuals. You should carefully consider whether such trading is appropriate for your financial situation.
                </p>
              </div>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">1. Simulated Trading Environment</h2>
                <p className="text-body leading-relaxed mb-4">
                  <strong className="text-text-primary">PolyProp operates as a simulated evaluation platform.</strong> All trading activity conducted on our platform is done with virtual capital in a simulated environment. Key points to understand:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>No real money is wagered or at risk during the evaluation phase</li>
                  <li>Simulated trades are based on real market data but execution may differ from live trading</li>
                  <li>Liquidity Guard simulates realistic fills but cannot guarantee identical real-world execution</li>
                  <li>Platform stability and order execution may differ from actual prediction market exchanges</li>
                  <li>Simulated results do not guarantee similar performance with real capital</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">2. Performance Disclaimers</h2>
                
                <h3 className="text-h4 text-text-primary mb-3 mt-6">Past Performance</h3>
                <p className="text-body leading-relaxed mb-4">
                  <strong className="text-text-primary">Past performance is not indicative of future results.</strong> Success in the PolyProp evaluation does not guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Profitability with real capital</li>
                  <li>Consistent returns over time</li>
                  <li>Protection from losses</li>
                  <li>Ability to replicate performance</li>
                  <li>Success in live market conditions</li>
                </ul>

                <h3 className="text-h4 text-text-primary mb-3 mt-6">Testimonials and Results</h3>
                <p className="text-body leading-relaxed">
                  Any testimonials, reviews, or performance results displayed on our platform represent individual experiences and do not guarantee that you will achieve similar results. Individual results vary based on skill, experience, market conditions, and many other factors beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">3. Prediction Market Risks</h2>
                <p className="text-body leading-relaxed mb-4">
                  Prediction market trading involves significant risks, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li><strong className="text-text-primary">Market Risk:</strong> Event outcomes are inherently uncertain and unpredictable</li>
                  <li><strong className="text-text-primary">Liquidity Risk:</strong> Ability to enter or exit positions may be limited</li>
                  <li><strong className="text-text-primary">Slippage Risk:</strong> Execution prices may differ from expected prices</li>
                  <li><strong className="text-text-primary">Information Risk:</strong> Market-moving news can cause rapid price changes</li>
                  <li><strong className="text-text-primary">Resolution Risk:</strong> Market outcomes may be disputed or delayed</li>
                  <li><strong className="text-text-primary">Platform Risk:</strong> Technical issues may affect trading ability</li>
                  <li><strong className="text-text-primary">Regulatory Risk:</strong> Legal changes may affect market availability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">4. No Investment Advice</h2>
                <p className="text-body leading-relaxed mb-4">
                  PolyProp does not provide investment, financial, tax, or legal advice:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>We are not registered investment advisors or broker-dealers</li>
                  <li>Educational content is for informational purposes only</li>
                  <li>We do not recommend specific trading strategies or positions</li>
                  <li>You should consult qualified professionals before making financial decisions</li>
                  <li>Trading decisions are your sole responsibility</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">5. Payout Considerations</h2>
                <p className="text-body leading-relaxed mb-4">
                  If you achieve Partner status, please understand:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li><strong className="text-text-primary">No Guarantee:</strong> Payouts are not guaranteed and are subject to verification, review, and our discretion</li>
                  <li><strong className="text-text-primary">Compliance Required:</strong> KYC verification and compliance with all terms is mandatory</li>
                  <li><strong className="text-text-primary">Rule Violations:</strong> Any violation may result in forfeiture of payouts</li>
                  <li><strong className="text-text-primary">Timing:</strong> Payout processing times vary and are not guaranteed</li>
                  <li><strong className="text-text-primary">Tax Implications:</strong> You are responsible for all tax obligations related to payouts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">6. Live Capital Mirroring</h2>
                <p className="text-body leading-relaxed mb-4">
                  If selected for live capital mirroring:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Selection is entirely at our discretion and not guaranteed</li>
                  <li>Live trading involves real capital and real risk of loss</li>
                  <li>We may trade positions that mirror your simulated trades</li>
                  <li>You assume no personal financial risk from mirrored positions</li>
                  <li>Mirroring may be discontinued at any time without notice</li>
                  <li>Performance with live capital may differ from simulation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">7. Platform Limitations</h2>
                <p className="text-body leading-relaxed mb-4">
                  You acknowledge that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>The platform may experience downtime, bugs, or technical issues</li>
                  <li>Market data feeds may be delayed or inaccurate</li>
                  <li>Order execution is simulated and may not reflect real market conditions</li>
                  <li>We are not liable for losses due to platform errors or failures</li>
                  <li>Access to the platform is not guaranteed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">8. Subscription Costs</h2>
                <p className="text-body leading-relaxed mb-4">
                  Please be aware of subscription-related risks:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Monthly subscription fees are required to maintain account access</li>
                  <li>You may incur costs without successfully passing the evaluation</li>
                  <li>There is no guarantee of profit or payout</li>
                  <li>Subscription fees are non-refundable</li>
                  <li>You should only subscribe with funds you can afford to lose</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">9. Emotional and Psychological Considerations</h2>
                <p className="text-body leading-relaxed mb-4">
                  Trading, even in simulation, can be psychologically demanding:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Simulated losses can cause stress and emotional reactions</li>
                  <li>Competitive pressure may lead to poor decision-making</li>
                  <li>Obsessive monitoring may negatively impact mental health</li>
                  <li>You should maintain realistic expectations about outcomes</li>
                  <li>Consider whether the activity is appropriate for your well-being</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">10. Regulatory Disclaimer</h2>
                <p className="text-body leading-relaxed mb-4">
                  PolyProp's relationship with you is as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>We provide a simulated evaluation platform, not trading services</li>
                  <li>No employment or partnership relationship exists during evaluation</li>
                  <li>Partner status, if achieved, does not create an employment relationship</li>
                  <li>We are not regulated as a financial services provider</li>
                  <li>Legal and regulatory status may vary by jurisdiction</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">11. Jurisdictional Limitations</h2>
                <p className="text-body leading-relaxed mb-4">
                  Our Services may not be available in all jurisdictions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>You are responsible for ensuring compliance with local laws</li>
                  <li>Prediction markets may be restricted or prohibited in your location</li>
                  <li>We reserve the right to deny service based on location</li>
                  <li>Changes in regulations may affect service availability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">12. Acknowledgment of Risk</h2>
                <p className="text-body leading-relaxed mb-4">
                  By using PolyProp, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>You have read and understood this Risk Disclaimer</li>
                  <li>You understand the risks associated with prediction market trading</li>
                  <li>You accept full responsibility for your trading decisions</li>
                  <li>You understand that payouts are not guaranteed</li>
                  <li>You understand the limitations of simulated trading</li>
                  <li>You are using the Services at your own risk</li>
                </ul>
                
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mt-6">
                  <p className="text-body leading-relaxed text-accent">
                    <strong>If you do not understand or accept these risks, please do not use our Services.</strong>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">13. Contact Information</h2>
                <p className="text-body leading-relaxed">
                  If you have questions about this Risk Disclaimer, please contact us at:
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
