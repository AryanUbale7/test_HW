import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Coming Soon | Honworth Wealth Advisory',
  description: 'Honworth Wealth Advisory is launching soon. A premium wealth advisory experience designed with honour and worth.',
  robots: { index: false, follow: false },
}

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

