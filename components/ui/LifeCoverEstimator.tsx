'use client';

import React, { useState } from 'react';
import { Card } from './Card';

export const LifeCoverEstimator = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(2400000);
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [retirementAge] = useState<number>(60);
  const [liabilities, setLiabilities] = useState<number>(5000000);
  const [existingCorpus, setExistingCorpus] = useState<number>(2000000);

  const calculateCover = () => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    // Simple Human Life Value approximation
    const incomeReplacement = annualIncome * yearsToRetirement * 0.5; // Assuming 50% income replacement needed
    const totalNeeds = incomeReplacement + liabilities;
    const requiredCover = Math.max(0, totalNeeds - existingCorpus);

    return requiredCover;
  };

  const requiredCover = calculateCover();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <Card className="bg-ivory">
      <h3 className="text-2xl font-serif text-deep-green mb-2">Life Cover Estimator</h3>
      <p className="text-sm font-sans text-charcoal/70 mb-8 pb-4 border-b border-sage/30">
        Illustrative only — not a guarantee or promise of returns.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-sans font-medium text-deep-green">Current Age</label>
            <span className="text-sm font-sans font-bold text-gold">{currentAge}</span>
          </div>
          <input 
            type="range" 
            min="25" max="55" step="1" 
            value={currentAge} 
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-sans font-medium text-deep-green">Annual Income</label>
            <span className="text-sm font-sans font-bold text-gold">{formatCurrency(annualIncome)}</span>
          </div>
          <input 
            type="range" 
            min="500000" max="10000000" step="100000" 
            value={annualIncome} 
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-sans font-medium text-deep-green">Outstanding Liabilities (Loans, etc.)</label>
            <span className="text-sm font-sans font-bold text-gold">{formatCurrency(liabilities)}</span>
          </div>
          <input 
            type="range" 
            min="0" max="50000000" step="500000" 
            value={liabilities} 
            onChange={(e) => setLiabilities(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-sans font-medium text-deep-green">Existing Liquid Corpus & Insurance</label>
            <span className="text-sm font-sans font-bold text-gold">{formatCurrency(existingCorpus)}</span>
          </div>
          <input 
            type="range" 
            min="0" max="50000000" step="500000" 
            value={existingCorpus} 
            onChange={(e) => setExistingCorpus(Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-sage/30 space-y-4">
        <div className="flex justify-between items-center pt-4 border-t border-sage/30">
          <span className="font-serif text-lg text-deep-green">Estimated Cover Needed</span>
          <span className="font-sans font-bold text-xl text-gold">{formatCurrency(requiredCover)}</span>
        </div>
        <p className="text-xs text-charcoal/70 mt-2">
          Based on 50% income replacement until age 60, plus immediate liability clearance.
        </p>
      </div>
    </Card>
  );
};
