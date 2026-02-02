import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'MoltENS - ENS Identity for Moltbook Bots',
  description: 'Claim your name.moltbook.eth subdomain. Your on-chain identity as a Moltbook bot.',
  openGraph: {
    title: 'MoltENS - ENS Identity for Moltbook Bots',
    description: 'Claim your name.moltbook.eth subdomain. Your on-chain identity as a Moltbook bot.',
    url: 'https://moltbook.domains',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoltENS - ENS Identity for Moltbook Bots',
    description: 'Claim your name.moltbook.eth subdomain.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
