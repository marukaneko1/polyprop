import { Navbar, Footer } from '@/components'

export const metadata = {
  title: 'Privacy Policy | PolyProp',
  description: 'How PolyProp collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        {/* Header */}
        <div className="border-b border-border bg-surface/30">
          <div className="section-container py-12 text-center">
            <h1 className="text-h1 text-text-primary">Privacy Policy</h1>
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
                <h2 className="text-h3 text-text-primary mb-4">1. Introduction</h2>
                <p className="text-body leading-relaxed mb-4">
                  PolyProp ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our evaluation platform and services.
                </p>
                <p className="text-body leading-relaxed">
                  By using PolyProp, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">2. Information We Collect</h2>
                
                <h3 className="text-h4 text-text-primary mb-3 mt-6">Personal Information</h3>
                <p className="text-body leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li><strong className="text-text-primary">Account Information:</strong> Name, email address, phone number, and password</li>
                  <li><strong className="text-text-primary">Identity Verification:</strong> Government-issued ID, proof of address, date of birth, and other KYC documents</li>
                  <li><strong className="text-text-primary">Payment Information:</strong> Credit card details, billing address, and transaction history</li>
                  <li><strong className="text-text-primary">Profile Information:</strong> Trading experience, preferences, and settings</li>
                </ul>

                <h3 className="text-h4 text-text-primary mb-3 mt-6">Trading Data</h3>
                <p className="text-body leading-relaxed mb-4">
                  We automatically collect information about your trading activity, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Trade execution data (positions, prices, timestamps)</li>
                  <li>Account performance metrics and statistics</li>
                  <li>Risk management data (drawdown, exposure, consistency)</li>
                  <li>Platform usage patterns and behavior</li>
                </ul>

                <h3 className="text-h4 text-text-primary mb-3 mt-6">Technical Information</h3>
                <p className="text-body leading-relaxed mb-4">
                  We automatically collect certain technical information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Log data (access times, pages viewed, errors)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">3. How We Use Your Information</h2>
                <p className="text-body leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li><strong className="text-text-primary">Provide Services:</strong> Create and manage your account, process evaluations, and calculate performance</li>
                  <li><strong className="text-text-primary">Process Payments:</strong> Handle subscriptions, billing, and payout processing</li>
                  <li><strong className="text-text-primary">Verify Identity:</strong> Conduct KYC checks and prevent fraud and multi-accounting</li>
                  <li><strong className="text-text-primary">Improve Platform:</strong> Analyze usage patterns, optimize performance, and develop new features</li>
                  <li><strong className="text-text-primary">Communications:</strong> Send service updates, marketing communications, and support messages</li>
                  <li><strong className="text-text-primary">Compliance:</strong> Meet legal obligations and enforce our Terms of Service</li>
                  <li><strong className="text-text-primary">Security:</strong> Detect and prevent unauthorized access, fraud, and abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-body leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>

                <h3 className="text-h4 text-text-primary mb-3 mt-6">Service Providers</h3>
                <p className="text-body leading-relaxed mb-4">
                  We share information with third-party vendors who perform services on our behalf:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Payment processors (Stripe, PayPal)</li>
                  <li>Identity verification services</li>
                  <li>Cloud hosting providers (AWS, Vercel)</li>
                  <li>Analytics services (Google Analytics)</li>
                  <li>Customer support platforms</li>
                </ul>

                <h3 className="text-h4 text-text-primary mb-3 mt-6">Legal Requirements</h3>
                <p className="text-body leading-relaxed mb-4">
                  We may disclose information if required by law or in response to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Legal process or government requests</li>
                  <li>Enforcement of our Terms of Service</li>
                  <li>Protection of rights, property, or safety</li>
                  <li>Investigation of fraud or security issues</li>
                </ul>

                <h3 className="text-h4 text-text-primary mb-3 mt-6">Business Transfers</h3>
                <p className="text-body leading-relaxed">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">5. Data Security</h2>
                <p className="text-body leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>256-bit SSL/TLS encryption for data transmission</li>
                  <li>Encrypted storage of sensitive data at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Employee training on data protection practices</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">6. Data Retention</h2>
                <p className="text-body leading-relaxed">
                  We retain your information for as long as necessary to provide our Services and comply with legal obligations. Specifically:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body mt-4">
                  <li>Account information is retained while your account is active</li>
                  <li>Trading data is retained for 7 years for compliance purposes</li>
                  <li>Identity verification documents are retained for 5 years</li>
                  <li>Marketing communications can be opted out at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">7. Your Rights and Choices</h2>
                <p className="text-body leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li><strong className="text-text-primary">Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong className="text-text-primary">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong className="text-text-primary">Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong className="text-text-primary">Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong className="text-text-primary">Objection:</strong> Object to processing of your information for certain purposes</li>
                  <li><strong className="text-text-primary">Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  To exercise these rights, contact us at <a href="mailto:deegan@polyprop.co" className="text-accent hover:text-accent-hover">deegan@polyprop.co</a>
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">8. Cookies and Tracking</h2>
                <p className="text-body leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Remember your preferences and settings</li>
                  <li>Maintain your session and keep you logged in</li>
                  <li>Analyze platform usage and performance</li>
                  <li>Deliver personalized content and advertisements</li>
                </ul>
                <p className="text-body leading-relaxed mt-4">
                  You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">9. International Data Transfers</h2>
                <p className="text-body leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our Services, you consent to such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">10. Children's Privacy</h2>
                <p className="text-body leading-relaxed">
                  Our Services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">11. Changes to This Policy</h2>
                <p className="text-body leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through our platform. Your continued use of our Services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-h3 text-text-primary mb-4">12. Contact Us</h2>
                <p className="text-body leading-relaxed">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
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
