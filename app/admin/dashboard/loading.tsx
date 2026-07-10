import React from 'react'

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-7 bg-slate-200 rounded w-48" />
        <div className="h-4 bg-slate-100 rounded w-72 mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-3 flex-1 mr-4">
              <div className="h-4 bg-slate-200 rounded w-24" />
              <div className="h-8 bg-slate-200 rounded w-16 mt-2" />
            </div>
            <div className="w-12 h-12 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
