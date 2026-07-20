import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Coming Soon | Honworth',
  description: 'Honworth is launching soon. A premium wealth experience designed with honour and worth.',
  robots: { index: false, follow: false },
}

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

