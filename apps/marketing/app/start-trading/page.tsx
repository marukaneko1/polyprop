import { Navbar, HowItWorks, Footer } from '@/components'

export const metadata = {
  title: 'Start Trading | PolyProp',
  description: 'Three simple steps to becoming a funded prediction market trader with PolyProp.',
}

export default function StartTradingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
