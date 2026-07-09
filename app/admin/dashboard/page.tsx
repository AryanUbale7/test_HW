import React from 'react'
import { FileText, FolderOpen, HelpCircle, Mail, Send, BookA } from 'lucide-react'
import { getPostsCount } from '@/lib/queries/posts'
import { getResourcesCount } from '@/lib/queries/resources'
import { getFaqsCount } from '@/lib/queries/faqs'
import { getGlossaryTermsCount } from '@/lib/queries/glossary'
import { getUnreadLeadsCount } from '@/lib/queries/contact'
import { getSubscribersCount } from '@/lib/queries/newsletter'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const [
    draftPosts,
    publishedPosts,
    resources,
    faqs,
    glossaryTerms,
    unreadLeads,
    subscribers
  ] = await Promise.all([
    getPostsCount('draft'),
    getPostsCount('published'),
    getResourcesCount(),
    getFaqsCount(),
    getGlossaryTermsCount(),
    getUnreadLeadsCount(),
    getSubscribersCount(),
  ])

  const stats = [
    { name: 'Published Posts', value: publishedPosts, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Draft Posts', value: draftPosts, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Resources', value: resources, icon: FolderOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'FAQs', value: faqs, icon: HelpCircle, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Glossary Terms', value: glossaryTerms, icon: BookA, color: 'text-teal-600', bg: 'bg-teal-100' },
    { name: 'Unread Leads', value: unreadLeads, icon: Mail, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Subscribers', value: subscribers, icon: Send, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500 mt-1">Metrics and content status across the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-md ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
