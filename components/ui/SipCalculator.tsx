'use client';

import React, { useState } from 'react';
import { Card } from './Card';

export const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(50000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);

  const calculateSip = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = years * 12;
    const investedAmount = monthlyInvestment * months;
    
    // SIP Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i).
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const wealthGained = futureValue - investedAmount;

    return {
      investedAmount,
      futureValue,
      wealthGained
    };
  };

  const results = calculateSip();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <Card className="bg-ivory">
      <h3 className="text-2xl font-serif text-deep-green mb-2">SIP Calculator</h3>
      <p className="text-sm font-sans text-charcoal/70 mb-8 pb-4 border-b border-sage/30">
        Illustrative only — not a guarantee or promise of returns.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-sans font-medium text-deep-green">Monthly Investment</label>
            <span className="text-sm font-sans font-bold text-gold">{formatCurrency(monthlyInvestment)}</span>
          </div>
          <input 
            type="range" 
            min="5000" max="500000" step="5000" 
            value={monthlyInvestment} 
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-sans font-medium text-deep-green">Investment Period (Years)</label>
            <span className="text-sm font-sans font-bold text-gold">{years} Years</span>
          </div>
          <input 
            type="range" 
            min="1" max="30" step="1" 
            value={years} 
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-sans font-medium text-deep-green">Expected Return (p.a)</label>
            <span className="text-sm font-sans font-bold text-gold">{expectedReturn}%</span>
          </div>
          <input 
            type="range" 
            min="5" max="20" step="1" 
            value={expectedReturn} 
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-sage/30 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-sans text-charcoal">Invested Amount</span>
          <span className="font-sans font-medium text-deep-green">{formatCurrency(results.investedAmount)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-sans text-charcoal">Estimated Returns</span>
          <span className="font-sans font-medium text-deep-green">{formatCurrency(results.wealthGained)}</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-sage/30">
          <span className="font-serif text-lg text-deep-green">Total Value</span>
          <span className="font-sans font-bold text-xl text-gold">{formatCurrency(results.futureValue)}</span>
        </div>
      </div>
    </Card>
  );
};
