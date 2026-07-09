'use client';

import React, { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { formatCurrency } from '@/lib/utils/formatCurrency';


function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// ─── SliderWithInput ─────────────────────────────────────────────────────────
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
            className="w-24 text-right border-b border-sage bg-transparent text-sm font-semibold text-deep-green focus:outline-none focus:border-gold py-0.5"
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
        className="w-full accent-gold h-2 cursor-pointer"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-charcoal/40 font-sans">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>
    </div>
  );
}

// ─── SIP Formula ─────────────────────────────────────────────────────────────
// FV = P × [((1 + r)^n - 1) / r] × (1 + r)
// P = monthly investment, r = monthly rate (annual/12/100), n = months
function calcSip(monthly: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const invested = monthly * n;
  const fv = monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  return { invested, fv, gained: fv - invested };
}

function buildChartData(monthly: number, annualRate: number, years: number) {
  return Array.from({ length: years }, (_, i) => {
    const yr = i + 1;
    const { invested, fv } = calcSip(monthly, annualRate, yr);
    return { year: `Yr ${yr}`, invested: Math.round(invested), value: Math.round(fv) };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export const SipCalculator = ({ embedded = false }: { embedded?: boolean }) => {
  const [monthly, setMonthly] = useState(10_000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const results = useMemo(() => calcSip(monthly, rate, years), [monthly, rate, years]);
  const chartData = useMemo(() => buildChartData(monthly, rate, years), [monthly, rate, years]);

  const Heading = embedded ? 'h3' : 'h2';

  return (
    <div className="space-y-8">
      {/* Compliance disclaimer — permanently visible, non-dismissible */}
      <div className="bg-amber-50 border border-amber-200 rounded-sm px-4 py-3 text-xs font-sans text-amber-800 leading-relaxed">
        <strong>Illustrative only</strong> — actual returns depend on market performance and are not guaranteed. This is not investment advice. The rate of return shown is chosen by you for illustration — it is not a prediction or promise.
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-7">
          <Heading className="font-serif text-2xl text-deep-green">SIP Calculator</Heading>

          <SliderWithInput
            label="Monthly Investment"
            value={monthly} min={500} max={500_000} step={500}
            onChange={setMonthly} prefix="₹"
          />
          <SliderWithInput
            label="Expected Annual Return"
            value={rate} min={1} max={20} step={0.5}
            onChange={setRate} suffix="%"
            note="Choose any rate for illustration — not a prediction of actual returns."
          />
          <SliderWithInput
            label="Investment Duration"
            value={years} min={1} max={40} step={1}
            onChange={setYears} suffix=" yrs"
          />
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="bg-sage-mist/30 border border-sage/20 rounded-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-charcoal/70">Total Amount Invested</span>
              <span className="font-sans font-semibold text-deep-green">{formatCurrency(results.invested)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-charcoal/70">Estimated Wealth Gained</span>
              <span className="font-sans font-semibold text-sage">{formatCurrency(results.gained)}</span>
            </div>
            <div className="border-t border-sage/30 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-serif text-lg text-deep-green">Estimated Total Value</span>
                <span className="font-sans font-bold text-2xl text-gold">{formatCurrency(results.fv)}</span>
              </div>
              <p className="text-xs text-charcoal/50 mt-2 font-sans">
                Estimated value based on your inputs — not a guaranteed outcome.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div>
        <p className="text-xs text-charcoal/50 font-sans mb-3 uppercase tracking-wide">Year-by-year growth (illustrative)</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="sipInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7A9E7E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7A9E7E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="sipValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B8923E" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#B8923E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D8" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#5A5A4A' }} tickLine={false} />
            <YAxis tickFormatter={v => formatCurrency(v)} tick={{ fontSize: 10, fill: '#5A5A4A' }} tickLine={false} width={72} />
            <Tooltip
              formatter={(v, name) => [formatCurrency(Number(v)), name === 'invested' ? 'Amount Invested' : 'Estimated Value']}
              contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #C8C4B8' }}
            />
            <Legend formatter={v => v === 'invested' ? 'Amount Invested' : 'Estimated Value'} wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="invested" stroke="#7A9E7E" fill="url(#sipInvested)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="value" stroke="#B8923E" fill="url(#sipValue)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
