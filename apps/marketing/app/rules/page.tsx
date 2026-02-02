import { Navbar, Rules, Footer } from '@/components'

export const metadata = {
  title: 'Rules | PolyProp',
  description: 'Our rules exist to ensure your edge is real, repeatable, and scalable.',
}

export default function RulesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Rules />
      </main>
      <Footer />
    </>
  )
}
