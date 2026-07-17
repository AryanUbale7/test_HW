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
    glossaryTerms,
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
    getGlossaryTermsCount(),
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
      color: 'text-emerald-700', 
      bg: 'bg-emerald-50',
      borderClass: 'border-l-4 border-l-emerald-600',
      trend: `+${recentPublications} this week`,
      prominent: true
    },
    { 
      name: 'Unread Leads', 
      value: unreadLeads, 
      icon: Mail, 
      color: 'text-red-700', 
      bg: 'bg-red-50',
      borderClass: 'border-l-4 border-l-red-600',
      trend: `+${recentLeadsCount} this week`,
      prominent: true,
      attention: unreadLeads > 0
    },
    { 
      name: 'Subscribers', 
      value: subscribers, 
      icon: Send, 
      color: 'text-indigo-700', 
      bg: 'bg-indigo-50',
      borderClass: 'border-l-4 border-l-indigo-600',
      trend: `+${recentSubscribersCount} this week`
    },
    { 
      name: 'Draft Posts', 
      value: draftPosts, 
      icon: FileText, 
      color: 'text-amber-700', 
      bg: 'bg-amber-50',
      borderClass: 'border-l-4 border-l-amber-600',
      attention: draftPosts > 0
    },
    { 
      name: 'Resources', 
      value: resources, 
      icon: FolderOpen, 
      color: 'text-blue-700', 
      bg: 'bg-blue-50',
      borderClass: 'border-l-4 border-l-blue-600'
    },
    { 
      name: 'FAQs', 
      value: faqs, 
      icon: HelpCircle, 
      color: 'text-purple-700', 
      bg: 'bg-purple-50',
      borderClass: 'border-l-4 border-l-purple-600'
    },
    { 
      name: 'Glossary Terms', 
      value: glossaryTerms, 
      icon: BookA, 
      color: 'text-teal-700', 
      bg: 'bg-teal-50',
      borderClass: 'border-l-4 border-l-teal-600'
    },
  ]

  const audienceStats = stats.filter(s => s.name === 'Unread Leads' || s.name === 'Subscribers')
  const contentStats = stats.filter(s => s.name !== 'Unread Leads' && s.name !== 'Subscribers')

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Management System Overview</h1>
        <p className="text-slate-500 mt-1">Monitor portal statistics, audit actions, and process customer leads.</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/posts/new" className="flex items-center justify-between p-4 rounded-md border border-slate-200 hover:border-gold hover:bg-slate-50/50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded">
                <PlusCircle size={18} />
              </div>
              <span className="text-sm font-medium text-slate-700">Write New Post</span>
            </div>
            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/admin/resources" className="flex items-center justify-between p-4 rounded-md border border-slate-200 hover:border-gold hover:bg-slate-50/50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-700 rounded">
                <FolderPlus size={18} />
              </div>
              <span className="text-sm font-medium text-slate-700">Add Resource</span>
            </div>
            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/admin/leads" className="flex items-center justify-between p-4 rounded-md border border-slate-200 hover:border-gold hover:bg-slate-50/50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 text-red-700 rounded relative">
                <Inbox size={18} />
                {unreadLeads > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {unreadLeads}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-slate-700">View Unread Leads</span>
            </div>
            <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Audience & Inquiries Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Audience & Inquiries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audienceStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.name} 
                className={`bg-white p-6 rounded-lg shadow-sm border border-slate-200 ${stat.borderClass} ${
                  stat.attention ? 'bg-red-50/10' : ''
                } hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-500">{stat.name}</p>
                      {stat.attention && (
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                      )}
                    </div>
                    <p className="text-4xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    {stat.trend && (
                      <p className="text-xs text-slate-400 mt-1 font-medium">{stat.trend}</p>
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Content Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {contentStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.name} 
                className={`bg-white p-5 rounded-lg shadow-sm border border-slate-200 ${stat.borderClass} ${
                  stat.attention ? 'bg-amber-50/10' : ''
                } hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-slate-500">{stat.name}</p>
                      {stat.attention && (
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    {stat.trend && (
                      <p className="text-[10px] text-slate-400 mt-1">{stat.trend}</p>
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
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
          <p className="text-xs text-slate-500 mt-0.5">Audit log of recent content management actions.</p>
        </div>

        <div className="border-t border-slate-100 pt-4">
          {recentActivityLogs.length > 0 ? (
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivityLogs.map((log, logIdx) => (
                  <li key={log.id}>
                    <div className="relative pb-8">
                      {logIdx !== recentActivityLogs.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-250" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3 items-start">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center ring-8 ring-white text-slate-600">
                            <Clock size={14} />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-slate-700 font-medium">
                              {getActivityMessage(log)}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                              <User size={12} />
                              <span>{log.admin_email}</span>
                            </div>
                          </div>
                          <div className="text-right text-xs whitespace-nowrap text-slate-400 pt-0.5 font-medium">
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
              <p className="text-sm font-sans text-slate-400">No recent administrative activities logged.</p>
            </div>
          )}
        </div>
      </div>

      {/* Branded Footer */}
      <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 font-sans">
        © {new Date().getFullYear()} Honworth Advisory · Management System · Internal use only
      </footer>

    </div>
  )
}
