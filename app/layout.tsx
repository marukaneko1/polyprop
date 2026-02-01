import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'

// Dynamically import IntroSplash to avoid SSR issues
const IntroSplash = dynamic(() => import('@/components/IntroSplash').then(mod => ({ default: mod.IntroSplash })), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'PolyProp | The Prop Firm for Prediction Markets',
  description: 'Get funded to trade real-world outcomes. PolyProp runs paid evaluations where traders earn Partner status, receive payouts based on performance, and top performers may be mirrored live.',
  keywords: ['prop firm', 'prediction markets', 'funded trading', 'trading evaluation', 'polymarket', 'event trading'],
  authors: [{ name: 'PolyProp' }],
  openGraph: {
    title: 'PolyProp | The Prop Firm for Prediction Markets',
    description: 'Get funded to trade real-world outcomes. Prove your edge, become a Partner, earn real payouts.',
    url: 'https://polyprop.com',
    siteName: 'PolyProp',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PolyProp | The Prop Firm for Prediction Markets',
    description: 'Get funded to trade real-world outcomes. Prove your edge, become a Partner, earn real payouts.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <IntroSplash />
        {children}
      </body>
    </html>
  )
}
