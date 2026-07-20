import React from 'react'
import Link from 'next/link'
import { 
  FileText, FolderOpen, HelpCircle, Mail, Send, 
  PlusCircle, FolderPlus, Inbox, Clock, User
} from 'lucide-react'
import { getPostsCount, getRecentPublicationsCount } from '@/lib/queries/posts'
import { getResourcesCount } from '@/lib/queries/resources'
import { getFaqsCount } from '@/lib/queries/faqs'
import { getUnreadLeadsCount, getRecentLeadsCount } from '@/lib/queries/contact'
import { getSubscribersCount, getRecentSubscribersCount } from '@/lib/queries/newsletter'
import { getRecentAuditLogs } from '@/lib/audit'
import { getLaunchSettings } from '@/lib/queries/site-settings'
import { LaunchControlCard } from '@/components/admin/LaunchControlCard'

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
    case 'UPDATE_SITE_MODE':
      return `Changed site mode to ${log.details?.mode || 'unknown'}`
    case 'LAUNCH_NOW':
      return `Launched website (set to LIVE)`
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
    recentActivityLogs,
    launchSettings
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
    getRecentAuditLogs(8),
    getLaunchSettings()
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

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="pb-4 border-b border-sage/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-deep-green font-bold tracking-tight">Management System Overview</h1>
          <p className="text-charcoal/70 text-sm mt-1 font-sans">Monitor portal statistics, audit actions, and process customer leads.</p>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (Quick Actions & Metrics) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Actions Row */}
          <div className="bg-white p-5 rounded-lg border border-sage/20 shadow-sm space-y-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-sans">Quick Actions</h2>
            <div className="flex flex-wrap gap-3.5 font-sans">
              <Link 
                href="/admin/posts/new" 
                className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF6EE] text-deep-green border border-sage/25 rounded-md hover:border-gold hover:bg-[#FAF6EE]/50 transition-all font-semibold text-sm shadow-sm"
              >
                <PlusCircle size={16} className="text-gold" />
                Write New Post
              </Link>
              <Link 
                href="/admin/resources" 
                className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF6EE] text-deep-green border border-sage/25 rounded-md hover:border-gold hover:bg-[#FAF6EE]/50 transition-all font-semibold text-sm shadow-sm"
              >
                <FolderPlus size={16} className="text-gold" />
                Add Resource
              </Link>
              <Link 
                href="/admin/leads" 
                className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF6EE] text-deep-green border border-sage/25 rounded-md hover:border-gold hover:bg-[#FAF6EE]/50 transition-all font-semibold text-sm shadow-sm relative"
              >
                <Inbox size={16} className="text-gold" />
                View Leads
                {unreadLeads > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                    {unreadLeads}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Website Launch Control */}
          <LaunchControlCard
            initialMode={launchSettings.siteMode}
            initialLaunchDate={launchSettings.launchDate}
          />

          {/* System Metrics Grid */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal/40 font-sans px-1">System Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={stat.name} 
                    className={`bg-white p-5 rounded-lg shadow-sm border border-sage/20 ${stat.borderClass} ${
                      stat.attention ? 'bg-red-50/5' : ''
                    } hover:shadow-md transition-all duration-300 flex flex-col justify-between h-32`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-xs font-bold text-charcoal/60 font-sans tracking-wide">{stat.name}</span>
                      <div className={`p-1.5 rounded ${stat.bg} ${stat.color}`}>
                        <Icon size={16} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold font-serif text-deep-green">{stat.value}</span>
                        {stat.attention && (
                          <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
                        )}
                      </div>
                      {stat.trend ? (
                        <p className="text-[10px] text-charcoal/50 font-medium font-sans mt-0.5">{stat.trend}</p>
                      ) : (
                        <p className="text-[10px] text-charcoal/30 font-sans mt-0.5">Total count</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* Right Column (Recent Activity Sidebar) */}
        <div className="lg:col-span-1">
          
          <div className="bg-white rounded-lg border border-sage/20 shadow-sm p-5 space-y-4 h-full min-h-[440px] flex flex-col">
            <div>
              <h2 className="text-lg font-bold text-deep-green font-serif">Recent Activity</h2>
              <p className="text-xs text-charcoal/60 mt-0.5 font-sans">Audit log of portal actions.</p>
            </div>

            <div className="border-t border-sage/10 pt-4 flex-1 overflow-y-auto max-h-[380px] pr-1">
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
                                <Clock size={12} />
                              </span>
                            </div>
                            <div className="flex-1 min-w-0 pt-1 flex justify-between space-x-2">
                              <div>
                                <p className="text-xs text-charcoal font-medium leading-relaxed">
                                  {getActivityMessage(log)}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5 text-[10px] text-charcoal/40">
                                  <User size={10} />
                                  <span>{log.admin_email}</span>
                                </div>
                              </div>
                              <div className="text-right text-[10px] whitespace-nowrap text-charcoal/50 font-medium">
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
                  <p className="text-xs font-sans text-charcoal/40">No activity logs.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Branded Footer */}
      <footer className="mt-12 pt-6 border-t border-sage/25 text-center text-xs text-charcoal/40 font-sans">
        © {new Date().getFullYear()} Honworth · Management System · Internal use only
      </footer>

    </div>
  )
}
