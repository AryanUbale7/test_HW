import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-ivory p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-serif text-deep-green">Admin Dashboard</h1>
        
        <Card className="bg-white border-sage/30">
          <h2 className="text-xl font-medium text-charcoal mb-4">Welcome to Honworth Admin</h2>
          <p className="text-charcoal/80 mb-6">
            The core CMS and analytics dashboard is currently under construction (Milestone 2).
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/">Back to Website</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin/login">View Login Page</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
