import React from 'react'
import Link from 'next/link'
import { 
  FileText, FolderOpen, HelpCircle, Mail, Send, BookA, 
  PlusCircle, FolderPlus, Inbox, ArrowRight, Loader2, Clock, User
} from 'lucide-react'
import { getPostsCount, getRecentPublicationsCount } from '@/lib/queries/posts'
import { getResourcesCount } from '@/lib/queries/resources'
import { getFaqsCount } from '@/lib/queries/faqs'
import { getGlossaryTermsCount } from '@/lib/queries/glossary'
import { getUnreadLeadsCount, getRecentLeadsCount } from '@/lib/queries/contact'
import { getSubscribersCount, getRecentSubscribersCount } from '@/lib/queries/newsletter'
import { getRecentAuditLogs } from '@/lib/supabase/audit'

export const dynamic = 'force-dynamic'

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'yesterday'
  return `${diffDays} days ago`
}

function getActivityMessage(log: any) {
  const title = log.details?.title || log.details?.term || log.details?.question || ''
  const displayTitle = title ? `"${title}"` : ''

  switch (log.action) {
    case 'CREATE_POST':
      return `Created new post ${displayTitle}`
    case 'UPDATE_POST':
      return `Updated post ${displayTitle}`
    case 'DELETE_POST':
      return `Deleted post ${displayTitle || `(ID: ${log.target_id})`}`
    case 'CREATE_RESOURCE':
      return `Added new resource ${displayTitle}`
    case 'UPDATE_RESOURCE':
      return `Updated resource ${displayTitle}`
    case 'DELETE_RESOURCE':
      return `Deleted resource`
    case 'CREATE_FAQ':
      return `Added new FAQ ${displayTitle}`
    case 'UPDATE_FAQ':
      return `Updated FAQ`
    case 'DELETE_FAQ':
      return `Deleted FAQ`
    case 'CREATE_GLOSSARY':
      return `Added glossary term ${displayTitle}`
    case 'UPDATE_GLOSSARY':
      return `Updated glossary term ${displayTitle}`
    case 'DELETE_GLOSSARY':
      return `Deleted glossary term`
    default:
      return `${log.action} action completed`
  }
}

export default async function AdminDashboardPage() {
  const [
    draftPosts,
    publishedPosts,
    recentPublications,
    resources,
    faqs,
    unreadLeads,
    recentLeadsCount,
    subscribers,
    recentSubscribersCount,
    recentActivityLogs
  ] = await Promise.all([
    getPostsCount('draft'),
    getPostsCount('published'),
    getRecentPublicationsCount(),
    getResourcesCount(),
    getFaqsCount(),
    getUnreadLeadsCount(),
    getRecentLeadsCount(),
    getSubscribersCount(),
    getRecentSubscribersCount(),
    getRecentAuditLogs(8)
  ])

  const stats = [
    { 
      name: 'Published Posts', 
      value: publishedPosts, 
      icon: FileText, 
      color: 'text-deep-green', 
      bg: 'bg-sage-mist/60',
      borderClass: 'border-l-4 border-l-deep-green',
      trend: `+${recentPublications} this week`,
      prominent: true
    },
    { 
      name: 'Unread Leads', 
      value: unreadLeads, 
      icon: Mail, 
      color: 'text-red-700', 
      bg: 'bg-red-50',
      borderClass: 'border-l-4 border-l-red-500',
      trend: `+${recentLeadsCount} this week`,
      prominent: true,
      attention: unreadLeads > 0
    },
    { 
      name: 'Subscribers', 
      value: subscribers, 
      icon: Send, 
      color: 'text-deep-green', 
      bg: 'bg-sage-mist/60',
      borderClass: 'border-l-4 border-l-deep-green',
      trend: `+${recentSubscribersCount} this week`
    },
    { 
      name: 'Draft Posts', 
      value: draftPosts, 
      icon: FileText, 
      color: 'text-gold', 
      bg: 'bg-[#FAF6EE]',
      borderClass: 'border-l-4 border-l-gold',
      attention: draftPosts > 0
    },
    { 
      name: 'Resources', 
      value: resources, 
      icon: FolderOpen, 
      color: 'text-deep-green', 
      bg: 'bg-sage-mist/60',
      borderClass: 'border-l-4 border-l-deep-green'
    },
    { 
      name: 'FAQs', 
      value: faqs, 
      icon: HelpCircle, 
      color: 'text-gold', 
      bg: 'bg-[#FAF6EE]',
      borderClass: 'border-l-4 border-l-gold'
    },
  ]

  const audienceStats = stats.filter(s => s.name === 'Unread Leads' || s.name === 'Subscribers')
  const contentStats = stats.filter(s => s.name !== 'Unread Leads' && s.name !== 'Subscribers')

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-deep-green font-bold tracking-tight">Management System Overview</h1>
        <p className="text-charcoal/70 text-sm mt-1.5 font-sans">Monitor portal statistics, audit actions, and process customer leads.</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-sage/20 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-sans">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/posts/new" className="flex items-center justify-between p-4 rounded-md border border-sage/20 hover:border-gold hover:bg-[#FAF6EE]/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sage-mist/40 text-deep-green rounded">
                <PlusCircle size={18} />
              </div>
              <span className="text-sm font-semibold text-charcoal font-sans">Write New Post</span>
            </div>
            <ArrowRight size={16} className="text-sage group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/admin/resources" className="flex items-center justify-between p-4 rounded-md border border-sage/20 hover:border-gold hover:bg-[#FAF6EE]/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sage-mist/40 text-deep-green rounded">
                <FolderPlus size={18} />
              </div>
              <span className="text-sm font-semibold text-charcoal font-sans">Add Resource</span>
            </div>
            <ArrowRight size={16} className="text-sage group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/admin/leads" className="flex items-center justify-between p-4 rounded-md border border-sage/20 hover:border-gold hover:bg-[#FAF6EE]/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-50 text-red-700 rounded relative">
                <Inbox size={18} />
                {unreadLeads > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {unreadLeads}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold text-charcoal font-sans">View Unread Leads</span>
            </div>
            <ArrowRight size={16} className="text-sage group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Audience & Inquiries Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-sans">Audience & Inquiries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audienceStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.name} 
                className={`bg-white p-6 rounded-lg shadow-sm border border-sage/20 ${stat.borderClass} ${
                  stat.attention ? 'bg-red-50/10' : ''
                } hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-charcoal/70 font-sans">{stat.name}</p>
                      {stat.attention && (
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                      )}
                    </div>
                    <p className="text-4xl font-bold text-deep-green font-serif mt-2">{stat.value}</p>
                    {stat.trend && (
                      <p className="text-xs text-charcoal/50 mt-1 font-medium font-sans">{stat.trend}</p>
                    )}
                  </div>
                  <div className={`p-4 rounded-md ${stat.bg} ${stat.color}`}>
                    <Icon size={28} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Content Statistics Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-sans">Content Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.name} 
                className={`bg-white p-5 rounded-lg shadow-sm border border-sage/20 ${stat.borderClass} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-charcoal/70 font-sans">{stat.name}</p>
                    </div>
                    <p className="text-2xl font-bold text-deep-green font-serif mt-2">{stat.value}</p>
                    {stat.trend && (
                      <p className="text-[10px] text-charcoal/50 mt-1 font-sans">{stat.trend}</p>
                    )}
                  </div>
                  <div className={`p-2.5 rounded ${stat.bg} ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity Panel */}
      <div className="bg-white rounded-lg border border-sage/20 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-deep-green font-serif">Recent Activity</h2>
          <p className="text-xs text-charcoal/60 mt-0.5 font-sans">Audit log of recent content management actions.</p>
        </div>

        <div className="border-t border-sage/10 pt-4">
          {recentActivityLogs.length > 0 ? (
            <div className="flow-root font-sans">
              <ul className="-mb-8">
                {recentActivityLogs.map((log, logIdx) => (
                  <li key={log.id}>
                    <div className="relative pb-8">
                      {logIdx !== recentActivityLogs.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-sage/20" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3 items-start">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-sage-mist/40 flex items-center justify-center ring-8 ring-white text-deep-green">
                            <Clock size={14} />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-charcoal font-medium">
                              {getActivityMessage(log)}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-charcoal/40">
                              <User size={12} />
                              <span>{log.admin_email}</span>
                            </div>
                          </div>
                          <div className="text-right text-xs whitespace-nowrap text-charcoal/50 pt-0.5 font-medium">
                            {formatRelativeTime(log.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm font-sans text-charcoal/40">No recent administrative activities logged.</p>
            </div>
          )}
        </div>
      </div>

      {/* Branded Footer */}
      <footer className="mt-12 pt-6 border-t border-sage/20 text-center text-xs text-charcoal/40 font-sans">
        © {new Date().getFullYear()} Honworth Advisory · Management System · Internal use only
      </footer>

    </div>
  )
}
