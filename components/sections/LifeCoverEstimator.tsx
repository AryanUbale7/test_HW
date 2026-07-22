'use client';

import React, { useState, useMemo } from 'react';

import { formatCurrency } from '@/lib/utils/formatCurrency';


function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// ─── SliderWithInput ──────────────────────────────────────────────────────────
function SliderWithInput({
  label, value, min, max, step, onChange, prefix = '', suffix = '', note
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; prefix?: string; suffix?: string; note?: string;
}) {
  const [raw, setRaw] = useState('');
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <label className="text-sm font-medium font-sans text-deep-green">{label}</label>
          {note && <p className="text-xs text-charcoal/50 mt-0.5">{note}</p>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {prefix && <span className="text-sm font-sans text-charcoal/60">{prefix}</span>}
          <input
            type="text"
            inputMode="numeric"
            aria-label={label}
            className="w-24 text-right border-b border-sage bg-transparent text-sm font-semibold text-deep-green focus:outline-none focus:border-deep-green py-0.5"
            value={editing ? raw : value.toLocaleString('en-IN')}
            onFocus={() => { setEditing(true); setRaw(String(value)); }}
            onBlur={() => { setEditing(false); const n = parseFloat(raw.replace(/,/g, '')); if (!isNaN(n)) onChange(clamp(n, min, max)); }}
            onChange={e => setRaw(e.target.value)}
          />
          {suffix && <span className="text-sm font-sans text-charcoal/60">{suffix}</span>}
        </div>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-deep-green h-2 cursor-pointer"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-charcoal/40 font-sans">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>
    </div>
  );
}

// ─── Life Cover Formula ───────────────────────────────────────────────────────
// Method: Human Life Value (income replacement) + outstanding liabilities
//
// Conservative estimate (lower bound):
//   Income replacement = annualIncome × dependentYears × 0.5   (50% income replacement)
//   Total = incomeReplacement + liabilities
//
// Higher estimate (upper bound):
//   Income replacement = annualIncome × dependentYears × 1.0   (100% income replacement)
//   + ₹10L per dependent as an additional buffer
//   Total = incomeReplacement + liabilities + (dependents × 10,00,000)
function calcLifeCover(annualIncome: number, liabilities: number, dependents: number, dependentYears: number) {
  const incLow = annualIncome * dependentYears * 0.5;
  const incHigh = annualIncome * dependentYears * 1.0;
  const dependentBuffer = dependents * 1_000_000;

  const low = Math.max(0, incLow + liabilities);
  const high = Math.max(0, incHigh + liabilities + dependentBuffer);
  return { low, high };
}

// ─── Component ────────────────────────────────────────────────────────────────
export const LifeCoverEstimator = ({ embedded = false }: { embedded?: boolean }) => {
  const [annualIncome, setAnnualIncome] = useState(1_200_000);
  const [liabilities, setLiabilities] = useState(3_000_000);
  const [dependents, setDependents] = useState(2);
  const [dependentYears, setDependentYears] = useState(20);

  const { low, high } = useMemo(
    () => calcLifeCover(annualIncome, liabilities, dependents, dependentYears),
    [annualIncome, liabilities, dependents, dependentYears]
  );

  const Heading = embedded ? 'h3' : 'h2';

  return (
    <div className="space-y-8">
      {/* Compliance disclaimer — permanently visible, non-dismissible */}
      <div className="bg-amber-50 border border-amber-200 rounded-sm px-4 py-3 text-xs font-sans text-amber-800 leading-relaxed">
        <strong>Rough illustrative estimate only</strong> — based on general thumb-rules, not personalised advice. Actual cover needs depend on your full financial situation. No specific insurer or product is referenced here.
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-7">
          <Heading className="font-serif text-2xl text-deep-green">Life Cover Estimator</Heading>

          <SliderWithInput
            label="Annual Income"
            value={annualIncome} min={100_000} max={10_000_000} step={100_000}
            onChange={setAnnualIncome} prefix="₹"
          />
          <SliderWithInput
            label="Outstanding Loans / Liabilities"
            value={liabilities} min={0} max={50_000_000} step={500_000}
            onChange={setLiabilities} prefix="₹"
          />
          <SliderWithInput
            label="Number of Dependents"
            value={dependents} min={0} max={10} step={1}
            onChange={setDependents}
          />
          <SliderWithInput
            label="Years Until Youngest Dependent Is Financially Independent"
            value={dependentYears} min={1} max={40} step={1}
            onChange={setDependentYears} suffix=" yrs"
          />
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center space-y-5">
          <div className="bg-sage-mist/30 border border-sage/20 rounded-sm p-6 space-y-5">
            <div>
              <p className="text-xs font-sans text-charcoal/50 uppercase tracking-wide mb-2">
                Range often considered by families in similar situations
              </p>
              <div className="flex items-end gap-2">
                <span className="font-sans font-bold text-2xl text-deep-green">{formatCurrency(low)}</span>
                <span className="font-sans text-charcoal/50 mb-0.5">–</span>
                <span className="font-sans font-bold text-2xl text-gold">{formatCurrency(high)}</span>
              </div>
              <p className="text-xs text-charcoal/50 mt-2 font-sans">
                This range is a rough estimate — not a recommended amount. Actual needs vary.
              </p>
            </div>

            <div className="border-t border-sage/20 pt-4 space-y-2 text-xs font-sans text-charcoal/60">
              <p className="flex justify-between">
                <span>Conservative estimate basis:</span>
                <span>50% income replacement + liabilities</span>
              </p>
              <p className="flex justify-between">
                <span>Higher estimate basis:</span>
                <span>100% replacement + liabilities + dependent buffer</span>
              </p>
            </div>
          </div>

          {/* Visual bar */}
          <div className="space-y-1">
            <p className="text-xs text-charcoal/40 font-sans">Illustrative range</p>
            <div className="relative h-6 bg-sage-mist/30 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-sage rounded-full opacity-70"
                style={{ width: '100%' }}
              />
              <div
                className="absolute left-0 top-0 h-full bg-gold rounded-full opacity-80"
                style={{ width: `${high > 0 ? (low / high) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-charcoal/50 font-sans">
              <span>{formatCurrency(low)} (conservative)</span>
              <span>{formatCurrency(high)} (higher)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
