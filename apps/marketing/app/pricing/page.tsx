import { Navbar, Pricing, Footer } from '@/components'

export const metadata = {
  title: 'Pricing | PolyProp',
  description: 'Choose your evaluation tier and start your funded trader journey with PolyProp.',
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
