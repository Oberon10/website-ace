'use client';

import React, { useState } from 'react';
import { Calculator, Plane, Ship, Truck, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/store';
import { ServiceType } from '@/lib/types';

export default function RateCalculator() {
  const { createQuotation, currentUser } = useApp();

  const [mode, setMode] = useState<ServiceType>('air');
  const [origin, setOrigin] = useState('Frankfurt, Germany');
  const [destination, setDestination] = useState('New York, USA');
  const [weight, setWeight] = useState(150);
  const [cbm, setCbm] = useState(1.5);
  const [submitted, setSubmitted] = useState(false);

  // Rate multipliers
  const rates = {
    air: { base: 250, perKg: 5.5, transit: '2-4 Business Days' },
    sea: { base: 500, perKg: 1.2, transit: '14-21 Days' },
    road: { base: 120, perKg: 2.1, transit: '3-6 Days' },
    warehousing: { base: 80, perKg: 0.8, transit: 'Flexible Contract' },
  };

  const calculatedEstimate = Math.round(rates[mode].base + weight * rates[mode].perKg + cbm * 45);

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    createQuotation({
      customer_name: currentUser.full_name || 'Sarah Jenkins',
      customer_email: currentUser.email || 'client@globaltrading.com',
      customer_phone: currentUser.phone || '+1 555-0199',
      origin,
      destination,
      service_type: mode,
      weight_kg: weight,
      volume_cbm: cbm,
      cargo_description: `${mode.toUpperCase()} freight consignment estimated via online calculator`,
      estimated_price: calculatedEstimate,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-100/70 dark:bg-[#070d17] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
            Instant Cost Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
            Calculate Your Shipping Rates
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Get transparent, competitive freight estimates in seconds across all our multimodal lanes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0e1726] rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-800">
          
          {/* Mode Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { type: 'air' as ServiceType, label: 'Air Express', icon: Plane },
              { type: 'sea' as ServiceType, label: 'Ocean Freight', icon: Ship },
              { type: 'road' as ServiceType, label: 'Overland Road', icon: Truck },
              { type: 'warehousing' as ServiceType, label: 'Storage/Hub', icon: Package },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = mode === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setMode(item.type)}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleRequestQuote} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Origin City / Port
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Destination City / Port
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Weight (kg): {weight} kg
                </label>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full mt-3 accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Volume (CBM): {cbm} m³
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="50"
                  step="0.5"
                  value={cbm}
                  onChange={(e) => setCbm(Number(e.target.value))}
                  className="w-full mt-3 accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Estimate Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                  Estimated Freight Cost
                </span>
                <p className="text-3xl sm:text-4xl font-black mt-1">
                  ${calculatedEstimate.toLocaleString()}{' '}
                  <span className="text-sm font-normal text-blue-100">USD</span>
                </p>
                <p className="text-xs text-blue-200 mt-1">
                  Est. Transit Duration: <span className="font-bold text-white">{rates[mode].transit}</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-md transition active:scale-[0.98] shrink-0"
              >
                Submit Official Quotation
              </button>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Quotation request submitted! Check your Customer Portal or Staff Dashboard to review and approve.
                </span>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
