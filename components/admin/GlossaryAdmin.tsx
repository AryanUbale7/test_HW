'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { saveGlossaryTerm, deleteGlossaryTerm } from '@/lib/actions/admin';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('./RichTextEditor').then(mod => mod.RichTextEditor), { ssr: false });

type GlossaryTerm = {
  id: string;
  term: string;
  slug: string;
  short_definition: string;
  full_explanation: string | null;
  arm: string | null;
  related_term_slugs: string[];
  updated_at: string;
};

const ARM_OPTIONS = ['Creation', 'Protection', 'Legacy', 'General'];

import { slugify } from '@/lib/utils/slugify';


type FormState = {
  term: string;
  slug: string;
  short_definition: string;
  full_explanation: string;
  arm: string;
  related_term_slugs: string[];
};

const EMPTY_FORM: FormState = {
  term: '',
  slug: '',
  short_definition: '',
  full_explanation: '',
  arm: 'General',
  related_term_slugs: [],
};

export function GlossaryAdmin({ 
  terms: initialTerms,
  total = 0,
  currentPage = 1,
}: { 
  terms: GlossaryTerm[]
  total?: number
  currentPage?: number
}) {
  const [terms, setTerms] = useState<GlossaryTerm[]>(initialTerms);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);


  function openNew() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError('');
    setShowForm(true);
  }

  function openEdit(term: GlossaryTerm) {
    setForm({
      term: term.term,
      slug: term.slug,
      short_definition: term.short_definition,
      full_explanation: term.full_explanation || '',
      arm: term.arm || 'General',
      related_term_slugs: term.related_term_slugs || [],
    });
    setEditingId(term.id);
    setError('');
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.term.trim() || !form.slug.trim() || !form.short_definition.trim()) {
      setError('Term, slug, and short definition are required.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      term: form.term.trim(),
      slug: form.slug.trim(),
      short_definition: form.short_definition.trim(),
      full_explanation: form.full_explanation.trim() || null,
      arm: form.arm,
      related_term_slugs: form.related_term_slugs,
    };

    if (editingId) {
      const result = await saveGlossaryTerm(editingId, payload);
      if (result.error) { setError(result.error); setSaving(false); return; }
      const data = result.data;
      setTerms(prev => prev.map(t => t.id === editingId ? data : t).sort((a, b) => a.term.localeCompare(b.term)));
    } else {
      const result = await saveGlossaryTerm(null, payload);
      if (result.error) { setError(result.error); setSaving(false); return; }
      const data = result.data;
      setTerms(prev => [...prev, data].sort((a, b) => a.term.localeCompare(b.term)));
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
  }

  async function handleDelete(id: string) {
    const result = await deleteGlossaryTerm(id);
    if (result && result.error) { alert(result.error); return; }
    setTerms(prev => prev.filter(t => t.id !== id));
    setDeleteConfirm(null);
  }

  function toggleRelated(slug: string) {
    setForm(f => ({
      ...f,
      related_term_slugs: f.related_term_slugs.includes(slug)
        ? f.related_term_slugs.filter(s => s !== slug)
        : [...f.related_term_slugs, slug],
    }));
  }

  const otherTerms = terms.filter(t => t.id !== editingId);
  const defLength = form.short_definition.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Glossary</h1>
          <p className="text-slate-500 mt-1 text-sm">{terms.length} term{terms.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> New Term
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-10 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">{editingId ? 'Edit Term' : 'New Term'}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Term */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Term *</label>
                <input
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.term}
                  onChange={e => setForm(f => ({ ...f, term: e.target.value, slug: editingId ? f.slug : slugify(e.target.value) }))}
                  placeholder="e.g. Asset Allocation"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug *</label>
                <input
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                  placeholder="auto-generated from term"
                />
              </div>

              {/* Arm */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Arm</label>
                <select
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.arm}
                  onChange={e => setForm(f => ({ ...f, arm: e.target.value }))}
                >
                  {ARM_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              {/* Short Definition */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-slate-700">Short Definition * <span className="text-xs text-slate-400">(doubles as meta description)</span></label>
                  <span className={`text-xs font-mono ${defLength > 160 ? 'text-red-500 font-bold' : defLength > 140 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {defLength}/160
                  </span>
                </div>
                <textarea
                  rows={3}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={form.short_definition}
                  onChange={e => setForm(f => ({ ...f, short_definition: e.target.value }))}
                  placeholder="1-2 sentence plain-language definition..."
                />
              </div>

              {/* Full Explanation */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Full Explanation</label>
                <RichTextEditor
                  content={form.full_explanation}
                  onChange={html => setForm(f => ({ ...f, full_explanation: html }))}
                />
              </div>

              {/* Related Terms Multi-select */}
              {otherTerms.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Related Terms</label>
                  <div className="border border-slate-200 rounded-md max-h-48 overflow-y-auto p-2 space-y-1">
                    {otherTerms.map(t => (
                      <label key={t.slug} className="flex items-center gap-3 px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.related_term_slugs.includes(t.slug)}
                          onChange={() => toggleRelated(t.slug)}
                          className="rounded"
                        />
                        <span className="text-sm text-slate-700">{t.term}</span>
                        {t.arm && <span className="text-xs text-slate-400">({t.arm})</span>}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-md px-3 py-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Check size={16} /> {saving ? 'Saving…' : 'Save Term'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Term</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Arm</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Short Definition</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {terms.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-slate-400 py-10">No glossary terms yet. Create your first one.</td>
              </tr>
            )}
            {terms.map(term => (
              <tr key={term.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-900">
                  <div>{term.term}</div>
                  <div className="text-xs text-slate-400 font-mono">{term.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{term.arm || '—'}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 hidden md:table-cell max-w-xs">
                  <p className="truncate">{term.short_definition}</p>
                </td>
                <td className="px-4 py-3 text-slate-400 hidden lg:table-cell whitespace-nowrap">
                  {new Date(term.updated_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(term)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    {deleteConfirm === term.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(term.id)}
                          className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs text-slate-500 px-2 py-1"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(term.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {total > 20 && (
        <div className="flex justify-between items-center bg-white px-6 py-4 border border-t-0 border-slate-200 rounded-b-lg shadow-sm">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * 20, total)}</span> of{' '}
            <span className="font-medium">{total}</span> items
          </div>
          <div className="flex gap-2">
            <Link
              href={currentPage > 2 ? `/admin/glossary?page=${currentPage - 1}` : '/admin/glossary'}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/glossary?page=${currentPage + 1}`}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage * 20 >= total ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
