import { Navbar, University, Footer } from '@/components'

export const metadata = {
  title: 'Tips & Tricks | PolyProp',
  description: 'Practical strategies to help you pass the challenge and trade profitably.',
}

export default function TipsAndTricksPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <University />
      </main>
      <Footer />
    </>
  )
}
