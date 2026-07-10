import React from 'react'

export default function FormLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-slate-200 rounded-full" />
        <div className="h-7 bg-slate-200 rounded w-32" />
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="h-5 bg-slate-200 rounded w-16" />
          <div className="h-10 bg-slate-200 rounded w-full" />
          <div className="h-5 bg-slate-200 rounded w-16" />
          <div className="h-10 bg-slate-200 rounded w-full" />
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="h-5 bg-slate-200 rounded w-20" />
          <div className="h-32 bg-slate-200 rounded w-full" />
        </div>
      </div>
    </div>
  )
}
